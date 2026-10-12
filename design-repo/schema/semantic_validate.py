#!/usr/bin/env python3
"""Semantic validator for Cradle PageSpecs.

Enforces what JSON Schema cannot: template/node cross-referencing, route and chrome
agreement, graph rhythm rules (with severity), reduced-motion fallbacks, per-instance
maxWords, asset-role policy and the no-external-links constraint.

Usage:  python3 semantic_validate.py [pagespec.json ...]   (default: schema/example.pagespec.json)
Exit code 1 if any error-severity finding exists.
"""
import json, os, re, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # design-repo/ root


def _load(rel):
    with open(os.path.join(REPO, rel)) as f:
        return json.load(f)


class Repo:
    def __init__(self, root=None):
        global REPO
        if root:
            REPO = root
        self.schema = _load('schema/pagespec.schema.json')
        self.templates = {t['id']: t for t in _load('templates/templates.json')['templates']}
        self.routes = {r['route']: r for r in _load('templates/routes.json')['routes']}
        self.graph = {r['id']: r for r in _load('compatibility/graph.json')['rules']}
        self.assets = _load('tokens/llm/asset-roles.json')['roles']
        self.sections = {}
        d = os.path.join(REPO, 'sections')
        for fn in sorted(os.listdir(d)):
            if fn.endswith('.json'):
                with open(os.path.join(d, fn)) as f:
                    s = json.load(f)
                self.sections[s['id']] = s


def schema_errors(repo, spec):
    from jsonschema import Draft7Validator
    out = []
    for e in sorted(Draft7Validator(repo.schema).iter_errors(spec), key=lambda e: list(map(str, e.absolute_path))):
        out.append(('error', 'SCHEMA', '/'.join(map(str, e.absolute_path)) or '(root)', e.message[:240]))
    return out


# ---- helpers ---------------------------------------------------------------------------------
def wc(s):
    return len([w for w in re.split(r'\s+', s.strip()) if w])


def walk_maxwords(schema, inst, path, out):
    """Walk an instance alongside its (section-contract) schema fragment, checking maxWords."""
    if not isinstance(schema, dict):
        return
    if isinstance(inst, str) and 'maxWords' in schema and wc(inst) > schema['maxWords']:
        out.append(('error', 'MAX_WORDS', path, '%d words exceeds maxWords %d' % (wc(inst), schema['maxWords'])))
    if isinstance(inst, dict):
        for k, v in inst.items():
            walk_maxwords(schema.get('properties', {}).get(k), v, path + '/' + k, out)
    if isinstance(inst, list) and 'items' in schema:
        for i, v in enumerate(inst):
            walk_maxwords(schema['items'], v, '%s/%d' % (path, i), out)


def all_strings(inst):
    if isinstance(inst, str):
        yield inst
    elif isinstance(inst, dict):
        for v in inst.values():
            yield from all_strings(v)
    elif isinstance(inst, list):
        for v in inst:
            yield from all_strings(v)


EXTERNAL = re.compile(r'(?i)(?<![\w:/])(?:https?:)?//[^\s/]+\.[a-z]{2,}|\bmailto:|\bhttps?://')


def route_ok(repo, tpl, route):
    if route in repo.routes and repo.routes[route]['template'] == tpl['id']:
        return True
    return False


# ---- rules: one function per graph rule id ---------------------------------------------------
def r_TEMPLATE_NODE_SEQUENCE(repo, spec, ctx):
    tpl = ctx['tpl']
    want = [n['section'] for n in tpl['nodes']]
    got = [n.get('section') for n in spec['nodes']]
    out = []
    # required nodes must be present (in order); repeatable ones may repeat; nothing else allowed
    idx = 0
    for n in tpl['nodes']:
        count = 0
        while idx < len(got) and got[idx] == n['section'] and (count == 0 or n['repeatable']):
            idx += 1
            count += 1
        if count == 0 and n['required']:
            out.append(('error', 'TEMPLATE_NODE_SEQUENCE', 'nodes', 'missing or out-of-order required section %s (template %s expects %s)' % (n['section'], tpl['id'], want)))
            return out
    if idx != len(got):
        out.append(('error', 'TEMPLATE_NODE_SEQUENCE', 'nodes/%d' % idx, 'section %s is not part of template %s at this position' % (got[idx], tpl['id'])))
    return out


