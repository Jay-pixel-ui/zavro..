import { generateText } from "ai";
import { buildSystemPrompt } from "@/lib/knowledge-base";

export const maxDuration = 30;

const MODEL = "openai/gpt-5.4-mini";
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 20;

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

function isValidMessage(m: unknown): m is ChatMessage {
  if (typeof m !== "object" || m === null) return false;
  const msg = m as Record<string, unknown>;
  return (
    (msg.role === "user" || msg.role === "assistant") &&
    typeof msg.text === "string" &&
    msg.text.length > 0 &&
    msg.text.length <= MAX_MESSAGE_LENGTH * 4
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return Response.json({ error: "Invalid messages payload." }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1] as ChatMessage;
  if (lastMessage.role !== "user" || lastMessage.text.trim().length === 0) {
    return Response.json({ error: "Last message must be from the user." }, { status: 400 });
  }
  if (lastMessage.text.length > MAX_MESSAGE_LENGTH) {
    return Response.json({ error: "Message too long." }, { status: 400 });
  }

  // Keep only the most recent turns to bound token usage.
  const history = messages.slice(-MAX_HISTORY).map((m: ChatMessage) => ({
    role: m.role,
    content: m.text,
  }));

  try {
    const { text } = await generateText({
      model: MODEL,
      instructions: buildSystemPrompt(),
      messages: history,
    });

    return Response.json({ reply: text });
  } catch (error) {
    console.error("[chat] generation failed:", error);
    return Response.json(
      { error: "NOVA is briefly offline. Please try again shortly." },
      { status: 502 },
    );
  }
}
