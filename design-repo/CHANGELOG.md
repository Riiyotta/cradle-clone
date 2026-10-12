# Changelog

## 1.0.0 (2026-10-12)

Initial build from the local clone. 98 sections, 26 templates, 101 routes, 15 graph rules, 15 asset roles covering 457 registered files.

Verification performed (see README for how to re-run):
- Draft-07 `check_schema` and bundled example: 0 errors.
- `schema/tests/adversarial_test.py`: every control passes, every mutation rejected. It caught two real validator defects during the build, both fixed: a crash on a spec with no `route`, and a protocol-relative link (`//host.tld`) that slipped past `NO_EXTERNAL_LINKS`.
- `extraction/verify_all.py` drift checks were each proven against a scratch copy (phantom allowlist entry, orphan contract, out-of-range citation, in-range citation with wrong anchor, wrong manifest count, graph/validator rule mismatch).
- Self-containment: copied to an isolated temp directory with no siblings and re-run.