def r_ROUTE_BELONGS_TO_TEMPLATE(repo, spec, ctx):
    if not route_ok(repo, ctx['tpl'], spec['route']):
        return [('error', 'ROUTE_BELONGS_TO_TEMPLATE', 'route', 'route %s is not a route of %s' % (spec['route'], ctx['tpl']['id']))]
    return []


def r_SECTION_ALLOWED_TEMPLATES(repo, spec, ctx):
    out = []
    for i, n in enumerate(spec['nodes']):
        s = repo.sections.get(n.get('section'))
        if s and spec['template'] not in s['allowedTemplates']:
            out.append(('error', 'SECTION_ALLOWED_TEMPLATES', 'nodes/%d' % i, '%s is not allowed in %s' % (n['section'], spec['template'])))
    return out


def r_NAV_FIRST(repo, spec, ctx):
    has = ctx['tpl']['chrome']['nav'] is not None
    ns = [n.get('section') for n in spec['nodes']]
    if has and ns[:1] != ['chrome.navbar']:
        return [('error', 'NAV_FIRST', 'nodes/0', 'first node must be chrome.navbar')]
    if not has and 'chrome.navbar' in ns:
        return [('error', 'NAV_FIRST', 'nodes', 'this template has no navbar')]
    return []


def r_FOOTER_LAST(repo, spec, ctx):
    has = ctx['tpl']['chrome']['footer'] is not None
    ns = [n.get('section') for n in spec['nodes']]
    if has and ns[-1:] != ['chrome.footer']:
        return [('error', 'FOOTER_LAST', 'nodes/%d' % (len(ns) - 1), 'last node must be chrome.footer')]
    if not has and 'chrome.footer' in ns:
        return [('error', 'FOOTER_LAST', 'nodes', 'this template has no footer')]
    return []


def r_CHROME_MATCHES_ROUTE(repo, spec, ctx):
    rt = repo.routes.get(spec['route'])
    if not rt:
        return []
    out = []
    for i, n in enumerate(spec['nodes']):
        if n.get('section') == 'chrome.navbar' and rt['chrome']['nav']:
            if n.get('variant') != rt['chrome']['nav']['desktop']:
                out.append(('error', 'CHROME_MATCHES_ROUTE', 'nodes/%d/variant' % i, 'navbar desktop variant must be %s on %s' % (rt['chrome']['nav']['desktop'], spec['route'])))
            if n.get('content', {}).get('phoneVariant') != rt['chrome']['nav']['phone']:
                out.append(('error', 'CHROME_MATCHES_ROUTE', 'nodes/%d/content/phoneVariant' % i, 'navbar phone variant must be %s on %s' % (rt['chrome']['nav']['phone'], spec['route'])))
        if n.get('section') == 'chrome.footer' and rt['chrome']['footer'] and n.get('variant') != rt['chrome']['footer']:
            out.append(('error', 'CHROME_MATCHES_ROUTE', 'nodes/%d/variant' % i, 'footer variant must be %s on %s' % (rt['chrome']['footer'], spec['route'])))
    return out


def r_ONE_HERO(repo, spec, ctx):
    rule = repo.graph['ONE_HERO']
    n = sum(1 for x in spec['nodes'] if repo.sections.get(x.get('section'), {}).get('category') == 'HERO')
    multi = rule['exceptions']['multiHeroTemplates']
    allowed = multi.get(spec['template'], 1)
    if spec['template'] in rule['noHeroTemplates']:
        allowed = 0
    if n > allowed:
        return [(rule['severity'], 'ONE_HERO', 'nodes', '%d HERO sections, %s allows %d' % (n, spec['template'], allowed))]
    return []


def r_NO_ADJACENT_SAME_CATEGORY(repo, spec, ctx):
    rule = repo.graph['NO_ADJACENT_SAME_CATEGORY']
    ok = {tuple(p) for p in rule['exceptions']['pairs']}
    out = []
    ns = [n.get('section') for n in spec['nodes']]
    for i, (a, b) in enumerate(zip(ns, ns[1:])):
        ca, cb = repo.sections.get(a, {}).get('category'), repo.sections.get(b, {}).get('category')
        if ca and ca == cb and ca != 'CHROME' and (a, b) not in ok:
            out.append((rule['severity'], 'NO_ADJACENT_SAME_CATEGORY', 'nodes/%d' % (i + 1), '%s then %s are both %s' % (a, b, ca)))
    return out


