# Deploy — Proof of Human

Three steps. ~5 minutes total.

## 1. Deploy the Worker (API proxy)

```bash
cd proof-of-human/worker
npm install
wrangler secret put ANTHROPIC_API_KEY
# paste your key when prompted
wrangler deploy
```

After deploy, Wrangler prints your worker URL:
```
https://proof-of-human-api.YOUR_SUBDOMAIN.workers.dev
```

## 2. Wire the URL into the frontend

Open `index.html` and replace line with `API_URL`:

```js
const API_URL = "https://proof-of-human-api.YOUR_SUBDOMAIN.workers.dev/score";
```

## 3. Deploy the frontend to Cloudflare Pages

Option A — drag and drop (fastest):
1. Go to dash.cloudflare.com → Pages → Create a project
2. Choose "Direct Upload"
3. Upload just `index.html`
4. Done. You get a `*.pages.dev` URL.

Option B — connect GitHub repo:
1. Push this folder to a GitHub repo
2. Connect it in CF Pages
3. Build command: (none — static file)
4. Build output directory: `/` (root)

---

## Local dev (optional)

To test the worker locally before deploying:

```bash
cd worker
# Add a .dev.vars file:
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .dev.vars
wrangler dev
```

The worker runs on `http://localhost:8787/score`.

Temporarily change `API_URL` in `index.html` to test locally:
```js
const API_URL = "http://localhost:8787/score";
```
