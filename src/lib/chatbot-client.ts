// Client-side chatbot using OpenAI API directly
// Note: This exposes your API key to the client - use with caution
// Consider using a proxy service or rate limiting

import OpenAI from "openai";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ContextEntry = { id: string; slug: string; title: string; content: string };

export class ClientChatbot {
  private openai: OpenAI;
  private model: string;
  private systemPrompt: string;

  constructor(apiKey: string, model = "gpt-4o-mini") {
    this.openai = new OpenAI({ 
      apiKey,
      dangerouslyAllowBrowser: true // Required for client-side usage
    });
    this.model = model;
    this.systemPrompt = `You are Edward Whitehead's friendly AI assistant. Use the provided context to answer questions about his experience, projects, skills, and contact information. If the context does not contain an answer, respond honestly that you do not have that information and encourage the user to reach out via the contact form.`;
  }

  async chat(messages: ChatMessage[], context?: ContextEntry[]) {
    try {
      const contextText = Array.isArray(context)
        ? context
            .map((entry, index) => `Source ${index + 1}: ${entry.title} (${entry.slug})\n${entry.content}`)
            .join("\n\n")
        : "No additional context provided.";

      const system = `${this.systemPrompt}\n\nContext:\n${contextText}`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
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

      return {
        reply: replyText,
        sources: Array.isArray(context) ? context.map((entry) => entry.slug) : [],
        model: this.model,
      };
    } catch (error) {
      console.error("Chatbot error:", error);
      throw error;
    }
  }
}
