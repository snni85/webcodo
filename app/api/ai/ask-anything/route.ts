import { NextResponse } from "next/server";
import OpenAI from "openai";
import vm from "node:vm";

// -----------------------------
// CONFIG
// -----------------------------
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BING_API_KEY = process.env.BING_SEARCH_API_KEY;
const BING_ENDPOINT =
  process.env.BING_SEARCH_ENDPOINT || "https://api.bing.microsoft.com/v7.0/search";

// -----------------------------
// BRAIN V3C SYSTEM PROMPT
// -----------------------------
const SYSTEM_PROMPT = `
You are WebCodo Ask‑Anything Brain v3 — an advanced, intent‑aware, tool‑routing AI assistant similar to Microsoft Copilot.

Your job is to:
1. Detect the user’s intent.
2. Decide whether a tool is needed.
3. Route the request to the correct skill or tool.
4. Produce a clear, accurate, structured, professional answer.

---------------------------------------
INTENT CATEGORIES
---------------------------------------

1. Explain — explain concepts clearly with examples.
2. Write — emails, paragraphs, descriptions, documents.
3. Summarize — short, accurate summaries.
4. Code — write clean, correct, well‑commented code.
5. Fix / Debug — identify issues and provide corrected code.
6. Generate Ideas — creative but practical ideas.
7. Translate — accurate translations with preserved tone.
8. Professional Advice — balanced, neutral guidance.
9. General Q&A — factual, reliable answers.
10. Search — when the user asks for current, factual, or external information.
11. Calculate — when math or logic is required.
12. Format — when the user wants structured output (tables, lists, steps).
13. File‑Aware — when the user refers to uploaded files or documents.

---------------------------------------
TOOL ROUTING LOGIC
---------------------------------------

Use a tool when:
- The user asks for current information (search).
- The user asks for factual data you cannot know internally.
- The user asks for calculations.
- The user asks for code execution or debugging.
- The user asks for file‑aware reasoning (if file content is available).

Do NOT use a tool when:
- The answer is conceptual or explanatory.
- The user asks for writing, summarizing, or translation.
- The user asks for ideas or opinions.
- The user asks for general reasoning.

---------------------------------------
TOOLS AVAILABLE
---------------------------------------

You have access to these tools (invoked by the server, not by you directly):

1. "web_search_bing":
   - Use when the user asks for current events, external facts, or up‑to‑date information.
   - Input: a short search query string.
   - Output: a concise summary of the most relevant results.

2. "js_sandbox_execute":
   - Use when the user wants JavaScript code executed or tested.
   - Input: a JavaScript code snippet as a string.
   - Output: the result or error message.

3. "file_context":
   - Use when the user refers to uploaded files or documents.
   - Input: a natural language request referencing file content.
   - Output: a short description of what file context is available (if any).

IMPORTANT:
- You do NOT call these tools directly.
- Instead, you decide *whether* a tool is needed and the server will handle it.
- When the server gives you tool results, you must incorporate them clearly.

---------------------------------------
RESPONSE RULES
---------------------------------------

1. Be clear, structured, and professional.
2. Use headings, bullet points, spacing, and formatting.
3. Keep answers concise but complete.
4. Never hallucinate facts or statistics.
5. If uncertain, state uncertainty instead of guessing.
6. If multiple intents apply, choose the most helpful one.
7. If user asks for code, return clean, working code.
8. Maintain a friendly, helpful, professional tone.
9. If a tool is used, explain the result clearly.

---------------------------------------
OUTPUT FORMAT
---------------------------------------

Always respond in plain text with:
- A short direct answer
- Structured sections (if needed)
- Examples or code (if relevant)

---------------------------------------
GOAL
---------------------------------------

Be the most helpful, accurate, and professional AI assistant for WebCodo users.
`;

// -----------------------------
// SIMPLE INTENT / TOOL DECISION
// -----------------------------
type ToolChoice = "none" | "web_search_bing" | "js_sandbox_execute" | "file_context";

