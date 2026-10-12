#!/usr/bin/env python3
"""Adversarial suite: every control must pass with 0 errors, every mutation must be rejected.

Controls are synthesised from the repo's own contracts (section exampleContent / exampleMedia /
first allowed motion pattern), one per template, so a validator that rejects everything fails here
as surely as one that rejects nothing.
"""
import copy, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import importlib.util
spec_ = importlib.util.spec_from_file_location('semantic_validate', os.path.join(os.path.dirname(HERE), 'semantic_validate.py'))
sv = importlib.util.module_from_spec(spec_)
spec_.loader.exec_module(sv)

repo = sv.Repo()
PAT_FB = repo.graph['REDUCED_MOTION_FALLBACK']['params']['patternFallbacks']


def synth_media(sec):
    m = sec.get('media')
    if not m:
        return []
    out = []
    lit = sec.get('literalAssets', [])
    for role in m['roles']:
        reg = repo.assets[role]
        if reg['policy'] == 'may-generate-new':
            out.append({'assetRole': role, 'generationBrief': 'Neutral stand-in in the site palette'})
        elif reg['files']:
            pick = next((p for p in lit if p in reg['files']), reg['files'][0])
            out.append({'assetRole': role, 'assetRef': pick, 'alt': ''})
        if len(out) >= m['maxItems']:
            break
    return out[:m['maxItems']]


def synth(tid, route):
    tpl = repo.templates[tid]
    rt = repo.routes[route]
    nodes = []
    for tn in tpl['nodes']:
        sec = repo.sections[tn['section']]
        pat = sec['motion']['patterns'][0]
        n = {'section': sec['id'], 'content': copy.deepcopy(sec['exampleContent']), 'motion': {'pattern': pat, 'reducedMotionFallback': PAT_FB[pat]}}
        if sec['id'] == 'chrome.navbar':
            n['variant'] = rt['chrome']['nav']['desktop']
            n['content'] = {'phoneVariant': rt['chrome']['nav']['phone']}
        elif sec['id'] == 'chrome.footer':
            n['variant'] = rt['chrome']['footer']
        media = synth_media(sec)
        if media:
            n['media'] = media
        post = (n['content'] or {}).get('post')
        if isinstance(post, dict) and route.count('/') == 2:
            n['content']['post'] = {'collection': route.split('/')[1], 'slug': route.split('/')[2]}
        nodes.append(n)
    return {'pageSpecVersion': '1.0.0', 'template': tid, 'route': route, 'nodes': nodes}


def errors(spec):
    return [r for r in sv.validate(spec, repo) if r[0] == 'error']


def warns(spec):
    return [r for r in sv.validate(spec, repo) if r[0] == 'warn']


failures = []
passed = 0


def expect_pass(name, spec):
    global passed
    e = errors(spec)
    if e:
        failures.append('CONTROL FAILED %s: %s' % (name, e[:3]))
    else:
        passed += 1


def expect_reject(name, spec, rule=None):
    global passed
    e = errors(spec)
    if not e:
        failures.append('MUTATION ACCEPTED %s' % name)
    elif rule and not any(r[1] == rule for r in e):
        failures.append('MUTATION %s rejected by %s, expected %s' % (name, sorted({r[1] for r in e}), rule))
    else:
        passed += 1


def expect_warn(name, spec, rule):
    global passed
    if not any(r[1] == rule for r in warns(spec)) or errors(spec):
        failures.append('WARN EXPECTED %s %s (errors=%s)' % (name, rule, errors(spec)[:2]))
    else:
        passed += 1


# ---------------- controls: one per template (+ a few more routes) ----------------
first_route = {}
for r in repo.routes.values():
    first_route.setdefault(r['template'], r['route'])
for tid, route in first_route.items():
    expect_pass('template ' + tid, synth(tid, route))
for route in ('/blog/aintibody', '/video/launch', '/modality/peptide', '/privacy-policy', '/contact'):
    expect_pass('route ' + route, synth(repo.routes[route]['template'], route))
with open(os.path.join(os.path.dirname(HERE), 'example.pagespec.json')) as f:
    example = json.load(f)
expect_pass('bundled example', example)

home = synth('template.home', '/')
def mut(base=None):
    return copy.deepcopy(base or home)
