import OpenAI from "openai";

export interface Env {
    OPENAI_API_KEY: string;
    CHATBOT_SYSTEM_PROMPT?: string;
    CHATBOT_MODEL?: string;
}

const DEFAULT_MODEL = "gpt-4o-mini";
const DEFAULT_SYSTEM_PROMPT = `You are Edward Whitehead's friendly AI assistant. Use the provided context to answer questions about his experience, projects, skills, and contact information. If the context does not contain an answer, respond honestly that you do not have that information and encourage the user to reach out via the contact form.`;

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (request.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
        }

        const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
        const model = env.CHATBOT_MODEL ?? DEFAULT_MODEL;
        const systemPrompt = env.CHATBOT_SYSTEM_PROMPT ?? DEFAULT_SYSTEM_PROMPT;

        try {
            type ChatbotRequest = {
                messages: { role: "user" | "assistant"; content: string }[];
                context?: { id: string; slug: string; title: string; content: string }[];
            };

            const { messages, context } = (await request.json()) as ChatbotRequest;

            if (!Array.isArray(messages) || messages.length === 0) {
                return Response.json({ error: "Missing messages array" }, { status: 400 });
            }

            const contextText = Array.isArray(context)
                ? context
                    .map((entry, index) => `Source ${index + 1}: ${entry.title} (${entry.slug})\n${entry.content}`)
                    .join("\n\n")
                : "No additional context provided.";

            const system = `${systemPrompt}\n\nContext:\n${contextText}`;

            const completion = await openai.responses.create({
                model,
                input: [
                    {
                        role: "system",
                        content: system,
                    },
                    ...messages,
                ],
                temperature: 0.2,
            });

            const output = completion.output?.[0];
            const reply = output && "content" in output ? output.content.find((segment) => segment.type === "output_text") : null;
            const replyText = reply && reply.type === "output_text" ? reply.text : "I could not generate a response.";

            return Response.json({
                reply: replyText,
                sources: Array.isArray(context) ? context.map((entry) => entry.slug) : [],
                model,
            });
        } catch (error) {
            console.error("Chatbot error", error);
            return Response.json({
                error: error instanceof Error ? error.message : "Unknown error",
            }, { status: 500 });
        }
    },
};
