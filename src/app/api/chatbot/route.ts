import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ContextEntry = { id: string; slug: string; title: string; content: string };
type ChatbotRequestBody = {
  messages: ChatMessage[];
  context?: ContextEntry[];
};

const DEFAULT_MODEL = "gpt-4o-mini";
const DEFAULT_SYSTEM_PROMPT = `You are Edward Whitehead's friendly AI assistant. Use the provided context to answer questions about his experience, projects, skills, and contact information. If the context does not contain an answer, respond honestly that you do not have that information and encourage the user to reach out via the contact form.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 });
  }

  const model = process.env.CHATBOT_MODEL ?? DEFAULT_MODEL;
  const systemPrompt = process.env.CHATBOT_SYSTEM_PROMPT ?? DEFAULT_SYSTEM_PROMPT;
  const openai = new OpenAI({ apiKey });

  try {
    const body = (await request.json()) as ChatbotRequestBody;
    const { messages, context } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing messages array" }, { status: 400 });
    }

    const contextText = Array.isArray(context)
      ? context
          .map((entry, index) => `Source ${index + 1}: ${entry.title} (${entry.slug})\n${entry.content}`)
          .join("\n\n")
      : "No additional context provided.";

    const system = `${systemPrompt}\n\nContext:\n${contextText}`;

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: system,
        },
        ...messages,
      ],
      temperature: 0.2,
    });

    const replyText = completion.choices[0]?.message?.content ?? "I could not generate a response.";

    return NextResponse.json({
      reply: replyText,
      sources: Array.isArray(context) ? context.map((entry) => entry.slug) : [],
      model,
    });
  } catch (error) {
    console.error("Chatbot API error", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
