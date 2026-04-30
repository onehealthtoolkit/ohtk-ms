# AGENTS.md

This file applies to the `ohtk-ms` repository.

For detailed setup, commands, architecture, and GraphQL generation workflow, read [CLAUDE.md](/Users/pphetra/projects/opensurveillance/ohtk-ms/CLAUDE.md) first. It is the main repo-specific reference for:

- local run/build/test commands
- tenant-aware backend resolution
- service/store/view-model architecture
- dynamic form engine details
- routing and i18n conventions

This `AGENTS.md` only keeps the repo-local working rules that are easy to scan while editing.

## Repo Focus

`ohtk-ms` is the admin web client for the OHTK platform. Most changes here sit on top of GraphQL contracts from `ohtk-api`, so frontend work often has backend coupling even when the bug looks UI-only.

Before editing, identify:

- which user flow or admin area owns the behavior
- which service under `lib/services/` owns the data access
- whether the change also requires GraphQL or backend updates

## Change Rules

- Keep GraphQL access inside the service layer; do not call Apollo directly from page or feature components.
- Follow the existing view-model pattern for screen behavior instead of pushing stateful logic into components.
- Preserve path-alias imports such as `lib/...` and `components/...`; do not introduce deep relative imports.
- Treat tenant-aware backend selection and auth refresh behavior as high-risk areas and verify them explicitly.
- Keep admin form-builder changes aligned across model, renderer, and builder code paths when a form field type changes.
- Do not hand-edit generated or runtime output.

## Files To Avoid Editing By Hand

- `lib/generated/graphql.tsx`
- `graphql.schema.json`
- `.next/`
- `node_modules/`

Generated GraphQL artifacts are expected when operations change, but regenerate them from source instead of patching them manually.

## Common Change Patterns

### GraphQL and data changes

- Update `.graphql` documents and service-layer code first.
- Regenerate typed artifacts using the command documented in [CLAUDE.md](/Users/pphetra/projects/opensurveillance/ohtk-ms/CLAUDE.md).
- Assume schema-affecting changes may also require updates in `ohtk-api` and possibly `ohtk-mobile`.

### Screen and workflow changes

- Prefer changes in the relevant view model and service before expanding component-local state.
- Add or adjust targeted tests around view-model behavior when practical; that is the most natural seam in this repo.

### Dynamic form changes

- For new field behavior, check all three layers:
- `lib/opsvForm/models/`
- `components/formRenderer/`
- `components/admin/formBuilder/`

## Verification

Use the narrowest meaningful validation for the area you changed:

- `yarn lint` or the equivalent package-manager script
- targeted Jest tests for touched view models or utilities
- broader build or runtime checks when touching auth, tenant routing, GraphQL generation, or shared form infrastructure

If GraphQL documents changed, verify regenerated files are included and consistent.

## Handoff Notes

Final notes for work in this repo should call out:

- whether the change depends on `ohtk-api`
- whether GraphQL artifacts were regenerated
- what verification was run
- any tenant/auth/runtime risks that remain
