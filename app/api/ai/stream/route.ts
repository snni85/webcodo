export const runtime = "edge";

const LLM_API_URL = "https://api.openai.com/v1/chat/completions"; // or your provider
const LLM_MODEL = "gpt-4.1-mini"; // or your chosen model

export async function POST(req: Request) {
  const { mode, file } = await req.json();

  const systemPrompt = buildSystemPrompt(mode, file);

  const llmRes = await fetch(LLM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: file?.content || "",
        },
      ],
    }),
  });

  if (!llmRes.ok || !llmRes.body) {
    return new Response("LLM request failed", { status: 500 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = llmRes.body!.getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (!value) continue;

        const chunk = decoder.decode(value);

        // OpenAI-style SSE: split by lines, extract `delta.content`
        const lines = chunk
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const payload = line.replace("data: ", "");
          if (payload === "[DONE]") continue;

          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              controller.enqueue(encoder.encode(delta));
            }
          } catch {
            // ignore malformed chunks
          }
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function buildSystemPrompt(
  mode: string,
  file: { name?: string; content?: string } | undefined
): string {
  const base = `You are a senior engineer working on a single file.\nFile name: ${file?.name || "unknown"}.\nAlways respond in plain text, no markdown fences.`;

  switch (mode) {
    case "Fix":
      return (
        base +
        `\n\nTask: Fix all bugs, syntax errors, and obvious issues in this file.\nReturn the FULL corrected file content. Do not explain, just output the updated file.`
      );
    case "Explain":
      return (
        base +
        `\n\nTask: Explain this file step by step.\nCover imports, components/functions, key logic, and edge cases.`
      );
    case "Refactor":
      return (
        base +
        `\n\nTask: Refactor this file for clarity and maintainability.\nPreserve behavior. Return the FULL refactored file content.`
      );
    case "Execute":
      return (
        base +
        `\n\nTask: Interpret the file as instructions and execute them conceptually.\nReturn a detailed, actionable response.`
      );
    case "Generate":
    default:
      return (
        base +
        `\n\nTask: Use the file content as instructions or context and generate the best possible helpful output.`
      );
  }
}
