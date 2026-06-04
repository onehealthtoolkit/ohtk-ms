# OHTK MS (Management System)

A Next.js admin web app for the One Health Toolkit surveillance platform. It talks
to the Django/GraphQL backend (`../ohtk-api`) and is multi-tenant — the effective
backend is resolved at runtime from the `*.opensur.test` subdomain.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) **22** (see `.nvmrc`). Run
  `corepack enable` so the pinned Yarn is available.
- The OHTK API running locally (`../ohtk-api`).
- [Laravel Valet](https://laravel.com/docs/valet) (bundles **dnsmasq** + **nginx**)
  and [mkcert](https://github.com/FiloSottile/mkcert) — used to serve the app over
  HTTPS on a `*.opensur.test` host (required for cookie auth, see below).

### Install

```bash
git clone https://github.com/onehealthtoolkit/ohtk-ms.git
cd ohtk-ms
corepack enable
yarn install
```

### Start the dev server

The Next.js dev server runs on port **5100** (`package.json` → `next dev -p 5100`):

```bash
yarn dev
```

For pure UI work you can open [http://localhost:5100](http://localhost:5100)
directly — but **authentication will not work over `localhost`**. Use the HTTPS
setup below.

---

## Local development with HTTPS (Valet + dnsmasq + nginx)

The app authenticates against the backend using **HTTP-only JWT cookies**
(`SameSite=None; Secure`). A browser only sends those cookies when **both** of
these hold:

1. the request goes to an **HTTPS** endpoint, and
2. the page and the API are on the **same site** (same registrable domain).

The backend lives on a subdomain of `opensur.test`, so the dashboard must also be
served from `*.opensur.test` over HTTPS. Plain `http://localhost:5100` is a
_different_ site (`localhost` ≠ `opensur.test`), so the cookies are treated as
third-party and silently dropped — login looks like it "succeeds" but every
request is unauthenticated. We fix this with Valet (dnsmasq + nginx).

> dnsmasq (installed by Valet) resolves `*.test` → `127.0.0.1`, so `opensur.test`
> and any subdomain (`bon.opensur.test`, `dashboard.opensur.test`, …) resolve with
> **no `/etc/hosts` edits**.

### 1. Backend on `*.opensur.test` (Valet proxy)

Run the Django API on `127.0.0.1:8000` (see `../ohtk-api`) and expose it over
HTTPS through Valet:

```bash
valet proxy opensur http://127.0.0.1:8000 --secure
```

`--secure` issues a Valet CA cert covering `opensur.test` **and** `*.opensur.test`
(already trusted by your browser). The tenant is chosen by subdomain, e.g. the
GraphQL endpoint is `https://bon.opensur.test/graphql/`.

### 2. Dashboard on `dashboard.opensur.test` (nginx reverse proxy)

Valet's nginx already owns `:443` and proxies _all_ of `*.opensur.test` to the
backend. Add a **more specific** server block so only `dashboard.opensur.test` is
routed to the Next dev server on `:5100` — an exact `server_name` beats Valet's
`*.opensur.test` wildcard, so every other host still reaches the backend.

Create `/opt/homebrew/etc/nginx/servers/dashboard.opensur.test.conf`
(this file is already `include`d by Valet's nginx):

```nginx
server {
    listen 127.0.0.1:80;
    server_name dashboard.opensur.test;
    return 301 https://$host$request_uri;
}

server {
    listen 127.0.0.1:443 ssl;
    http2 on;
    server_name dashboard.opensur.test;

    # Reuse Valet's already-trusted wildcard cert (DNS:*.opensur.test).
    # Adjust the home directory to yours.
    ssl_certificate     "/Users/<you>/.config/valet/Certificates/opensur.test.crt";
    ssl_certificate_key "/Users/<you>/.config/valet/Certificates/opensur.test.key";

    client_max_body_size 128M;

    location / {
        proxy_pass http://127.0.0.1:5100;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Next.js dev hot-reload websocket (/_next/webpack-hmr)
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_read_timeout 1800;
        proxy_buffering off;
    }
}
```

Reload nginx (Valet's master runs as root, so this needs `sudo`):

```bash
sudo nginx -s reload
```

The dashboard is now at **https://dashboard.opensur.test**, same-site with the API.

### 3. Point the app at the backend

Set the default backend in `.env` (local only — **not** committed):

```
serverDomain=bon.opensur.test
```

…or pick the `bon` subdomain on the login screen. If you logged in previously
under an older token flow, clear stale state once with `localStorage.clear()` in
the dev console, then log in again.

### 4. Verify cookie auth

After logging in at `https://dashboard.opensur.test`, in DevTools:

- **Application → Cookies → `https://bon.opensur.test`** — JWT + refresh cookies
  flagged **HttpOnly / Secure / SameSite=None**.
- **Network → a `graphql` request** — a `Cookie:` header and **no** `Authorization`
  header.
- **Application → Local Storage** — no `accessToken` / `refreshToken` keys.

---

### Create required OHTK data

To use the mobile app you need some seed records — Authorities, Report Categories,
Report Types, etc. Create them through the admin screens once you're logged in.