def r_NO_CONSECUTIVE_SCROLL_STAGES(repo, spec, ctx):
    rule = repo.graph['NO_CONSECUTIVE_SCROLL_STAGES']
    p = [n.get('motion', {}).get('pattern') for n in spec['nodes']]
    return [(rule['severity'], 'NO_CONSECUTIVE_SCROLL_STAGES', 'nodes/%d/motion' % (i + 1), 'two adjacent scroll-linked nodes') for i, (a, b) in enumerate(zip(p, p[1:])) if a == b == 'scroll-linked']


def r_MOTION_BUDGET(repo, spec, ctx):
    rule = repo.graph['MOTION_BUDGET']
    n = sum(1 for x in spec['nodes'] if x.get('motion', {}).get('pattern') == 'scroll-linked')
    mx = rule['params']['maxScrollLinkedNodes']
    return [(rule['severity'], 'MOTION_BUDGET', 'nodes', '%d scroll-linked nodes, budget %d' % (n, mx))] if n > mx else []


def r_REDUCED_MOTION_FALLBACK(repo, spec, ctx):
    rule = repo.graph['REDUCED_MOTION_FALLBACK']
    fb = rule['params']['patternFallbacks']
    out = []
    for i, n in enumerate(spec['nodes']):
        m = n.get('motion')
        if not isinstance(m, dict) or 'reducedMotionFallback' not in m:
            out.append(('error', 'REDUCED_MOTION_FALLBACK', 'nodes/%d/motion' % i, 'reducedMotionFallback missing'))
        elif fb.get(m.get('pattern')) != m['reducedMotionFallback']:
            out.append(('error', 'REDUCED_MOTION_FALLBACK', 'nodes/%d/motion' % i, '%s must fall back to %s' % (m.get('pattern'), fb.get(m.get('pattern')))))
    return out


def r_NO_EXTERNAL_LINKS(repo, spec, ctx):
    return [('error', 'NO_EXTERNAL_LINKS', 'nodes', 'external URL in string: %r' % s[:60]) for s in all_strings(spec) if EXTERNAL.search(s)]


def r_ASSET_ROLE_POLICY(repo, spec, ctx):
    out = []
    for i, n in enumerate(spec['nodes']):
        sec = repo.sections.get(n.get('section'))
        for j, m in enumerate(n.get('media', []) or []):
            p = 'nodes/%d/media/%d' % (i, j)
            role = m.get('assetRole')
            reg = repo.assets.get(role)
            if reg is None:
                continue  # schema reports unknown roles
            if sec and sec['media'] and role not in sec['media']['roles']:
                out.append(('error', 'ASSET_ROLE_POLICY', p, 'role %s not allowed in %s (allowed: %s)' % (role, n['section'], sec['media']['roles'])))
            if reg['policy'] == 'may-generate-new':
                if 'assetRef' in m:
                    out.append(('error', 'ASSET_ROLE_POLICY', p, 'role %s is generated; assetRef not allowed' % role))
                if 'generationBrief' not in m:
                    out.append(('error', 'ASSET_ROLE_POLICY', p, 'role %s requires generationBrief' % role))
            else:
                if not reg['files']:
                    out.append(('error', 'ASSET_ROLE_POLICY', p, 'role %s has no registered files; it cannot be referenced (use placeholder)' % role))
                if 'generationBrief' in m:
                    out.append(('error', 'ASSET_ROLE_POLICY', p, 'role %s must not be generated (%s)' % (role, reg['policy'])))
                if m.get('assetRef') not in reg['files']:
                    out.append(('error', 'ASSET_ROLE_POLICY', p, 'assetRef %r is not a registered %s file' % (m.get('assetRef'), role)))
    return out


def r_CMS_SLUG_MATCHES_ROUTE(repo, spec, ctx):
    if spec['template'] not in ('template.blog-post', 'template.video-post'):
        return []
    parts = spec['route'].strip('/').split('/')
    out = []
    for i, n in enumerate(spec['nodes']):
        ref = (n.get('content') or {}).get('post')
        if isinstance(ref, dict) and (ref.get('collection'), ref.get('slug')) != (parts[0], parts[-1]):
            out.append(('error', 'CMS_SLUG_MATCHES_ROUTE', 'nodes/%d/content/post' % i, 'post reference must be %s/%s' % (parts[0], parts[-1])))
    return out


