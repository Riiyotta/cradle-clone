#!/usr/bin/env python3
"""One-shot integrity check for this design-repo.  Run:  python3 extraction/verify_all.py

Checks (all machine-enforced, each proven to catch drift by the scratch-copy tests in CHANGELOG.md):
  1  manifest: entryPoints exist and stay inside the repo; allowlistVersion matches; counts recomputed from disk
  2  allowlist parity: ids <-> contract files, node/media/motion properties <-> schema, roles <-> registry <-> schema
  3  schema: Draft-07 valid; per-section branches equal their section contracts
  4  templates/routes: every route in exactly one template; counts agree; node sections exist; allowedTemplates match
  5  graph <-> validator: every graph rule id is implemented and vice versa; severities valid
  6  tokens: every {ref} resolves
  7  citations: every path:line[-line] in the repo is registered in extraction/measured-values.json, and (when the
     source project sits next to this folder) resolves inside the real file AND contains its anchor text
  8  portability: no absolute local paths anywhere
  9  bundled example validates (and is a generation-mode spec); (unless --no-adversarial) the adversarial suite passes
 10  token contract: tokens/llm/token-catalog.json equals a fresh build from the token files; token-policy.json
     categories/patterns/styleFields agree with the catalog, the section contracts and the schema enums
 11  asset contract: every role is clone-only or generation-safe; compliance-critical roles are pinned clone-only;
     generationRoles/substitutes, schema mode branch, allowlist and registry agree; the name denylist covers every
     registered customer-logo / author-photo file that carries a name; generation is the default mode everywhere
 12  closed motion schema: definitions.motion.additionalProperties is false
Each drift check is proven to fail on a mutated scratch copy by extraction/prove_drift.py.
Citation checks degrade to warnings when no source tree is found beside design-repo/.
"""
import glob, importlib.util, json, os, re, subprocess, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_token_catalog as btc  # noqa: E402

# Roles whose files are real trademarks, real people, real premises or proprietary content. Their contract is
# pinned to clone-only: membership in the contract enum is not enough (MASTER-GUIDE 3.23).
PINNED_CLONE_ONLY = ['brand-mark', 'customer-logo', 'person-photo', 'ui-screenshot', 'lab-photo', 'editorial-cover',
                     'page-image', 'page-graphic', 'modality-illustration', 'video', 'video-poster', 'social-image']
FAILS, WARNS = [], []


def fail(m): FAILS.append(m)
def warn(m): WARNS.append(m)
def load(rel):
    with open(os.path.join(REPO, rel)) as f:
        return json.load(f)


def compute_counts(repo=REPO):
    def L(rel):
        with open(os.path.join(repo, rel)) as f:
            return json.load(f)
    def count_typed(o):
        n = 0
        if isinstance(o, dict):
            if '$type' in o:
                n += 1
            for v in o.values():
                n += count_typed(v)
        elif isinstance(o, list):
            for v in o:
                n += count_typed(v)
        return n
    found = sum(count_typed(L('tokens/00-foundation/' + os.path.basename(p))) for p in glob.glob(os.path.join(repo, 'tokens/00-foundation/*.json')))
    sem = len(L('tokens/10-semantic/semantic.json')['semantic'])
    comp = len(L('tokens/20-component/component.json')['component'])
    lay = len(L('tokens/30-layout/layout.json')['layout'])
    n = lambda d: len(glob.glob(os.path.join(repo, d, '*.json')))
    reg = L('tokens/llm/asset-roles.json')['roles']
    pol = L('tokens/llm/token-policy.json')
    cat = L('tokens/llm/token-catalog.json')
    return {
        'foundationTokens': found, 'semanticTokens': sem, 'componentTokenGroups': comp, 'layoutTokens': lay,
        'themes': n('tokens/themes'), 'primitives': n('primitives'), 'components': n('components'), 'sections': n('sections'),
        'templates': len(L('templates/templates.json')['templates']), 'routes': len(L('templates/routes.json')['routes']),
        'graphRules': len(L('compatibility/graph.json')['rules']), 'assetRoles': len(reg),
        'registeredAssets': sum(len(r['files']) for r in reg.values()),
        'cloneOnlyAssetRoles': sum(1 for r in reg.values() if r.get('contract') == 'clone-only'),
        'generationSafeAssetRoles': sum(1 for r in reg.values() if r.get('contract') == 'generation-safe'),
        'catalogTokens': len(cat['tokens']), 'styleFields': len(pol['styleFields']),
    }


