# Proof of Human: I Built a Reverse Turing Test After Getting Flagged as AI

*Submitted for the [June Solstice Game Jam](https://dev.to/challenges/june-game-jam-2026-06-03) — Best Ode to Alan Turing category*

---

Two weeks ago, I got flagged by Sloan.

If you've been on DEV long enough, you know Sloan. I thought Sloan was a bot. Sloan is [a person named Francis](https://dev.to/dannwaneri/i-got-flagged-by-sloan-sloan-is-a-guy-i-know-3d0e) — a community moderator who reads articles fully, runs them through GPTZero, and assesses whether the thinking is genuinely yours.

[One of the flagged articles](https://dev.to/dannwaneri/has-sloan-flagged-your-article-lately-1gmh) had sparked a five-exchange comment thread that became an open-source repo. The thinking was mine. The flag still landed.

That's the uncomfortable thing about the Turing Test in 2026: it doesn't measure origin. It measures surface texture. And if you write well enough, you sound like a machine.

---

## The Game

**[Play Proof of Human →](https://proof-of-human.pages.dev)**

Five questions. You write your answers. Claude scores them 0–100 on how human they sound, tells you what gave you away, and at the end gives you an average.

The questions are the ones that actually separate humans from pattern-matchers:

1. Describe the last time something genuinely surprised you. Not shocked — surprised.
2. What's something you changed your mind about in the last year? What moved you?
3. What's a skill you have that you never bothered to put on your CV?
4. Name something you've read or watched that you think about more than you expected to.
5. What do you actually think about AI? Not what you're supposed to think — what you actually think.

The scoring prompt at the heart of it:

> *Human signals: named specifics, opinions that could get you in trouble, genuine uncertainty, things slightly off-topic but revealing.*
> *AI signals: balanced framing, hedge words, smooth transitions, excessive completeness.*

Score 60 or above: **Passes**. Below 60: **Flagged**.

---

## The Solstice Angle

The June solstice is the longest day — the day the sun is most itself. Unambiguous. No hedging.

That's what this game is asking for. Not your best answer. Your most *you* answer. The one that's slightly off-topic, slightly embarrassing, slightly specific in a way that reveals something you didn't mean to reveal. That's the signal.

Turing's original question was: *can a machine think?* The question we're living with now is its inversion — *can a human still sound like one?* On the longest day, that feels worth asking.

---

## Technical Approach

**Stack:** Vanilla JavaScript, zero dependencies, one HTML file. Cloudflare Worker as API proxy. Cloudflare Pages for hosting.

The Worker keeps the Anthropic API key server-side — the frontend never touches it. One API call per round, model is `claude-sonnet-4-6`.

**Worker** (`/score` endpoint):
- Receives `{ prompt, response }` from the frontend
- Calls the Anthropic Messages API with the scoring prompt
- Returns `{ score, verdict, reason }` JSON
- Full CORS headers for Pages → Worker communication

**Frontend:**
- Single `index.html`, no build step
- Progress bar tracks your 5 answers (green = Passes, red = Flagged)
- Score bar animates on result
- Final screen shows average + breakdown

The codebase is readable top-to-bottom. No framework magic, no hidden state. A judge can open DevTools and follow exactly what happens on each submit.

```
proof-of-human/
  index.html          ← full game
  worker/
    src/index.js      ← CF Worker proxy
    wrangler.toml
```

---

## What I Learned Building It

The scoring prompt took the most iteration. The first version was too generous — everything passed. The second was too harsh — everything got flagged. The final version keys on one thing: **specificity that costs you something**. An answer that names a real person, admits a real mistake, or takes a position you might regret. That's what the model now reliably catches.

The irony: I had to write like an AI to build a detector for AI writing. I kept second-guessing my own prompt phrasing, smoothing transitions, hedging. The game caught me too.

---

## Play It

**[→ proof-of-human.pages.dev](https://proof-of-human.pages.dev)**

Source: [github.com/dannwaneri/proof-of-human](https://github.com/dannwaneri/proof-of-human)

*Built June 2026. Vanilla JS. One API call. No frameworks. The Sloan incident was real.*

---

*Tags: `gamedev`, `javascript`, `cloudflare`, `ai`, `showdev`*
