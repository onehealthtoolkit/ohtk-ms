# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

OHTK Management System (`podd_manager`) — a Next.js 12 admin web app for the One Health Toolkit surveillance platform. It talks to a Django/GraphQL backend (separate repo) and is multi-tenant: the effective backend is resolved at runtime from a subdomain stored in `localStorage` (see `lib/client.ts`), falling back to `publicRuntimeConfig.serverDomain` from `next.config.js` / `.env`.

## Commands

Use Node `22` for local development, CI, and Docker builds. The repo pins Yarn through `packageManager`; run `corepack enable` if `yarn` is not available in a fresh Node `22` shell.

```bash
yarn dev                  # next dev — local server on :3000
yarn build                # production build (outputs standalone)
yarn start                # run production build
yarn lint                 # next lint
yarn test                 # jest
yarn graphql:generate     # regenerate lib/generated/graphql.tsx + graphql.schema.json from codegen.yml
```

CI also runs an offline generated-artifact check with `codegen.ci.yml`; it regenerates `lib/generated/graphql.tsx` from the committed `graphql.schema.json` so GitHub Actions does not need the local `opensur.test` backend.

Run a single test: `yarn jest path/to/file.test.ts` or `yarn jest -t "test name"`. Watch mode: `yarn jest:test-watch`.

Husky pre-commit runs `tsc --noEmit && eslint --fix . && prettier --write .` — keep the tree compiling or commits are blocked.

`start-proxy.sh` runs `mitmdump` as a reverse proxy on :443 → localhost:3000; useful when the backend requires HTTPS origins (e.g., cookie-based auth against `*.ohtk.org`).

## GraphQL code generation

`codegen.yml` pulls the schema from `https://opensur.test/graphql/`. For local upgrade work, run the upgraded `ohtk-api` first:

```bash
cd ../ohtk-api
python3.12 -m venv .venv                    # first time only
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python manage.py runserver 127.0.0.1:8000
valet proxy opensur http://127.0.0.1:8000 --secure
```

`opensur.test` should resolve to `127.0.0.1`, and Valet provides the local self-signed HTTPS endpoint expected by this app. If codegen reports the old schema (`[String]`/`Float` filter inputs), the API is probably running from the stale pre-upgrade Python env; restart it from the Python 3.12 `.venv`.

All `.graphql` documents live under `lib/**/*.graphql` colocated with their services; the generator writes typed hooks and `Document` constants into `lib/generated/graphql.tsx`. After editing a `.graphql` file, run `yarn graphql:generate`. The output file and `graphql.schema.json` are committed.

## Architecture

### Three-layer composition

The app is wired together in `pages/_app.tsx` through three nested React contexts:

1. **Apollo (`lib/client.ts`)** — single `ApolloClient` with `createUploadLink` (for multipart mutations) and a `customFetch` that transparently refreshes JWTs ~30s before expiry. `customFetch` also re-targets every request through the tenant URL saved in `localStorage[backendUrl]`, so the client instance is effectively tenant-agnostic.
2. **Services (`lib/services/provider.ts`)** — one service class per domain (`CaseService`, `AuthorityService`, `ReportService`, …). `ServicesProvider` instantiates them all with the shared Apollo client and exposes them via `useServices()`. Services are the **only** layer that knows about GraphQL documents — components/viewmodels depend on the service interface, never on Apollo directly. Each service returns results in one of four envelope types from `lib/services/interface.ts`: `QueryResult<T>`, `GetResult<T>`, `SaveResult<T>`, `DeleteResult`.
3. **Store (`lib/store.ts`)** — global MobX store holding auth/session state (`me`, `isLogin`, `menu`, feature flags, role helpers like `isRoleAdmin`). Accessed via `useStore()`. `bootstrap()` runs once on app load and attempts a refresh-token round-trip.

### MVVM with MobX

Pages render components that are bound to **view models**. View models extend one of two base classes:

- `BaseViewModel` (`lib/baseViewModel.ts`) — for list/detail screens. Provides `_isLoading`, `_totalCount`, `limit/offset` pagination, an `errors` observable map, a `dialogs` map for modals, and the `submitError`/`isSubmitting` pair.
- `BaseFormViewModel` (`lib/baseFormViewModel.ts`) — for forms. Provides `fieldErrors`, `isValid`, `clearError`, plus the same dialog machinery.

View models are constructed with the service(s) they need (dependency injection by constructor arg), which is what makes them unit-testable — see `tests/listViewModel.test.ts` for the pattern of passing a mock service into a view model. **When adding new screens, follow this pattern rather than calling Apollo from components.**

Components are wrapped in `observer(...)` from `mobx-react`. Use `makeObservable` with explicit decoration (this codebase does not use decorators / `makeAutoObservable`).

### `opsvForm` — dynamic form engine

`lib/opsvForm/models` implements a custom form runtime that loads a JSON form definition (produced by the admin form builder in `components/admin/formBuilder`) and materializes a tree of `Form → Section → Question → Field`. Fields include `textField`, `dateField`, `integerField`, `decimalField`, `imagesField`, `filesField`, `locationField`, `singleChoicesField`, `multipleChoicesField`, `subformField`. Field values are stored in a shared `Values` object with conditional-visibility support (`condition.ts`).

`components/formRenderer` renders this model tree at runtime for report/case/observation intake. `components/admin/formBuilder` is the authoring UI that produces the JSON. Changing a field type typically requires updates in three places: the model (`lib/opsvForm/models/fields/`), the renderer (`components/formRenderer/`), and the builder (`components/admin/formBuilder/`).

### Routing

Pages-router Next.js (not app-router). Two broad areas:

- `pages/admin/**` — tenant admin CRUD (authorities, users, report types, case/state definitions, places, notifications, outbreak plans, …). Each maps 1:1 to a service under `lib/services/*` and a component tree under `components/admin/*`.
- `pages/cases`, `pages/reports`, `pages/observations`, `pages/excels`, `pages/map`, `pages/account` — end-user-facing surveillance workflows.

`pages/index.tsx` redirects based on auth state (see `Store.bootstrap`).

### Internationalization

`i18n/index.js` initializes `i18next` with eight bundled languages (en, th, km, la, fr, es, mm). Detection order is query string (`?lang=`) → cookie → localStorage → navigator. Strings are flat JSON per locale in `i18n/translations.<lang>.json`.

### Other conventions

- **Path aliases**: `tsconfig.json` sets `baseUrl: "."`, so imports use bare paths like `lib/services/case` and `components/widgets/...` — preserve this, don't introduce relative `../../..` imports.
- **Styling**: Tailwind with the `Kanit` sans font; `darkMode: "class"`. Content globs cover `pages/` and `components/` only — a new top-level directory with JSX needs adding to `tailwind.config.js`.
- **Images**: `next.config.js` uses the `akamai` loader with empty path (static-host friendly); do not assume the Next.js default image loader.
- **Tests**: very small coverage — mostly `lib/opsvForm/models` field tests and the one view-model example. New view models are the natural place to add coverage.
