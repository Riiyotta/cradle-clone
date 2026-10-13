#!/usr/bin/env python3
"""Prove that verify_all.py's drift checks actually fail on bad input.

    python3 extraction/prove_drift.py

For each case: copy design-repo/ to a fresh temp directory, apply one mutation, run verify_all.py
there and require a non-zero exit with the expected message. Then run the untouched copy and
require it to pass. Cases that need the sibling source project (citation range/anchor) run only
when it is present beside design-repo/ (it is linked read-only into the scratch tree); otherwise
they are reported as SKIPPED, never as passed.
"""
import json, os, re, shutil, subprocess, sys, tempfile

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.dirname(REPO) if os.path.isdir(os.path.join(os.path.dirname(REPO), 'src')) else None


def jedit(rel, fn):
    def apply(root):
        p = os.path.join(root, rel)
        with open(p) as f:
            d = json.load(f)
        fn(d)
        with open(p, 'w') as f:
            json.dump(d, f, indent=2, ensure_ascii=False)
            f.write('\n')
    return apply


def tedit(rel, old, new):
    def apply(root):
        p = os.path.join(root, rel)
        s = open(p).read()
        assert old in s, (rel, old)
        open(p, 'w').write(s.replace(old, new, 1))
    return apply


def _first_section_file(root):
    return sorted(os.listdir(os.path.join(root, 'sections')))[0]


def set_role(role, **kw):
    def f(d):
        d['roles'][role].update(kw)
    return f


def add_customer_logo(d):
    d['roles']['customer-logo']['files'].append('/assets/customer-logo-newco.svg')


def first_citation_out_of_range(d):
    c = next(c for c in d['citations'] if c['ref'].startswith('src/'))
    path = c['ref'].rsplit(':', 1)[0]
    c['ref'] = path + ':99999'


def first_citation_wrong_anchor(d):
    c = next(c for c in d['citations'] if c['ref'].startswith('src/'))
    c['anchor'] = 'this text is not in the cited range'


