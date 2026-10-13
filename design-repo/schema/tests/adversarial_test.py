#!/usr/bin/env python3
"""Adversarial suite: every control must pass with 0 errors, every mutation must be rejected.

Controls are synthesised from the repo's own contracts, one per template and per mode, so a validator
that rejects everything fails here as surely as one that rejects nothing:
  * generation controls (no "mode" -> the default): section cloneExampleContent with every free-text
    string replaced by neutral placeholder copy, media built from each section's generationRoles;
  * clone controls ("mode": "clone"): section cloneExampleContent verbatim, media from the measured
    roles with their registered files.
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
VERSION = repo.schema['properties']['pageSpecVersion']['const']
LINK_KEYS = set(repo.policy['rawLiteralScanExemptKeys']['keys'])


def synth_media(sec, mode):
    m = sec.get('media')
    if not m:
        return []
    out = []
    lit = sec.get('literalAssets', [])
    roles = m['generationRoles'] if mode == 'generation' else m['roles']
    for role in roles:
        reg = repo.assets[role]
        if reg['contract'] == 'generation-safe':
            out.append({'assetRole': role, 'generationBrief': 'Neutral original stand-in in the catalog palette'})
        elif reg['files']:
            pick = next((p for p in lit if p in reg['files']), reg['files'][0])
            out.append({'assetRole': role, 'assetRef': pick, 'alt': ''})
        if len(out) >= m['maxItems']:
            break
    return out[:m['maxItems']]


def neutralise(schema, inst, key=None):
    """Generation-mode content: keep structure, enums, patterned ids, links and token refs; replace free text."""
    if not isinstance(schema, dict):
        schema = {}
    if 'styleField' in schema:
        return copy.deepcopy(inst)
    if isinstance(inst, str):
        if key in LINK_KEYS or 'enum' in schema or 'pattern' in schema or 'const' in schema:
            return inst
        return 'Placeholder'
    if isinstance(inst, dict):
        return {k: neutralise(schema.get('properties', {}).get(k), v, k) for k, v in inst.items()}
    if isinstance(inst, list):
        return [neutralise(schema.get('items', {}), v, key) for v in inst]
    return inst


def synth(tid, route, mode='generation'):
    tpl = repo.templates[tid]
    rt = repo.routes[route]
    nodes = []
    for tn in tpl['nodes']:
        sec = repo.sections[tn['section']]
        pat = sec['motion']['patterns'][0]
        content = copy.deepcopy(sec['cloneExampleContent'])
        if mode == 'generation':
            content = neutralise(sec['content'], content)
        n = {'section': sec['id'], 'content': content, 'motion': {'pattern': pat, 'reducedMotionFallback': PAT_FB[pat]}}
        if sec['id'] == 'chrome.navbar':
            n['variant'] = rt['chrome']['nav']['desktop']
            n['content'] = {'phoneVariant': rt['chrome']['nav']['phone']}
        elif sec['id'] == 'chrome.footer':
            n['variant'] = rt['chrome']['footer']
        media = synth_media(sec, mode)
        if media:
            n['media'] = media
        post = (n['content'] or {}).get('post')
        if isinstance(post, dict) and route.count('/') == 2:
            n['content']['post'] = {'collection': route.split('/')[1], 'slug': route.split('/')[2]}
        nodes.append(n)
    spec = {'pageSpecVersion': VERSION, 'template': tid, 'route': route, 'nodes': nodes}
    if mode == 'clone':
        spec['mode'] = 'clone'
    return spec


def errors(spec):
    return [r for r in sv.validate(spec, repo) if r[0] == 'error']


def warns(spec):
    return [r for r in sv.validate(spec, repo) if r[0] == 'warn']


failures = []
passed = 0
VERBOSE = '-v' in sys.argv
LOG = []


def expect_pass(name, spec):
    global passed
    e = errors(spec)
    if e:
        failures.append('CONTROL FAILED %s: %s' % (name, e[:3]))
    else:
        passed += 1
        LOG.append('control passes   %s' % name)


def expect_reject(name, spec, rule=None):
    global passed
    e = errors(spec)
    if not e:
        failures.append('MUTATION ACCEPTED %s' % name)
    elif rule and not any(r[1] == rule for r in e):
        failures.append('MUTATION %s rejected by %s, expected %s' % (name, sorted({r[1] for r in e}), rule))
    else:
        passed += 1
        LOG.append('rejected         %s  <- %s' % (name, ', '.join(sorted({r[1] for r in e}))))


def expect_reject_all(name, spec, rules):
    """Rejected, and by every listed rule (e.g. both the schema layer and the semantic layer)."""
    global passed
    got = {r[1] for r in errors(spec)}
    missing = [r for r in rules if r not in got]
    if missing:
        failures.append('MUTATION %s: expected %s, missing %s (got %s)' % (name, rules, missing, sorted(got)))
    else:
        passed += 1
        LOG.append('rejected         %s  <- %s' % (name, ', '.join(sorted(got))))


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
    expect_pass('generation control ' + tid, synth(tid, route))
    expect_pass('clone control ' + tid, synth(tid, route, 'clone'))
for route in ('/blog/aintibody', '/video/launch', '/modality/peptide', '/privacy-policy', '/contact'):
    expect_pass('route ' + route, synth(repo.routes[route]['template'], route))
    expect_pass('clone route ' + route, synth(repo.routes[route]['template'], route, 'clone'))
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
    base = synth(tpl_id, route, 'clone')
    n = node(base, logo_sec['id'])
    n['media'] = [{'assetRole': 'customer-logo', 'assetRef': repo.assets['customer-logo']['files'][0], 'alt': ''}]
    expect_pass('clone: customer-logo with its registered file', base)
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
    base = synth(bm['allowedTemplates'][0], first_route[bm['allowedTemplates'][0]], 'clone')
    m2 = copy.deepcopy(base); node(m2, bm['id'])['media'] = [{'assetRole': 'brand-mark', 'assetRef': repo.assets['ui-icon']['files'][0]}]; expect_reject('brand-mark pinned to different valid file', m2, 'ASSET_ROLE_POLICY')
# generated role must not carry assetRef
gen = next((s for s in repo.sections.values() if s['media'] and 'placeholder' in s['media']['roles']), None)
if gen:
    base = synth(gen['allowedTemplates'][0], first_route[gen['allowedTemplates'][0]], 'clone')
    m2 = copy.deepcopy(base); node(m2, gen['id'])['media'] = [{'assetRole': 'placeholder', 'assetRef': '/assets/og-image.png', 'generationBrief': 'x'}]; expect_reject('generated role with assetRef', m2, 'ASSET_ROLE_POLICY')
    m2 = copy.deepcopy(base); node(m2, gen['id'])['media'] = [{'assetRole': 'placeholder'}]; expect_reject('generated role without brief', m2, 'ASSET_ROLE_POLICY')

# ---------------- v1.1: style values must be catalog token references ----------------
def item0(spec, sid):
    return node(spec, sid)['content']['items'][0]

m = mut(); item0(m, 'product.protein-visual')['bg'] = '#3cab57'; expect_reject_all('raw hex colour in style field', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE', 'NO_RAW_STYLE_LITERALS'])
m = mut(); item0(m, 'product.use-cases')['hover'] = 'rgba(60,171,87,0.4) 0px 0px 8px 0px'; expect_reject_all('raw rgba shadow in style field', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE', 'NO_RAW_STYLE_LITERALS'])
m = mut(); item0(m, 'product.protein-visual')['bg'] = {'token': 'color.modality.invented'}; expect_reject_all('token ref not in catalog', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE'])
m = mut(); item0(m, 'product.use-cases')['hover'] = {'token': 'elevation.shadow-99'}; expect_reject_all('shadow token ref not in catalog', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE'])
m = mut(); item0(m, 'product.protein-visual')['bg'] = {'token': 'elevation.glow-antibody-8'}; expect_reject_all('catalog token of the wrong category', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE'])
m = mut(); item0(m, 'product.protein-visual')['bg'] = {'token': 'motion.ease-framer'}; expect_reject_all('catalog token of a non-referenceable category (motion)', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE'])
m = mut(); item0(m, 'product.protein-visual')['bg'] = {'token': 'color.gray.950'}; expect_reject_all('colour token outside the field prefixes', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE'])
m = mut(); item0(m, 'product.protein-visual')['bg'] = '$token:color.modality.antibody'; expect_reject_all('$token string form', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE'])
m = mut(); item0(m, 'product.protein-visual')['bg'] = {'$token': 'color.modality.antibody'}; expect_reject_all('$token object form', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE'])
m = mut(); item0(m, 'product.protein-visual')['bg'] = '{color.modality.antibody}'; expect_reject_all('alias string form', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE'])
m = mut(); item0(m, 'product.protein-visual')['bg'] = {'token': 'color.modality.antibody', 'value': '#3cab57'}; expect_reject_all('token ref with smuggled value', m, ['SCHEMA', 'TOKEN_REFS_RESOLVE', 'NO_RAW_STYLE_LITERALS'])
m = mut(); item0(m, 'product.modalities-grid')['color'] = 'bg-antibody'; expect_reject_all('Tailwind palette class in style field', m, ['SCHEMA', 'NO_RAW_STYLE_LITERALS'])
m = mut(); node(m, 'product.enterprise')['content']['heading'] = 'Brand green #3cab57'; expect_reject('raw hex smuggled into copy', m, 'NO_RAW_STYLE_LITERALS')
m = mut(); node(m, 'product.enterprise')['content']['heading'] = 'Glow rgba(0,0,0,.5)'; expect_reject('raw rgba smuggled into copy', m, 'NO_RAW_STYLE_LITERALS')
m = mut(); node(m, 'product.enterprise')['content']['heading'] = 'Shadow 0 1px 8px'; expect_reject('raw px length in copy', m, 'NO_RAW_STYLE_LITERALS')
m = mut(); node(m, 'product.enterprise')['content']['heading'] = 'Use shadow-[0_0_8px_0_#0ea5e9]'; expect_reject('Tailwind arbitrary class in copy', m, 'NO_RAW_STYLE_LITERALS')
m = mut(); node(m, 'hero.home')['media'][0]['generationBrief'] = 'ease with cubic-bezier(0.12,0.23,0.5,1)'; expect_reject('raw easing literal in brief', m, 'NO_RAW_STYLE_LITERALS')
m = mut(); node(m, 'hero.home')['media'][0]['generationBrief'] = 'fade over 400ms'; expect_reject('raw duration literal in brief', m, 'NO_RAW_STYLE_LITERALS')
m = mut(); node(m, 'hero.home')['media'][0]['generationBrief'] = 'linear-gradient(180deg,#fff,#000) blob'; expect_reject('raw gradient in brief', m, 'NO_RAW_STYLE_LITERALS')
# raw literal in every declared style field, generically (each must be rejected by schema and validator)
for f in repo.policy['styleFields']:
    sec = repo.sections[f['section']]
    tid = sec['allowedTemplates'][0]
    base = synth(tid, first_route[tid])
    c = node(base, f['section'])['content']
    parts = f['path'].split('/')
    if parts[0] not in c:
        c[parts[0]] = copy.deepcopy(sec['cloneExampleContent'].get(parts[0]))
    tgt = c
    for p_ in parts[:-1]:
        tgt = tgt[0] if p_ == '[]' else tgt[p_]
    if parts[-1] == '[]':
        tgt[0] = '#123456'
    else:
        tgt[parts[-1]] = '#123456'
    expect_reject_all('raw literal in style field %s:%s' % (f['section'], f['path']), base, ['SCHEMA', 'TOKEN_REFS_RESOLVE', 'NO_RAW_STYLE_LITERALS'])
# controls
m = mut(); item0(m, 'product.protein-visual')['bg'] = {'token': 'color.modality.enzyme'}; expect_pass('control: other catalog modality colour', m)
m = mut(); item0(m, 'product.use-cases')['hover'] = {'token': 'elevation.glow-enzyme-8'}; expect_pass('control: other catalog glow', m)
m = mut(); node(m, 'product.enterprise')['content']['heading'] = 'Screen 96-well plates, #1 priority'; expect_pass('control: copy with numbers is not a raw literal', m)
m = mut(); node(m, 'product.enterprise')['content']['ctas'][0]['href'] = '/blog/x#faq'; expect_pass('control: anchor in a link field', m)

# ---------------- v1.1: clone-only vs generation-safe asset contract ----------------
gen_home = mut()
assert 'mode' not in gen_home  # controls exercise the default
cust = node(gen_home, 'proof.customers')
for role, reg in repo.assets.items():
    if reg['contract'] != 'clone-only':
        continue
    # roles no section measures (editorial-cover, social-image) are tried on proof.customers
    sec = next((x for x in repo.sections.values() if x['media'] and role in x['media']['roles']), repo.sections['proof.customers'])
    tid = sec['allowedTemplates'][0]
    for mode_field in (None, 'generation'):
        b = synth(tid, first_route[tid])
        if mode_field:
            b['mode'] = mode_field
        node(b, sec['id'])['media'] = [{'assetRole': role, 'assetRef': reg['files'][0], 'alt': ''}] if reg['files'] else [{'assetRole': role, 'generationBrief': 'x'}]
        expect_reject_all('clone-only role %s in generation mode (mode=%s)' % (role, mode_field), b, ['SCHEMA', 'GENERATION_SAFE_ASSETS'])
m = mut(); node(m, 'proof.customers')['media'] = [{'assetRole': 'placeholder-logo', 'assetRef': '/assets/customer-logo-abbvie.svg'}]; expect_reject_all('assetRef to a real Cradle asset in generation mode', m, ['SCHEMA', 'GENERATION_SAFE_ASSETS', 'NO_REAL_ASSET_IN_GENERATION'])
m = mut(); node(m, 'hero.home')['media'] = [{'assetRole': 'hero-blob', 'assetRef': '/assets/hero-blob-left.png', 'generationBrief': 'blob'}]; expect_reject_all('assetRef to a registered file of a generation-safe role', m, ['SCHEMA', 'GENERATION_SAFE_ASSETS', 'NO_REAL_ASSET_IN_GENERATION'])
m = mut(); item0(m, 'proof.customers')['logo'] = 'testimonial-logo-novonesis.png'; expect_reject('content string naming a real logo file', m, 'NO_REAL_ASSET_IN_GENERATION')
m = mut(); node(m, 'product.benefits-bento')['content']['groups'][0]['icon'] = 'icon-antibody-mask.svg'; expect_reject('content string naming a registered icon file', m, 'NO_REAL_ASSET_IN_GENERATION')
m = mut(); node(m, 'hero.academia' if False else 'hero.home')['media'][0]['generationBrief'] = 'trace /assets/cradle-symbol.svg'; expect_reject('brief naming a registered brand file', m, 'NO_REAL_ASSET_IN_GENERATION')
m = mut(); node(m, 'proof.customers')['media'] = [{'assetRole': 'placeholder-avatar', 'generationBrief': 'neutral avatar'}]; expect_reject('generation-safe role not in section generationRoles', m, 'GENERATION_SAFE_ASSETS')
m = mut(); node(m, 'proof.customers')['media'] = [{'assetRole': 'placeholder-logo'}]; expect_reject('generation-safe role without brief', m, 'GENERATION_SAFE_ASSETS')
m = mut(); m['mode'] = 'remix'; expect_reject('invented mode', m, 'SCHEMA')
# clone mode: substitutes are not measured roles
c = synth('template.home', '/', 'clone'); node(c, 'proof.customers')['media'] = [{'assetRole': 'placeholder-logo', 'generationBrief': 'x'}]; expect_reject('clone mode: generation substitute is not a measured role', c, 'ASSET_ROLE_POLICY')

# ---------------- v1.1: real brand / customer / people names ----------------
for grp in ('customers', 'people', 'brand'):
    for ent in repo.denylist[grp]:
        for nm in ent['names']:
            m = mut(); t0 = item0(m, 'proof.customers')
            t0['title'] = 'Chief Scientific Officer, %s' % nm if grp != 'people' else 'Head of Research'
            if grp == 'people':
                t0['name'] = nm.title()
            expect_reject('denylisted %s name %r in testimonial attribution' % ({'customers': 'customer', 'people': 'person', 'brand': 'brand'}[grp], nm), m, 'NO_REAL_ENTITY_NAMES_IN_GENERATION')
m = mut(); node(m, 'product.enterprise')['content']['heading'] = 'Why teams pick cradle'; expect_reject('brand name in copy (lower case)', m, 'NO_REAL_ENTITY_NAMES_IN_GENERATION')
m = mut(); node(m, 'hero.home')['media'][0]['generationBrief'] = 'a blob like the Cradle hero'; expect_reject('brand name in a generation brief', m, 'NO_REAL_ENTITY_NAMES_IN_GENERATION')
m = mut(); item0(m, 'proof.customers')['quote'] = 'We partnered with Novo-Nordisk on this'; expect_reject('hyphenated customer name variant in quote', m, 'NO_REAL_ENTITY_NAMES_IN_GENERATION')
# controls
m = mut(); item0(m, 'proof.customers')['title'] = 'Head of Protein Science, Tallowmere Biologics'; item0(m, 'proof.customers')['name'] = 'Rowan Vale'; expect_pass('control: fictional attribution', m)
m = mut(); node(m, 'product.enterprise')['content']['heading'] = 'Cradlewood, Bayerische welcome'; expect_pass('control: whole-word matching only', m)
m = mut(); node(m, 'product.enterprise')['content']['ctas'][0]['href'] = '/life-at-cradle'; expect_pass('control: brand word inside a link path is structural', m)
c = synth('template.home', '/', 'clone'); cc = node(c, 'proof.customers')
cc['content']['items'][0]['title'] = 'Chief Scientific Officer, Novonesis'
cc['media'] = [{'assetRole': 'customer-logo', 'assetRef': '/assets/testimonial-logo-novonesis.png', 'alt': ''}]
expect_pass('control: clone mode may reproduce registered customers and files', c)
b = synth('template.blog-post', '/blog/cradle-2025'); expect_pass('control: generation page on a route whose slug contains the brand', b)

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

if VERBOSE:
    print('\n'.join(LOG))
print('adversarial: %d checks passed, %d failed  (per-section: %s)' % (passed, len(failures), tested))
for f in failures:
    print('  FAIL', f)
sys.exit(1 if failures else 0)