def sources_root():
    cand = os.path.dirname(REPO)
    return cand if os.path.isdir(os.path.join(cand, 'src')) else None


def main(argv):
    manifest = load('registry.manifest.json')
    # ---- 1 manifest
    ep = manifest['entryPoints']
    for k, p in (ep.items() if isinstance(ep, dict) else enumerate(ep)):
        if os.path.isabs(p) or '..' in p.split('/'):
            fail('entryPoint %s points outside the package: %s' % (k, p))
        elif not os.path.exists(os.path.join(REPO, p)):
            fail('entryPoint %s does not exist: %s' % (k, p))
    allow = load('tokens/llm/component-allowlist.json')
    if manifest['allowlistVersion'] != allow['allowlistVersion']:
        fail('allowlistVersion drift: manifest %s vs allowlist %s' % (manifest['allowlistVersion'], allow['allowlistVersion']))
    counts = compute_counts()
    for k, v in counts.items():
        if manifest['counts'].get(k) != v:
            fail('manifest.counts.%s = %s but disk has %s' % (k, manifest['counts'].get(k), v))
    for k in manifest['counts']:
        if k not in counts:
            fail('manifest.counts has unknown key %s' % k)
    readme = open(os.path.join(REPO, 'README.md')).read()
    for label, key in (('section contracts', 'sections'), ('templates', 'templates'), ('routes', 'routes'), ('graph rules', 'graphRules'), ('asset roles', 'assetRoles'), ('catalog tokens', 'catalogTokens'), ('style fields', 'styleFields')):
        if not (re.search(r'\b%d %s\b' % (counts[key], label), readme) or re.search(r'\|\s*%s\s*\|\s*%d\s*\|' % (label, counts[key]), readme)):
            fail('README.md does not state the real count "%d %s"' % (counts[key], label))
    # ---- 2 allowlist parity
    def ids_in(d):
        out = set()
        for p in glob.glob(os.path.join(REPO, d, '*.json')):
            with open(p) as f:
                out.add(json.load(f)['id'])
        return out
    comps = ids_in('primitives') | ids_in('components')
    if set(allow['components']) != comps:
        fail('allowlist.components parity: phantom=%s orphan=%s' % (sorted(set(allow['components']) - comps), sorted(comps - set(allow['components']))))
    secs = ids_in('sections')
    if set(allow['sections']) != secs:
        fail('allowlist.sections parity: phantom=%s orphan=%s' % (sorted(set(allow['sections']) - secs), sorted(secs - set(allow['sections']))))
    tpls = {t['id'] for t in load('templates/templates.json')['templates']}
    if set(allow['templates']) != tpls:
        fail('allowlist.templates parity: %s' % sorted(set(allow['templates']) ^ tpls))
    schema = load('schema/pagespec.schema.json')
    D = schema['definitions']
    for key, got in (('nodeProperties', set(D['node']['properties'])), ('mediaProperties', set(D['media']['properties'])), ('motionProperties', set(D['motion']['properties']))):
        if set(allow[key]) != got:
            fail('allowlist.%s != schema properties: %s' % (key, sorted(set(allow[key]) ^ got)))
    reg = load('tokens/llm/asset-roles.json')['roles']
    if set(allow['assetRoles']) != set(reg) or set(allow['assetRoles']) != set(D['assetRole']['enum']):
        fail('assetRoles disagree between allowlist, registry and schema')
    if allow['pageSpecProperties'] != list(schema['properties']):
        fail('allowlist.pageSpecProperties != schema top-level properties: %s vs %s' % (allow['pageSpecProperties'], list(schema['properties'])))
    regfull = load('tokens/llm/asset-roles.json')
    gen_safe = [r for r, v in reg.items() if v.get('contract') == 'generation-safe']
    clone_only = [r for r, v in reg.items() if v.get('contract') == 'clone-only']
    if allow['generationSafeAssetRoles'] != gen_safe or allow['cloneOnlyAssetRoles'] != clone_only:
        fail('allowlist generationSafe/cloneOnly asset roles disagree with the registry contracts')
    mode_enum = schema['properties'].get('mode', {})
    if not (allow['modes'] == mode_enum.get('enum') and allow['defaultMode'] == mode_enum.get('default') == regfull['defaultMode'] == 'generation'):
        fail('default mode must be "generation" in allowlist, schema and asset-roles (got %s / %s / %s)' % (allow.get('defaultMode'), mode_enum.get('default'), regfull.get('defaultMode')))
    if [m for m, v in regfull['modes'].items() if v['default']] != ['generation']:
        fail('asset-roles.modes must mark exactly generation as default')
    pol = load('tokens/llm/token-policy.json')
    if allow['styleFields'] != [f['section'] + ':' + f['path'] for f in pol['styleFields']]:
        fail('allowlist.styleFields != token-policy styleFields')
    if allow['pageSpecTokenCategories'] != [c for c, v in pol['categories'].items() if v['pageSpecReferenceable']]:
        fail('allowlist.pageSpecTokenCategories != token-policy referenceable categories')
    if set(allow['motionPatterns']) != set(D['motion']['properties']['pattern']['enum']):
        fail('motionPatterns disagree between allowlist and schema')
    if set(D['node']['properties']['section']['enum']) != secs:
        fail('schema section enum != section contracts')
    if set(schema['properties']['template']['enum']) != tpls:
        fail('schema template enum != templates')
    # ---- 3 schema
    try:
        from jsonschema import Draft7Validator
        Draft7Validator.check_schema(schema)
    except ImportError:
        fail('jsonschema is required (pip install jsonschema)')
    except Exception as e:
        fail('schema is not valid Draft-07: %s' % e)
    branches = {b['if']['properties']['section']['const']: b['then'] for b in D['node']['allOf']}
    sections = {}
    for p in glob.glob(os.path.join(REPO, 'sections', '*.json')):
        with open(p) as f:
            s = json.load(f)
        sections[s['id']] = s
        if os.path.basename(p) != s['id'] + '.json':
            fail('section file name != id: %s' % p)
    for sid, s in sections.items():
        b = branches.get(sid)
        if b is None:
            fail('schema has no branch for %s' % sid); continue
        if b['properties']['content'] != s['content']:
            fail('schema branch content != section contract for %s' % sid)
        if b['properties']['motion']['properties']['pattern']['enum'] != s['motion']['patterns']:
            fail('schema motion patterns != contract for %s' % sid)
        v = b['properties']['variant']
        if (s['variants'] or None) != (v['enum'] if isinstance(v, dict) else None):
            fail('schema variant != contract for %s' % sid)
        mroles = b['properties']['media']['items']['properties']['assetRole']['enum'] if isinstance(b['properties']['media'], dict) else None
        want_roles = (s['media']['roles'] + [r for r in s['media']['generationRoles'] if r not in s['media']['roles']]) if s['media'] else None
        if want_roles != mroles:
            fail('schema media roles != contract roles + generationRoles for %s' % sid)
        for p_, fb in s['motion']['reducedMotionFallbackByPattern'].items():
            pass
    # ---- 4 templates / routes
    T = {t['id']: t for t in load('templates/templates.json')['templates']}
    R = load('templates/routes.json')['routes']
    seen = {}
    for r in R:
        if r['route'] in seen:
            fail('route assigned twice: %s' % r['route'])
        seen[r['route']] = r['template']
        if r['template'] not in T:
            fail('route %s -> unknown template %s' % (r['route'], r['template']))
    for tid, t in T.items():
        rs = [r for r in R if r['template'] == tid]
        if len(rs) != t['routeCount'] or not rs:
            fail('%s routeCount %s != %d routes' % (tid, t['routeCount'], len(rs)))
        if 'routes' in t and sorted(t['routes']) != sorted(r['route'] for r in rs):
            fail('%s lists routes that differ from routes.json' % tid)
        if any(r['chrome'] != t['chrome'] for r in rs):
            fail('%s chrome differs from its routes' % tid)
        for n in t['nodes']:
            if n['section'] not in sections:
                fail('%s node references unknown section %s' % (tid, n['section']))
            elif tid not in sections[n['section']]['allowedTemplates']:
                fail('%s uses %s but the section does not allow it' % (tid, n['section']))
    for sid, s in sections.items():
        real = sorted(tid for tid, t in T.items() if any(n['section'] == sid for n in t['nodes']))
        if sorted(s['allowedTemplates']) != real:
            fail('%s allowedTemplates %s != templates that use it %s' % (sid, s['allowedTemplates'], real))
        if not real:
            fail('%s is used by no template' % sid)
    # ---- 5 graph <-> validator
    spec = importlib.util.spec_from_file_location('semantic_validate', os.path.join(REPO, 'schema', 'semantic_validate.py'))
    sv = importlib.util.module_from_spec(spec); spec.loader.exec_module(sv)
    graph = {r['id']: r for r in load('compatibility/graph.json')['rules']}
    if set(graph) != set(sv.RULES):
        fail('graph rules vs validator RULES: graph-only=%s validator-only=%s' % (sorted(set(graph) - set(sv.RULES)), sorted(set(sv.RULES) - set(graph))))
    for rid, r in graph.items():
        if r['severity'] not in ('error', 'warn'):
            fail('rule %s has invalid severity %r' % (rid, r['severity']))
    pf = graph['REDUCED_MOTION_FALLBACK']['params']['patternFallbacks']
    for sid, s in sections.items():
        if s['motion']['reducedMotionFallbackByPattern'] != {p: pf[p] for p in s['motion']['patterns']}:
            fail('%s reducedMotionFallbackByPattern disagrees with graph' % sid)
    # ---- 6 token refs
    toks = {}
    for p in glob.glob(os.path.join(REPO, 'tokens/00-foundation/*.json')):
        d = json.load(open(p))
        for g, v in d.items():
            if isinstance(v, dict) and not g.startswith('$'):
                for k in v:
                    toks['%s.%s' % (g, k)] = 1
    sem = load('tokens/10-semantic/semantic.json')['semantic']
    all_ids = set(btc.collect(REPO))
    refre = re.compile(r'\{([\w.-]+)\}')
    def check_refs(obj, where):
        if isinstance(obj, str):
            for m in refre.finditer(obj):
                r = m.group(1)
                ok = r in all_ids
                if not ok:
                    fail('%s: unresolved token reference {%s}' % (where, r))
        elif isinstance(obj, dict):
            for k, v in obj.items():
                check_refs(v, where)
        elif isinstance(obj, list):
            for v in obj:
                check_refs(v, where)
    for rel in ('tokens/10-semantic/semantic.json', 'tokens/20-component/component.json') + tuple(os.path.relpath(p, REPO) for p in glob.glob(os.path.join(REPO, 'tokens/themes/*.json'))):
        check_refs(load(rel), rel)
    for th in glob.glob(os.path.join(REPO, 'tokens/themes/*.json')):
        d = json.load(open(th))
        if d['theme'] not in manifest['schemaValidatedThemes']:
            fail('theme %s not in manifest.schemaValidatedThemes' % d['theme'])
    # ---- 7 citations
    cit = {c['ref']: c['anchor'] for c in load('extraction/measured-values.json')['citations']}
    cre = re.compile(r'^([\w./@-]+\.\w+):(\d+)(?:-(\d+))?$')
    used = set()
    def collect(o):
        if isinstance(o, dict):
            for k, v in o.items():
                if k == 'measuredFrom':
                    for x in (v if isinstance(v, list) else [v]):
                        if isinstance(x, str) and cre.match(x):
                            used.add(x)
                else:
                    collect(v)
        elif isinstance(o, list):
            for v in o:
                collect(v)
    for p in glob.glob(os.path.join(REPO, '**/*.json'), recursive=True):
        if p.endswith('measured-values.json'):
            continue
        collect(json.load(open(p)))
    for u in sorted(used - set(cit)):
        fail('citation %s is not registered in measured-values.json' % u)
    root = sources_root()
    if not root:
        warn('no source project beside design-repo/ - %d citations NOT resolved (expected when delivered standalone)' % len(cit))
    else:
        for ref, anchor in sorted(cit.items()):
            m = cre.match(ref)
            path, l1, l2 = m.group(1), int(m.group(2)), int(m.group(3) or m.group(2))
            fp = os.path.join(root, path)
            if not os.path.isfile(fp):
                fail('citation file missing: %s' % ref); continue
            lines = open(fp, errors='replace').read().split('\n')
            if l1 < 1 or l2 > len(lines) or l1 > l2:
                fail('citation out of range: %s (file has %d lines)' % (ref, len(lines))); continue
            if anchor not in '\n'.join(lines[l1 - 1:l2]):
                fail('citation in range but anchor %r not found inside %s' % (anchor, ref))
        for r_, d in reg.items():
            for f in d['files']:
                if not os.path.exists(os.path.join(root, 'public', f.lstrip('/'))):
                    fail('registered asset missing from source public/: %s' % f)
    # ---- 10 token contract
    built = btc.build(REPO)
    if btc.dumps(built) != open(os.path.join(REPO, btc.CATALOG_REL)).read():
        fail('tokens/llm/token-catalog.json is stale or hand-edited: run python3 extraction/build_token_catalog.py --write')
    catalog = {t['id']: t for t in built['tokens']}
    cats = set(built['categories'])
    if set(pol['categories']) != cats:
        fail('token-policy categories %s != catalog categories %s' % (sorted(pol['categories']), sorted(cats)))
    for c in pol['rawValueRestrictions']:
        if c not in cats:
            fail('token-policy rawValueRestrictions key %r is not a catalog category' % c)
        for pid in pol['rawValueRestrictions'][c]:
            if pid not in pol['rawValuePatterns']:
                fail('rawValueRestrictions.%s names unknown pattern %s' % (c, pid))
    for pid, pd in pol['rawValuePatterns'].items():
        try:
            if not re.search(pd['regex'], pd['example']):
                fail('rawValuePattern %s does not match its own example %r' % (pid, pd['example']))
        except re.error as e:
            fail('rawValuePattern %s is not a valid regex: %s' % (pid, e))
    found_fields = []
    def find_style(sch, path, sid):
        if not isinstance(sch, dict):
            return
        if 'styleField' in sch:
            found_fields.append((sid, '/'.join(path), sch))
            return
        for k, v in sch.get('properties', {}).items():
            find_style(v, path + [k], sid)
        if 'items' in sch:
            find_style(sch['items'], path + ['[]'], sid)
    for sid in sorted(sections):
        find_style(sections[sid]['content'], [], sid)
    pf = {(f['section'], f['path']): f for f in pol['styleFields']}
    if set(pf) != {(a, b) for a, b, _ in found_fields}:
        fail('token-policy styleFields != styleField markers in section contracts: policy-only=%s contract-only=%s' % (sorted(set(pf) - {(a, b) for a, b, _ in found_fields}), sorted({(a, b) for a, b, _ in found_fields} - set(pf))))
    for sid, path, sch in found_fields:
        f = pf.get((sid, path))
        sf = sch['styleField']
        if f and (f['categories'] != sf['categories'] or f['allowedPrefixes'] != sf['allowedPrefixes']):
            fail('styleField %s:%s categories/prefixes differ between policy and contract' % (sid, path))
        for c in sf['categories']:
            if not pol['categories'].get(c, {}).get('pageSpecReferenceable'):
                fail('styleField %s:%s allows non-referenceable category %s' % (sid, path, c))
        want = sorted(i for i, t in catalog.items() if t['category'] in sf['categories'] and any(i.startswith(p_) for p_ in sf['allowedPrefixes']))
        if not want:
            fail('styleField %s:%s allows no catalog token' % (sid, path))
        if sch['properties']['token'].get('enum') != want:
            fail('styleField %s:%s token enum != catalog ids matching its prefixes' % (sid, path))
        if sch.get('additionalProperties') is not False or sch.get('required') != ['token'] or sch.get('type') != 'object':
            fail('styleField %s:%s is not a closed {"token"} object' % (sid, path))
    def rawscan(o, sid):
        if isinstance(o, str):
            for pid, pd in pol['rawValuePatterns'].items():
                if re.search(pd['regex'], o):
                    fail('%s cloneExampleContent contains a raw style literal (%s): %r' % (sid, pid, o[:60]))
                    return
        elif isinstance(o, dict):
            for k, v in o.items():
                if k not in pol['rawLiteralScanExemptKeys']['keys']:
                    rawscan(v, sid)
        elif isinstance(o, list):
            for v in o:
                rawscan(v, sid)
    for sid, sec in sections.items():
        if 'cloneExampleContent' not in sec:
            fail('%s has no cloneExampleContent' % sid)
        else:
            rawscan(sec['cloneExampleContent'], sid)
    # ---- 11 asset contract
    for r_, d_ in reg.items():
        if d_.get('contract') not in ('clone-only', 'generation-safe'):
            fail('asset role %s has invalid contract %r' % (r_, d_.get('contract')))
        elif d_['contract'] == 'clone-only':
            if d_.get('policy') != 'clone-exact-reuse':
                fail('clone-only role %s must have policy clone-exact-reuse' % r_)
            sub = d_.get('generationSubstitute')
            if reg.get(sub, {}).get('contract') != 'generation-safe':
                fail('clone-only role %s needs a generation-safe generationSubstitute (got %r)' % (r_, sub))
        else:
            if d_.get('policy') not in ('generate-original', 'placeholder'):
                fail('generation-safe role %s has policy %r' % (r_, d_.get('policy')))
            if 'generationSubstitute' in d_:
                fail('generation-safe role %s must not declare a substitute' % r_)
    for r_ in PINNED_CLONE_ONLY:
        if reg.get(r_, {}).get('contract') != 'clone-only':
            fail('pinned role %s must be clone-only, registry says %r' % (r_, reg.get(r_, {}).get('contract')))
    else_enum = schema.get('else', {}).get('properties', {}).get('nodes', {}).get('items', {}).get('properties', {}).get('media', {}).get('items', {})
    if schema.get('if') != {'required': ['mode'], 'properties': {'mode': {'const': 'clone'}}} or else_enum.get('properties', {}).get('assetRole', {}).get('enum') != gen_safe or else_enum.get('not') != {'required': ['assetRef']}:
        fail('schema generation-mode branch (if/else) does not restrict media to generation-safe roles without assetRef')
    for sid, s_ in sections.items():
        if s_['media']:
            want = []
            for r_ in s_['media']['roles']:
                g_ = reg[r_]['generationSubstitute'] if reg[r_].get('contract') == 'clone-only' else r_
                if g_ not in want:
                    want.append(g_)
            if s_['media'].get('generationRoles') != want:
                fail('%s media.generationRoles %s != substitutes of its roles %s' % (sid, s_['media'].get('generationRoles'), want))
    dl = regfull['nameDenylist']
    if not any('Cradle' in e['names'] for e in dl['brand']):
        fail('nameDenylist.brand must contain Cradle')
    slugs = {e['slug'] for e in dl['customers']}
    for f_ in reg['customer-logo']['files']:
        m_ = re.search(r'/(?:customer|testimonial)-logo-([a-z0-9-]+)\.\w+$', f_)
        if m_ and m_.group(1) not in slugs:
            fail('customer logo %s names a customer missing from nameDenylist.customers' % f_)
    pslugs = {e['slug'] for e in dl['people']}
    for f_ in reg['person-photo']['files']:
        m_ = re.match(r'^/assets/cms/authors/([a-z]+(?:-[a-z]+)+)\.\w+$', f_)
        if m_ and m_.group(1) not in pslugs:
            fail('author photo %s names a person missing from nameDenylist.people' % f_)
    for e in dl['customers'] + dl['people']:
        for f_ in e['derivedFrom']:
            if f_ not in reg['customer-logo']['files'] + reg['person-photo']['files']:
                fail('nameDenylist entry %s cites unregistered file %s' % (e['slug'], f_))
    forb = ' '.join(regfull['aiGenerationGuidance']['forbidden']).lower()
    for kw in ('logo', 'customer', 'photo', 'quote', 'screenshot', 'cradle'):
        if kw not in forb:
            fail('aiGenerationGuidance.forbidden does not mention %r' % kw)
    # ---- 12 closed motion schema
    if D['motion'].get('additionalProperties') is not False:
        fail('definitions.motion must be closed (additionalProperties: false)')
    # ---- 8 portability
    for p in glob.glob(os.path.join(REPO, '**/*'), recursive=True):
        if os.path.isfile(p) and not p.endswith(('.zip', '.pyc')):
            try:
                txt = open(p, errors='strict').read()
            except Exception:
                continue
            if re.search(r'/Us' + r'ers/|[A-Za-z]:\\\\Us' + r'ers', txt):
                fail('absolute local path in %s' % os.path.relpath(p, REPO))
    # ---- 9 example + adversarial
    ex = load('schema/example.pagespec.json')
    if ex.get('mode', 'generation') != 'generation':
        fail('the bundled example must be a generation-mode PageSpec')
    errs = [r for r in sv.validate(ex) if r[0] == 'error']
    if errs:
        fail('bundled example has %d error(s): %s' % (len(errs), errs[:2]))
    if '--no-adversarial' not in argv:
        r = subprocess.run([sys.executable, os.path.join(REPO, 'schema', 'tests', 'adversarial_test.py')], capture_output=True, text=True)
        print(r.stdout.strip())
        if r.returncode != 0:
            fail('adversarial suite failed:\n' + r.stdout[-1500:] + r.stderr[-500:])
    for w_ in WARNS:
        print('WARN:', w_)
    if FAILS:
        print('verify_all: %d FAILURE(S)' % len(FAILS))
        for f in FAILS:
            print('  FAIL:', f)
        return 1
    print('verify_all: OK  counts=%s' % json.dumps(counts))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