def node(spec, sid):
    return next(n for n in spec['nodes'] if n['section'] == sid)

# ---------------- schema-layer mutations ----------------
m = mut(); m['template'] = 'template.invented'; expect_reject('wrong template enum', m, 'SCHEMA')
m = mut(); del m['route']; expect_reject('missing route', m, 'SCHEMA')
m = mut(); m['extra'] = 1; expect_reject('unknown top-level field', m, 'SCHEMA')
m = mut(); node(m, 'hero.home')['section'] = 'hero.invented'; expect_reject('invented section id', m, 'SCHEMA')
m = mut(); node(m, 'hero.home')['motion']['inventedAnimation'] = 'spin'; expect_reject('invented motion field', m, 'SCHEMA')
m = mut(); del node(m, 'hero.home')['motion']['reducedMotionFallback']; expect_reject('missing reducedMotionFallback', m)
m = mut(); del node(m, 'hero.home')['motion']; expect_reject('missing motion', m, 'SCHEMA')
m = mut(); node(m, 'hero.home')['motion']['pattern'] = 'parallax-spin'; expect_reject('invented motion pattern', m, 'SCHEMA')
m = mut(); node(m, 'hero.home')['motion']['pattern'] = 'marquee'; node(m, 'hero.home')['motion']['reducedMotionFallback'] = 'pause'; expect_reject('pattern not allowed for section', m, 'SCHEMA')
m = mut(); node(m, 'hero.home')['invented'] = 1; expect_reject('invented node property', m, 'SCHEMA')
m = mut(); node(m, 'hero.home')['variant'] = 'dark'; expect_reject('variant on non-chrome section', m, 'SCHEMA')
m = mut(); node(m, 'chrome.navbar')['variant'] = 'rainbow'; expect_reject('navbar variant outside enum', m, 'SCHEMA')
m = mut(); node(m, 'hero.home')['media'] = [{'assetRole': 'invented-role', 'assetRef': '/assets/x.png'}]; expect_reject('invented assetRole', m, 'SCHEMA')
m = mut(); node(m, 'product.enterprise')['content']['invented'] = 'x'; expect_reject('unknown content field', m, 'SCHEMA')
m = mut(); del node(m, 'product.enterprise')['content']['heading']; expect_reject('missing required content field', m, 'SCHEMA')
m = mut(); node(m, 'product.enterprise')['content']['items'] = []; expect_reject('items below minItems', m, 'SCHEMA')

# ---------------- structural mutations ----------------
m = mut(); m['nodes'].append(copy.deepcopy(node(m, 'hero.home'))); expect_reject('duplicate section', m, 'TEMPLATE_NODE_SEQUENCE')
m = mut(); m['nodes'] = [n for n in m['nodes'] if n['section'] != 'hero.home']; expect_reject('removed mandatory hero', m, 'TEMPLATE_NODE_SEQUENCE')
m = mut(); m['nodes'].insert(0, m['nodes'].pop()); expect_reject('footer moved first', m)
m = mut(); m['nodes'][1], m['nodes'][2] = m['nodes'][2], m['nodes'][1]; expect_reject('swapped adjacent sections', m, 'TEMPLATE_NODE_SEQUENCE')
m = mut(); m['template'] = 'template.platform'; expect_reject('template/node-sequence mismatch', m, 'TEMPLATE_NODE_SEQUENCE')
m = mut(); m['route'] = '/platform'; expect_reject('route belongs to another template', m, 'ROUTE_BELONGS_TO_TEMPLATE')
m = mut(); m['route'] = '/no-such-page'; expect_reject('unknown route', m, 'ROUTE_BELONGS_TO_TEMPLATE')
m = mut(); node(m, 'chrome.footer')['variant'] = 'dark'; expect_reject('footer variant differs from route table', m, 'CHROME_MATCHES_ROUTE')
m = mut(); node(m, 'chrome.navbar')['variant'] = 'light'; expect_reject('navbar variant differs from route table', m, 'CHROME_MATCHES_ROUTE')
m = mut(); node(m, 'chrome.navbar')['content']['phoneVariant'] = 'light'; expect_reject('navbar phone variant differs from route table', m, 'CHROME_MATCHES_ROUTE')
m = synth('template.link-in-bio-links', '/links'); m['nodes'].insert(0, {'section': 'chrome.navbar', 'variant': 'dark', 'content': {'phoneVariant': 'dark'}, 'motion': {'pattern': 'none', 'reducedMotionFallback': 'static'}}); expect_reject('navbar on a chrome-less template', m)
# section from another template's family
m = mut(); m['nodes'][1]['section'] = 'hero.platform-intro'; expect_reject('section from another template', m)
# blog post slug mismatch
b = synth('template.blog-post', '/blog/aintibody')
for n in b['nodes']:
    if isinstance(n['content'].get('post'), dict):
        n['content']['post']['slug'] = 'hansa'
        break
