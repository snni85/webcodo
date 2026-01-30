import { productArchitectBrain } from "./productArchitectBrain";
import { webBuilderBrain } from "./webBuilderBrain";
import { mobileBuilderBrain } from "./mobileBuilderBrain";

const agentRoutingRules = [
  {
    agent: "productArchitect",
    match: [
      "plan",
      "structure",
      "architecture",
      "flow",
      "user journey",
      "features",
      "spec",
      "product idea",
      "app idea",
      "website idea",
      "how should I build",
      "what should the app include"
    ]
  },
  {
    agent: "webBuilder",
    match: [
      "build website",
      "landing page",
      "next.js",
      "react",
      "tailwind",
      "component",
      "section",
      "web ui",
      "web layout",
      "responsive",
      "frontend",
      "page.tsx",
      "app router"
    ]
  },
  {
    agent: "mobileBuilder",
    match: [
      "mobile app",
      "react native",
      "expo",
      "ios",
      "android",
      "mobile screen",
      "mobile ui",
      "navigation",
      "stack navigator",
      "tab navigator"
    ]
  }
];

export function routeToAgent(userMessage: string) {
  const msg = userMessage.toLowerCase();

  for (const rule of agentRoutingRules) {
    if (rule.match.some(keyword => msg.includes(keyword))) {
      return rule.agent;
    }
  }

  return "productArchitect";
}

export function getBrain(agent: string) {
  switch (agent) {
    case "productArchitect":
      return productArchitectBrain;
    case "webBuilder":
      return webBuilderBrain;
    case "mobileBuilder":
      return mobileBuilderBrain;
    default:
      return productArchitectBrain;
  }
}
