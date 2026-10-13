#!/usr/bin/env python3
"""Build tokens/llm/token-catalog.json deterministically from the token source files.

    python3 extraction/build_token_catalog.py           # print a diff summary, exit 1 if the catalog is stale
    python3 extraction/build_token_catalog.py --write   # rewrite tokens/llm/token-catalog.json

The catalog is a derived view: every id, category, resolved value and citation comes from
tokens/00-foundation, tokens/10-semantic, tokens/20-component and tokens/30-layout. verify_all.py
rebuilds it in memory and fails if the committed file differs, so a token edited without a rebuild
(or a hand-edited catalog) cannot ship.
"""
import glob, json, os, re, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG_REL = 'tokens/llm/token-catalog.json'
VERSION = '1.1.0'

# foundation group -> catalog category
GROUP_CATEGORY = {
    'color': 'color', 'alpha': 'color', 'elevation': 'elevation', 'spacing': 'spacing', 'radius': 'radius',
    'fontFamily': 'typography', 'fontWeight': 'typography', 'fontSize': 'typography', 'letterSpacing': 'typography',
    'textStyle': 'typography', 'motion': 'motion', 'breakpoint': 'breakpoint', 'iconSize': 'sizing',
}
REF = re.compile(r'\{([\w.-]+)\}')


def _load(repo, rel):
    with open(os.path.join(repo, rel)) as f:
        return json.load(f)


def collect(repo=REPO):
    """Return {id: entry} with raw values (refs unresolved)."""
    out = {}
    for p in sorted(glob.glob(os.path.join(repo, 'tokens/00-foundation/*.json'))):
        rel = os.path.relpath(p, repo).replace(os.sep, '/')
        d = _load(repo, rel)
        file_cite = (d.get('$extensions') or {}).get('measuredFrom')
        for g, grp in d.items():
            if g.startswith('$') or not isinstance(grp, dict):
                continue
            if g not in GROUP_CATEGORY:
                raise SystemExit('unknown foundation group %s in %s' % (g, rel))
            for k, t in grp.items():
                if k.startswith('$'):
                    continue
                tid = '%s.%s' % (g, k)
                val = t['$value'] if '$value' in t else {kk: vv for kk, vv in t.items() if not kk.startswith('$')}
                out[tid] = {'id': tid, 'category': GROUP_CATEGORY[g], 'type': t.get('$type'), 'raw': val,
                            'source': {'file': rel, 'pointer': '/%s/%s' % (g, k)},
                            'measuredFrom': (t.get('$extensions') or {}).get('measuredFrom') or file_cite}
    sem = _load(repo, 'tokens/10-semantic/semantic.json')['semantic']
    for k, t in sem.items():
        tid = 'semantic.' + k
        out[tid] = {'id': tid, 'category': 'color' if t.get('$type') == 'color' else t.get('$type'), 'type': t.get('$type'), 'raw': t['$value'],
                    'source': {'file': 'tokens/10-semantic/semantic.json', 'pointer': '/semantic/' + k},
                    'measuredFrom': (t.get('$extensions') or {}).get('measuredFrom')}
    comp = _load(repo, 'tokens/20-component/component.json')['component']
    for k, t in comp.items():
        tid = 'component.' + k
        out[tid] = {'id': tid, 'category': 'component', 'type': 'composite', 'raw': t['props'],
                    'source': {'file': 'tokens/20-component/component.json', 'pointer': '/component/' + k},
                    'measuredFrom': (t.get('$extensions') or {}).get('measuredFrom')}
    lay = _load(repo, 'tokens/30-layout/layout.json')['layout']
    for k, t in lay.items():
        tid = 'layout.' + k
        out[tid] = {'id': tid, 'category': 'layout', 'type': t.get('$type', 'dimension'), 'raw': t['$value'],
                    'source': {'file': 'tokens/30-layout/layout.json', 'pointer': '/layout/' + k},
                    'measuredFrom': (t.get('$extensions') or {}).get('measuredFrom')}
    return out


def resolve(raw, toks, stack=()):
    """Resolve {id} references. A string that is exactly one reference takes the referenced value as-is."""
    if isinstance(raw, dict):
        return {k: resolve(v, toks, stack) for k, v in raw.items()}
    if isinstance(raw, list):
        return [resolve(v, toks, stack) for v in raw]
    if not isinstance(raw, str):
        return raw
    m = REF.fullmatch(raw)
    if m:
        rid = m.group(1)
        if rid not in toks:
            raise KeyError(rid)
        if rid in stack:
            raise ValueError('reference cycle: %s' % ' -> '.join(stack + (rid,)))
        return resolve(toks[rid]['raw'], toks, stack + (rid,))

    def sub(mm):
        v = resolve('{%s}' % mm.group(1), toks, stack)
        return v if isinstance(v, str) else json.dumps(v)
    return REF.sub(sub, raw)


def refs_in(raw):
    if isinstance(raw, dict):
        return [r for v in raw.values() for r in refs_in(v)]
    if isinstance(raw, list):
        return [r for v in raw for r in refs_in(v)]
    return REF.findall(raw) if isinstance(raw, str) else []


def build(repo=REPO):
    toks = collect(repo)
    entries = []
    for tid in sorted(toks):
        t = toks[tid]
        e = {'id': tid, 'category': t['category'], 'type': t['type'], 'value': resolve(t['raw'], toks)}
        refs = refs_in(t['raw'])
        if refs:
            e['references'] = sorted(set(refs))
            e['authoredValue'] = t['raw']
        e['source'] = t['source']
        e['measuredFrom'] = t['measuredFrom']
        entries.append(e)
    cats = {}
    for e in entries:
        c = cats.setdefault(e['category'], {'count': 0, 'sourceFiles': []})
        c['count'] += 1
        if e['source']['file'] not in c['sourceFiles']:
            c['sourceFiles'].append(e['source']['file'])
    return {
        '$description': ('Every usable design token, one entry per id, with its resolved value, category and citations. '
                         'GENERATED by extraction/build_token_catalog.py from tokens/00-foundation, 10-semantic, 20-component and '
                         '30-layout; do not edit by hand (verify_all.py rebuilds it and fails on any difference). source.file + '
                         'source.pointer locate the authored token; measuredFrom is the evidence citation registered in '
                         'extraction/measured-values.json (or a histogram description). Which categories and ids a PageSpec may '
                         'reference is decided by tokens/llm/token-policy.json, not by this file. Theme instances '
                         '(tokens/themes/*.json) map roles onto semantic.* ids and are not separate tokens.'),
        'catalogVersion': VERSION,
        'referenceForm': {'token': '<id>'},
        'categories': {k: cats[k] for k in sorted(cats)},
        'count': len(entries),
        'tokens': entries,
    }


def dumps(obj):
    return json.dumps(obj, indent=2, ensure_ascii=False) + '\n'


def main(argv):
    want = dumps(build())
    path = os.path.join(REPO, CATALOG_REL)
    have = open(path).read() if os.path.exists(path) else ''
    if '--write' in argv:
        with open(path, 'w') as f:
            f.write(want)
        print('wrote %s (%d tokens)' % (CATALOG_REL, json.loads(want)['count']))
        return 0
    if have != want:
        print('%s is stale: rebuild with --write' % CATALOG_REL)
        return 1
    print('%s is up to date (%d tokens)' % (CATALOG_REL, json.loads(want)['count']))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