else:
    failures.append('no post-bearing node found in blog-post control')
expect_reject('CMS slug mismatch', b, 'CMS_SLUG_MATCHES_ROUTE')

# ---------------- motion rules ----------------
m = mut(); node(m, 'hero.home')['motion'] = {'pattern': 'scroll-linked', 'reducedMotionFallback': 'instant'}; expect_reject('wrong fallback for pattern', m)
# warn-level rules must warn but not fail
w = synth('template.platform', '/platform')
scroll = [n for n in w['nodes'] if 'scroll-linked' in repo.sections[n['section']]['motion']['patterns']]
if len(scroll) >= 2:
    for n in w['nodes']:
        n['motion'] = {'pattern': 'none', 'reducedMotionFallback': 'static'}
    # adjacent pair
    idx = [i for i, n in enumerate(w['nodes']) if 'scroll-linked' in repo.sections[n['section']]['motion']['patterns']]
    adj = next(((a, b_) for a, b_ in zip(idx, idx[1:]) if b_ == a + 1), None)
    if adj:
        for i in adj:
            w['nodes'][i]['motion'] = {'pattern': 'scroll-linked', 'reducedMotionFallback': 'static'}
        expect_warn('adjacent scroll-linked nodes', w, 'NO_CONSECUTIVE_SCROLL_STAGES')

# ---------------- runtime: maxWords, links, assets ----------------
m = mut(); node(m, 'hero.home')['content']['paragraphs'][0] = ' '.join(['word'] * 200); expect_reject('maxWords overflow', m, 'MAX_WORDS')
m = mut(); node(m, 'product.enterprise')['content']['heading'] = 'see https://example.com now'; expect_reject('external link in copy', m, 'NO_EXTERNAL_LINKS')
m = mut(); node(m, 'product.enterprise')['content']['ctas'][0]['href'] = 'https://example.com'; expect_reject('external cta href', m)
m = mut(); node(m, 'product.enterprise')['content']['ctas'][0]['href'] = 'mailto:a@b.co'; expect_reject('mailto cta href', m)
m = mut(); node(m, 'product.enterprise')['content']['heading'] = 'visit //evil.example.org'; expect_reject('protocol-relative link', m, 'NO_EXTERNAL_LINKS')

logo_sec = next(s for s in repo.sections.values() if s['media'] and 'customer-logo' in s['media']['roles'] and not any(r in s['media']['roles'] for r in ())) if any(s['media'] and 'customer-logo' in s['media']['roles'] for s in repo.sections.values()) else None
if logo_sec:
    tpl_id = logo_sec['allowedTemplates'][0]
    route = first_route[tpl_id]
    base = synth(tpl_id, route)
    n = node(base, logo_sec['id'])
    n['media'] = [{'assetRole': 'customer-logo', 'assetRef': repo.assets['customer-logo']['files'][0], 'alt': ''}]
    expect_pass('customer-logo with its registered file', base)
    # pinned-value: a valid but wrong file (a real blog cover) for a customer-logo
    wrong = repo.assets['editorial-cover']['files'][0]
    m2 = copy.deepcopy(base); node(m2, logo_sec['id'])['media'][0]['assetRef'] = wrong; expect_reject('customer-logo pinned to wrong (valid) file', m2, 'ASSET_ROLE_POLICY')
    m2 = copy.deepcopy(base); node(m2, logo_sec['id'])['media'] = [{'assetRole': 'customer-logo', 'generationBrief': 'draw a logo for ACME'}]; expect_reject('generated customer logo', m2, 'ASSET_ROLE_POLICY')
    m2 = copy.deepcopy(base); node(m2, logo_sec['id'])['media'] = [{'assetRole': 'customer-logo', 'assetRef': '/assets/does-not-exist.svg'}]; expect_reject('unregistered logo file', m2, 'ASSET_ROLE_POLICY')
    m2 = copy.deepcopy(base); node(m2, logo_sec['id'])['media'] = [{'assetRole': 'person-photo', 'assetRef': repo.assets['person-photo']['files'][0]}]; expect_reject('role not allowed in section', m2, 'ASSET_ROLE_POLICY')
