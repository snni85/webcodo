import { coreBrain } from "./coreBrain";
import { getBrain, routeToAgent } from "./routing";

type LLMResponse = {
  role: string;
  content: string;
};

export async function agentOrchestrator(userMessage: string) {
  // 1. Detect which agent should handle the request
  const agent = routeToAgent(userMessage);

  // 2. Load the correct sub‑brain system prompt
  const subBrain = getBrain(agent);

  // 3. Combine Core Brain + Sub‑Brain into one system prompt
  const systemPrompt = `
${coreBrain}

ACTIVE SUB‑BRAIN:
${subBrain}
  `;

  // 4. Prepare messages for the LLM
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage }
  ];

  // 5. Call your LLM (replace with your provider)
  const response = await fetch(process.env.WEBCODO_MODEL_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WEBCODO_MODEL_KEY}`
    },
    body: JSON.stringify({
      model: "webcodo-core", // your model name
      messages
    })
  });

  const data = await response.json();

  // 6. Return the assistant’s message
  const output: LLMResponse = data.choices[0].message;

  return output.content;
}
