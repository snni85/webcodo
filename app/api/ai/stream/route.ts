export const runtime = "edge";

export async function POST(req: Request) {
  const { input, mode } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // 🔥 Replace this block later with a real LLM streaming call
      const fullText = `AI (${mode}) response for:\n\n${input}\n\nThis is a streamed response placeholder.`;
      const chunks = fullText.match(/.{1,40}/g) || [];

      let i = 0;
      const interval = setInterval(() => {
        if (i >= chunks.length) {
          clearInterval(interval);
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(chunks[i]));
        i++;
      }, 80);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
