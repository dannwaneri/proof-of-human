# Proof of Human

A reverse Turing Test. Five questions. Claude scores your answers 0–100 on how human they sound and tells you what gave you away.

**[Play it →](https://proof-of-human-3ts.pages.dev)**

---

## How it works

You write. Claude reads. It scores on one axis: specificity that costs you something. Named people, opinions you might regret, genuine uncertainty, things slightly off-topic but revealing. Those pass. Balanced framing, hedge words, smooth transitions — those get flagged.

Score 60+: **Passes**. Below 60: **Flagged**.

---

## Stack

- Frontend: single `index.html`, vanilla JS, no framework, no build step
- Backend: Cloudflare Worker (keeps API key server-side)
- Hosting: Cloudflare Pages
- Model: `claude-sonnet-4-6`

---

## Deploy your own

**1. Deploy the Worker**

```bash
cd worker
npm install
wrangler secret put ANTHROPIC_API_KEY
wrangler deploy
```

**2. Update the API URL in `index.html`**

```js
const API_URL = "https://your-worker.your-subdomain.workers.dev/score";
```

**3. Deploy the frontend**

```bash
# From the repo root
wrangler pages project create proof-of-human --production-branch main
wrangler pages deploy . --project-name proof-of-human --commit-dirty=true
```

**Local dev**

```bash
cd worker
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .dev.vars
wrangler dev
# Change API_URL in index.html to http://localhost:8787/score
```

---

## Origin

Built for the [DEV June Solstice Game Jam 2026](https://dev.to/challenges/june-game-jam-2026-06-03) after getting flagged by DEV's moderation system for writing that scored too clean on AI detectors.

The uncomfortable thing about the Turing Test in 2026: it doesn't measure origin. It measures surface texture. If you write well enough, you sound like a machine.

---

*Vanilla JS. One API call. No frameworks. The Sloan incident was real.*
