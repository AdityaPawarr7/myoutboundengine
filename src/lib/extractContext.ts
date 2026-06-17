import type Anthropic from "@anthropic-ai/sdk";
import { anthropic, MODEL } from "./anthropic";

export interface ExtractedContext {
  name: string;
  icp: string;
  valueProps: string;
  objections: string;
  differentiators: string;
}

const SYSTEM_PROMPT = `You are a B2B go-to-market strategist. Given raw information about a product or service, extract the key elements a cold-email writer needs to personalize outreach and prove value.

Return ONLY a JSON object (no markdown, no preamble) with exactly these keys:
- "name": a short product/company name (string)
- "icp": the ideal customer profile — who buys this, their roles, company size, industry, and the specific pain or OKR it addresses (string, 2-4 sentences)
- "valueProps": the core value propositions — concrete outcomes and metrics the product delivers, framed around buyer OKRs (string, can use newline-separated bullets)
- "objections": the most likely objections or hesitations a prospect raises, and how to preempt them (string, newline-separated)
- "differentiators": what makes this distinct from alternatives or the status quo (string, newline-separated)

Be specific and concrete. Avoid generic marketing fluff. If the input lacks detail on a field, infer the most plausible answer from context and keep it tight.`;

export async function extractProductContext(
  rawInput: string
): Promise<ExtractedContext> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Here is the raw product/service information:\n\n${rawInput}`,
      },
    ],
  });

  const text = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

  let parsed: ExtractedContext;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse Claude response as JSON");
  }

  return {
    name: parsed.name?.trim() || "Untitled product",
    icp: parsed.icp?.trim() || "",
    valueProps: parsed.valueProps?.trim() || "",
    objections: parsed.objections?.trim() || "",
    differentiators: parsed.differentiators?.trim() || "",
  };
}