def r_MAX_WORDS(repo, spec, ctx):
    out = []
    for i, n in enumerate(spec['nodes']):
        s = repo.sections.get(n.get('section'))
        if s:
            walk_maxwords(s['content'], n.get('content', {}), 'nodes/%d/content' % i, out)
        for j, m in enumerate(n.get('media', []) or []):
            for k in ('alt', 'generationBrief'):
                lim = repo.schema['definitions']['media']['properties'][k].get('maxWords')
                if isinstance(m.get(k), str) and lim and wc(m[k]) > lim:
                    out.append(('error', 'MAX_WORDS', 'nodes/%d/media/%d/%s' % (i, j, k), '%d words exceeds maxWords %d' % (wc(m[k]), lim)))
    return out


RULES = {
    'TEMPLATE_NODE_SEQUENCE': r_TEMPLATE_NODE_SEQUENCE,
    'ROUTE_BELONGS_TO_TEMPLATE': r_ROUTE_BELONGS_TO_TEMPLATE,
    'SECTION_ALLOWED_TEMPLATES': r_SECTION_ALLOWED_TEMPLATES,
    'NAV_FIRST': r_NAV_FIRST,
    'FOOTER_LAST': r_FOOTER_LAST,
    'CHROME_MATCHES_ROUTE': r_CHROME_MATCHES_ROUTE,
    'ONE_HERO': r_ONE_HERO,
    'NO_ADJACENT_SAME_CATEGORY': r_NO_ADJACENT_SAME_CATEGORY,
    'NO_CONSECUTIVE_SCROLL_STAGES': r_NO_CONSECUTIVE_SCROLL_STAGES,
    'MOTION_BUDGET': r_MOTION_BUDGET,
    'REDUCED_MOTION_FALLBACK': r_REDUCED_MOTION_FALLBACK,
    'NO_EXTERNAL_LINKS': r_NO_EXTERNAL_LINKS,
    'ASSET_ROLE_POLICY': r_ASSET_ROLE_POLICY,
    'CMS_SLUG_MATCHES_ROUTE': r_CMS_SLUG_MATCHES_ROUTE,
    'MAX_WORDS': r_MAX_WORDS,
}


def validate(spec, repo=None):
    """Return a list of (severity, rule, path, message). Severity 'error' fails the spec."""
    repo = repo or Repo()
    out = schema_errors(repo, spec)
    if not isinstance(spec, dict):
        return out or [('error', 'SCHEMA', '(root)', 'PageSpec must be an object')]
    tpl = repo.templates.get(spec.get('template'))
    structural = (
        tpl is not None
        and isinstance(spec.get('route'), str)
        and isinstance(spec.get('nodes'), list)
        and spec['nodes']
        and all(isinstance(n, dict) for n in spec['nodes'])
    )
    if not structural:
        # Rules below need template, route and a node list; the schema errors already say what is missing.
        return out or [('error', 'SCHEMA', 'template', 'unknown template')]
    ctx = {'tpl': tpl}
    sev = {rid: r['severity'] for rid, r in repo.graph.items()}
    for rid, fn in RULES.items():
        if rid not in repo.graph:
            continue
        try:
            found = fn(repo, spec, ctx)
        except (KeyError, TypeError, AttributeError, IndexError) as exc:  # malformed instance the schema layer already flagged
            if not out:
                out.append(('error', rid, '(rule)', 'rule could not evaluate instance: %r' % (exc,)))
            continue
        for s_, r_, p_, m_ in found:
            out.append((sev[rid] if s_ != 'error' or sev[rid] == 'warn' else s_, r_, p_, m_))
    return out


def main(argv):
    repo = Repo()
    files = argv[1:] or [os.path.join(REPO, 'schema', 'example.pagespec.json')]
    bad = 0
    for fn in files:
        with open(fn) as f:
            spec = json.load(f)
        res = validate(spec, repo)
        errs = [r for r in res if r[0] == 'error']
        warns = [r for r in res if r[0] == 'warn']
        print('%s: %d error(s), %d warning(s)' % (os.path.basename(fn), len(errs), len(warns)))
        for s_, r_, p_, m_ in res:
            print('  [%s] %s %s: %s' % (s_, r_, p_, m_))
        bad += len(errs)
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