CASES = [
    # (name, mutation, expected message regex, needs_source, run_adversarial)
    ('allowlist parity: phantom section id', jedit('tokens/llm/component-allowlist.json', lambda d: d['sections'].append('hero.phantom')), r'allowlist\.sections parity', False, False),
    ('allowlist parity: orphan contract', lambda r: os.remove(os.path.join(r, 'sections', 'hero.home.json')), r'allowlist\.sections parity', False, False),
    ('allowlist parity: asset role lists', jedit('tokens/llm/component-allowlist.json', lambda d: d['generationSafeAssetRoles'].append('customer-logo')), r'generationSafe/cloneOnly', False, False),
    ('citation: unregistered measuredFrom', jedit('tokens/00-foundation/radius.json', lambda d: d['radius']['r-8']['$extensions'].update(measuredFrom='src/App.jsx:1-2')), r'not registered in measured-values', False, False),
    ('citation: out-of-range line', jedit('extraction/measured-values.json', first_citation_out_of_range), r'citation out of range|not registered', True, False),
    ('citation: in-range, wrong anchor', jedit('extraction/measured-values.json', first_citation_wrong_anchor), r'anchor .* not found', True, False),
    ('manifest: wrong count', jedit('registry.manifest.json', lambda d: d['counts'].update(catalogTokens=1)), r'manifest\.counts\.catalogTokens', False, False),
    ('manifest: ../ entry point', jedit('registry.manifest.json', lambda d: d['entryPoints'].update(ia='../ia.json')), r'points outside the package', False, False),
    ('portability: absolute path', tedit('README.md', '# Cradle design-repo', '# Cradle design-repo /Us' + 'ers/someone/x'), r'absolute local path', False, False),
    ('token catalog: token edited without rebuild', jedit('tokens/00-foundation/color.json', lambda d: d['color']['modality.antibody'].update({'$value': '#000000'})), r'token-catalog\.json is stale', False, False),
    ('token catalog: hand-edited catalog', jedit('tokens/llm/token-catalog.json', lambda d: d['tokens'].append({'id': 'color.invented'})), r'token-catalog\.json is stale', False, False),
    ('token policy: category name not in catalog', jedit('tokens/llm/token-policy.json', lambda d: d['rawValueRestrictions'].update(shadow=['css-length'])), r"rawValueRestrictions key 'shadow'", False, False),
    ('token policy: styleField dropped', jedit('tokens/llm/token-policy.json', lambda d: d['styleFields'].pop()), r'styleFields != styleField markers|allowlist\.styleFields', False, False),
    ('token policy: motion made referenceable', jedit('tokens/llm/token-policy.json', lambda d: d['categories']['motion'].update(pageSpecReferenceable=True)), r'pageSpecTokenCategories', False, False),
    ('asset contract: pinned role flipped to a different valid contract', jedit('tokens/llm/asset-roles.json', set_role('customer-logo', contract='generation-safe', policy='placeholder')), r'pinned role customer-logo must be clone-only', False, False),
    ('asset contract: person-photo substitute made clone-only', jedit('tokens/llm/asset-roles.json', set_role('person-photo', generationSubstitute='lab-photo')), r'generation-safe generationSubstitute', False, False),
    ('asset contract: default mode flipped to clone', jedit('tokens/llm/asset-roles.json', lambda d: d.update(defaultMode='clone')), r'default mode must be "generation"', False, False),
    ('asset contract: new customer logo without denylist entry', jedit('tokens/llm/asset-roles.json', add_customer_logo), r'missing from nameDenylist\.customers', False, False),
    ('schema: motion opened', jedit('schema/pagespec.schema.json', lambda d: d['definitions']['motion'].update(additionalProperties=True)), r'motion must be closed', False, False),
    ('schema: generation branch removed', jedit('schema/pagespec.schema.json', lambda d: d.pop('else')), r'generation-mode branch', False, False),
    ('example: real customer name reintroduced', tedit('schema/example.pagespec.json', 'Head of Protein Science, Tallowmere Biologics', 'Chief Scientific Officer, Novonesis'), r'bundled example has', False, False),
    ('example: raw hex reintroduced', tedit('schema/example.pagespec.json', '"bg": {\n              "token": "color.modality.antibody"\n            }', '"bg": "#3cab57"'), r'bundled example has', False, False),
    ('validator: template node-list cross-check disabled', tedit('schema/semantic_validate.py', "    tpl = ctx['tpl']\n    want = [n['section'] for n in tpl['nodes']]", "    return []\n    tpl = ctx['tpl']\n    want = [n['section'] for n in tpl['nodes']]"), r'adversarial suite failed', False, True),
    ('validator: token-ref rule disabled', tedit('schema/semantic_validate.py', 'def r_TOKEN_REFS_RESOLVE(repo, spec, ctx):\n', 'def r_TOKEN_REFS_RESOLVE(repo, spec, ctx):\n    return []\n'), r'adversarial suite failed', False, True),
    ('validator: generation asset rule disabled', tedit('schema/semantic_validate.py', 'def r_GENERATION_SAFE_ASSETS(repo, spec, ctx):\n', 'def r_GENERATION_SAFE_ASSETS(repo, spec, ctx):\n    return []\n'), r'adversarial suite failed', False, True),
    ('validator: name denylist rule disabled', tedit('schema/semantic_validate.py', 'def r_NO_REAL_ENTITY_NAMES_IN_GENERATION(repo, spec, ctx):\n', 'def r_NO_REAL_ENTITY_NAMES_IN_GENERATION(repo, spec, ctx):\n    return []\n'), r'adversarial suite failed', False, True),
    ('validator: raw-literal rule disabled', tedit('schema/semantic_validate.py', 'def r_NO_RAW_STYLE_LITERALS(repo, spec, ctx):\n', 'def r_NO_RAW_STYLE_LITERALS(repo, spec, ctx):\n    return []\n'), r'adversarial suite failed', False, True),
    ('graph/validator: rule id only in graph', jedit('compatibility/graph.json', lambda d: d['rules'].append({'id': 'INVENTED_RULE', 'severity': 'error', 'description': 'x'})), r'graph rules vs validator RULES', False, False),
]


def scratch(with_source):
    tmp = tempfile.mkdtemp(prefix='drift-')
    dst = os.path.join(tmp, 'design-repo')
    shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns('__pycache__', '*.pyc', '.DS_Store'))
    if with_source and SRC:
        for name in os.listdir(SRC):
            if name in ('design-repo', 'design-repo.zip', '.git', 'node_modules', 'dist'):
                continue
            os.symlink(os.path.join(SRC, name), os.path.join(tmp, name))
    return tmp, dst


def run(dst, adversarial):
    args = [sys.executable, os.path.join(dst, 'extraction', 'verify_all.py')] + ([] if adversarial else ['--no-adversarial'])
    return subprocess.run(args, capture_output=True, text=True, cwd=dst)


def main():
    bad = 0
    print('source project beside design-repo/: %s' % ('yes' if SRC else 'no (citation range/anchor cases will be SKIPPED)'))
    for name, mutate, expect, needs_src, adv in CASES:
        if needs_src and not SRC:
            print('  SKIPPED  %s (needs the source project)' % name)
            continue
        tmp, dst = scratch(needs_src)
        try:
            mutate(dst)
            r = run(dst, adv)
            out = r.stdout + r.stderr
            ok = r.returncode != 0 and re.search(expect, out)
            print('  %s  %s' % ('CAUGHT ' if ok else 'MISSED ', name))
            if not ok:
                bad += 1
                print('     exit=%d expected /%s/\n%s' % (r.returncode, expect, out[-800:]))
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
    tmp, dst = scratch(True)
    try:
        r = run(dst, True)
        ok = r.returncode == 0
        print('  %s  unmutated scratch copy passes verify_all (with adversarial suite)' % ('PASSED ' if ok else 'FAILED '))
        if not ok:
            bad += 1
            print(r.stdout[-1500:] + r.stderr[-500:])
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    print('prove_drift: %d case(s), %d missed' % (len(CASES), bad))
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
