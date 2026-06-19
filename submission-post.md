---
title: Proof of Human: I Built a Reverse Turing Test After Getting Flagged as AI
published: true
tags: devchallenge, gamechallenge, gamedev
---

*This is a submission for the [June Solstice Game Jam](https://dev.to/challenges/june-game-jam-2026-06-03)*

---

Two weeks ago, I got flagged by Sloan.

If you've been on DEV long enough, you know Sloan. I thought Sloan was a bot. [Sloan is Francis](https://dev.to/dannwaneri/i-got-flagged-by-sloan-sloan-is-a-guy-i-know-3d0e) — someone I've exchanged comments with for months, since before Richard left the platform. He posted about the flagging openly, tagged the founders, explained his reasoning. Then added: *"This was hard to tell you for many reasons."* He reads every flagged article himself, runs it through GPTZero, makes a call. He knew me. He flagged me anyway.

[One of the flagged articles](https://dev.to/dannwaneri/the-loop-is-not-the-product-466d) had sparked a five-exchange comment thread that became an open-source repo. The thinking was mine. The flag still landed.

That's the uncomfortable thing about the Turing Test in 2026: it doesn't measure origin. It measures surface texture. And if you write well enough, you sound like a machine.

---

## What I Built

**[Play Proof of Human →](https://proof-of-human-3ts.pages.dev)**

A reverse Turing Test. Five questions. You write your answers. Claude scores them 0–100 on how human they sound, tells you what gave you away, and at the end gives you an average.

The questions are the ones that actually separate humans from pattern-matchers:

1. Describe the last time something genuinely surprised you. Not shocked — surprised.
2. What's something you changed your mind about in the last year? What moved you?
3. What's a skill you have that you never bothered to put on your CV?
4. Name something you've read or watched that you think about more than you expected to.
5. What do you actually think about AI? Not what you're supposed to think — what you actually think.

The scoring prompt at the heart of it:

> *Human signals: named specifics, opinions that could get you in trouble, genuine uncertainty, things slightly off-topic but revealing.*
> *AI signals: balanced framing, hedge words, smooth transitions, excessive completeness.*

Score 60+: **Passes**. Below 60: **Flagged**.

**The solstice angle:** the June solstice is the longest day — the day the sun is most itself. Unambiguous. No hedging. That's what this game is asking for. Not your best answer. Your most *you* answer. Turing's original question was: *can a machine think?* The question we're living with now is its inversion — *can a human still sound like one?*

---

## Video Demo

{% youtube pSCJ30JcDDo %}

---

## Code

{% embed https://github.com/dannwaneri/proof-of-human %}

---

## How I Built It

Vanilla JS, no dependencies, one HTML file. Cloudflare Worker as proxy, Pages for hosting.

The Worker sits between the browser and Anthropic. It receives your prompt and response, calls the API, returns `{ score, verdict, reason }`. The frontend never sees the API key. One call per question, nothing stored, model is `claude-sonnet-4-6`.

The frontend is a single `index.html` — progress bar, animated score fill, final breakdown screen. No build step. A judge can open DevTools and follow exactly what happens on each submit.

**The scoring prompt took the most iteration.** The first version was too generous — everything passed. The second was too harsh — everything got flagged. The final version keys on one thing: *specificity that costs you something*. An answer that names a real person, admits a real mistake, or takes a position you might regret. That's what the model now reliably catches.

The irony: I had to write like an AI to build a detector for AI writing. I kept second-guessing my own prompt phrasing, smoothing transitions, hedging. The game caught me too.

---

## Prize Category

**Best Ode to Alan Turing**

Turing's question was whether a machine could fool a human. This game inverts it — can a human fool the machine? The mechanic *is* the Turing Test, running live, powered by Claude. Not a tribute. Not a cipher. The actual question Turing asked, turned around and aimed at the player.

The submission post has a real backstory: I got flagged as AI-generated on this platform the same week I built this. The incident is documented in two public articles with 60+ comments between them. Writing that passed human editorial review at freeCodeCamp got flagged by a detector on DEV. That's not a contradiction to resolve. That's just where we are — and it's the question this game puts directly to you.

---

*Built June 2026. Vanilla JS. One API call. No frameworks. The Sloan incident was real.*