else:
    failures.append('no section allows customer-logo')
# brand mark pinned
bm = next((s for s in repo.sections.values() if s['media'] and 'brand-mark' in s['media']['roles']), None)
if bm:
    base = synth(bm['allowedTemplates'][0], first_route[bm['allowedTemplates'][0]])
    m2 = copy.deepcopy(base); node(m2, bm['id'])['media'] = [{'assetRole': 'brand-mark', 'assetRef': repo.assets['ui-icon']['files'][0]}]; expect_reject('brand-mark pinned to different valid file', m2, 'ASSET_ROLE_POLICY')
# generated role must not carry assetRef
gen = next((s for s in repo.sections.values() if s['media'] and 'placeholder' in s['media']['roles']), None)
if gen:
    base = synth(gen['allowedTemplates'][0], first_route[gen['allowedTemplates'][0]])
    m2 = copy.deepcopy(base); node(m2, gen['id'])['media'] = [{'assetRole': 'placeholder', 'assetRef': '/assets/og-image.png', 'generationBrief': 'x'}]; expect_reject('generated role with assetRef', m2, 'ASSET_ROLE_POLICY')
    m2 = copy.deepcopy(base); node(m2, gen['id'])['media'] = [{'assetRole': 'placeholder'}]; expect_reject('generated role without brief', m2, 'ASSET_ROLE_POLICY')

# ---------------- per-section generic mutations (all sections) ----------------
def first_maxwords_path(schema, inst, path=()):
    if isinstance(inst, str) and 'maxWords' in schema:
        return path
    if isinstance(inst, dict):
        for k, v in inst.items():
            r = first_maxwords_path(schema.get('properties', {}).get(k, {}), v, path + (k,))
            if r is not None:
                return r
    if isinstance(inst, list) and inst:
        r = first_maxwords_path(schema.get('items', {}), inst[0], path + (0,))
        if r is not None:
            return r
    return None


def setpath(obj, path, val):
    for p in path[:-1]:
        obj = obj[p]
    obj[path[-1]] = val


tested = {'extra': 0, 'overflow': 0, 'required': 0}
for sid, sec in repo.sections.items():
    tid = sec['allowedTemplates'][0]
    base = synth(tid, first_route[tid])
    n0 = node(base, sid)
    # unknown content field
    m2 = copy.deepcopy(base); node(m2, sid)['content']['__invented__'] = 'x'; expect_reject('%s unknown content field' % sid, m2, 'SCHEMA'); tested['extra'] += 1
    # maxWords overflow on first budgeted field
    pth = first_maxwords_path(sec['content'], n0['content'])
    if pth is not None:
        m2 = copy.deepcopy(base); setpath(node(m2, sid)['content'], pth, ' '.join(['w'] * 500)); expect_reject('%s maxWords overflow' % sid, m2, 'MAX_WORDS'); tested['overflow'] += 1
    # each required content key removed
    for k in sec['content'].get('required', []):
        m2 = copy.deepcopy(base); del node(m2, sid)['content'][k]; expect_reject('%s missing required %s' % (sid, k), m2, 'SCHEMA'); tested['required'] += 1
    # missing reducedMotionFallback and invented motion field
    m2 = copy.deepcopy(base); del node(m2, sid)['motion']['reducedMotionFallback']; expect_reject('%s missing reducedMotionFallback' % sid, m2)

print('adversarial: %d checks passed, %d failed  (per-section: %s)' % (passed, len(failures), tested))
for f in failures:
    print('  FAIL', f)
sys.exit(1 if failures else 0)