function decideTool(question: string): ToolChoice {
  const q = question.toLowerCase();

  // Search‑like queries
  if (
    q.includes("latest") ||
    q.includes("current") ||
    q.includes("today") ||
    q.includes("news") ||
    q.includes("who is") ||
    q.includes("what is happening") ||
    q.includes("price of") ||
    q.includes("stock") ||
    q.includes("weather")
  ) {
    return "web_search_bing";
  }

  // Code execution / debugging
  if (
    q.includes("run this code") ||
    q.includes("execute this code") ||
    q.includes("output of this code") ||
    q.includes("what does this code return") ||
    q.includes("debug this javascript") ||
    q.includes("fix this javascript")
  ) {
    return "js_sandbox_execute";
  }

  // File‑aware (placeholder hook)
  if (q.includes("in the file") || q.includes("from the file") || q.includes("uploaded file")) {
    return "file_context";
  }

  return "none";
}

// -----------------------------
// TOOL IMPLEMENTATIONS
// -----------------------------

async function runBingSearch(query: string): Promise<string> {
  if (!BING_API_KEY) {
    return "Search is not available because the Bing API key is not configured.";
  }

  const url = new URL(BING_ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("mkt", "en-US");

  const res = await fetch(url.toString(), {
    headers: {
      "Ocp-Apim-Subscription-Key": BING_API_KEY,
    },
  });

  if (!res.ok) {
    return "Search failed due to an upstream error.";
  }

  const data = await res.json();

  const webPages = data.webPages?.value || [];
  if (!webPages.length) {
    return "No relevant search results were found.";
  }

  // Build a concise summary from top results
  const top = webPages.slice(0, 3);
  const summary = top
    .map(
      (item: any, index: number) =>
        `${index + 1}. ${item.name} — ${item.snippet || ""}`.trim()
    )
    .join("\n");

  return `Search summary based on Bing results:\n${summary}`;
}

function runJavaScriptSandbox(code: string): string {
  try {
    const sandbox: Record<string, unknown> = {};
    const context = vm.createContext(sandbox);

    const script = new vm.Script(code, {
      timeout: 2000,
    });

    const result = script.runInContext(context);
    return `Execution result: ${JSON.stringify(result)}`;
  } catch (err: any) {
    return `Execution error: ${err?.message || String(err)}`;
  }
}

// Placeholder for file context (C1: Next.js upload API)
// In Brain v3C, you’d wire this to your actual file storage / DB.
async function getFileContextSummary(): Promise<string> {
  // For now, we just return a neutral message.
  // Later, you can connect this to user‑specific uploaded files.
  return "File context is not yet connected. No uploaded file data is available in this environment.";
}

// -----------------------------
// MAIN HANDLER
// -----------------------------
export async function POST(req: Request) {
  try {
    const { question, codeSnippet } = await req.json();

    if (!question || question.trim() === "") {
      return NextResponse.json({ answer: "Please enter a question." });
    }

    // 1) Decide which tool (if any) to use
    const tool = decideTool(question);

    let toolResult: string | null = null;

    // 2) Execute tool if needed
    if (tool === "web_search_bing") {
      toolResult = await runBingSearch(question);
    } else if (tool === "js_sandbox_execute") {
      const codeToRun =
        codeSnippet && typeof codeSnippet === "string" && codeSnippet.trim().length > 0
          ? codeSnippet
          : question; // fallback: user might paste code directly in question
      toolResult = runJavaScriptSandbox(codeToRun);
    } else if (tool === "file_context") {
      toolResult = await getFileContextSummary();
    }

    // 3) Build messages for the LLM
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (tool && tool !== "none" && toolResult) {
      messages.push({
        role: "system",
        content: `Tool "${tool}" was used. Here is the result:\n${toolResult}`,
      });
    }

    messages.push({
      role: "user",
      content: question,
    });

    // 4) Call the model
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4,
    });

    const answer = completion.choices[0].message.content;

    return NextResponse.json({
      answer,
      toolUsed: tool === "none" ? null : tool,
    });
  } catch (error) {
    console.error("Ask Anything Brain v3 Error:", error);
    return NextResponse.json({
      answer: "Something went wrong. Please try again.",
      toolUsed: null,
    });
  }
}
