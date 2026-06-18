const SCORING_PROMPT = `You are running a reverse Turing Test. Score the response 0-100 on how human it sounds.

Human signals: named specifics, opinions that could get you in trouble, genuine uncertainty, things slightly off-topic but revealing.
AI signals: balanced framing, hedge words, smooth transitions, excessive completeness.

Return only JSON: {"score": 72, "verdict": "Passes", "reason": "one sentence"}

Verdict = "Passes" if score >= 60, "Flagged" if score < 60.`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (url.pathname !== "/score" || request.method !== "POST") {
      return new Response("Not found", { status: 404 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400);
    }

    const { prompt, response } = body;
    if (!prompt || !response) {
      return jsonResponse({ error: "Missing prompt or response" }, 400);
    }

    if (response.trim().length < 5) {
      return jsonResponse({ error: "Response too short" }, 400);
    }

    try {
      const result = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 150,
          messages: [
            {
              role: "user",
              content: `${SCORING_PROMPT}\n\nPrompt: "${prompt}"\n\nResponse: "${response}"`,
            },
          ],
        }),
      });

      if (!result.ok) {
        const err = await result.text();
        console.error(JSON.stringify({ event: "api_error", status: result.status, body: err }));
        return jsonResponse({ error: "Scoring failed" }, 502);
      }

      const data = await result.json();
      const text = data.content?.[0]?.text ?? "";

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        const match = text.match(/\{.*\}/s);
        if (match) parsed = JSON.parse(match[0]);
        else throw new Error("No JSON in response");
      }

      if (typeof parsed.score !== "number" || !parsed.verdict || !parsed.reason) {
        throw new Error("Invalid score shape");
      }

      return jsonResponse(parsed);
    } catch (err) {
      console.error(JSON.stringify({ event: "score_error", message: err.message }));
      return jsonResponse({ error: "Scoring failed" }, 500);
    }
  },
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
