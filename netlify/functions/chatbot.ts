import { Handler, HandlerResponse } from '@netlify/functions';
import OpenAI from 'openai';

type ChatMessage = { role: "user" | "assistant"; content: string };
type ContextEntry = { id: string; slug: string; title: string; content: string };
type ChatbotRequestBody = {
    messages: ChatMessage[];
    context?: ContextEntry[];
};

const DEFAULT_MODEL = "gpt-5-nano-2025-08-07";
const DEFAULT_SYSTEM_PROMPT = `You are UNIVRS’s AI assistant, representing Edward Whitehead and UNIVRS Consulting.

Your role is to provide clear, calm, and trustworthy answers about:
- UNIVRS Consulting
- Edward Whitehead’s experience and philosophy
- Services, engagement models, and who UNIVRS is for
- How UNIVRS approaches AI, systems, and delivery
- How to start a conversation or engagement

You must base your answers strictly on the provided context and knowledge files. These documents represent the source of truth.

Core Behaviour Rules:

1. Accuracy First
- Only answer using information explicitly present or strongly implied in the provided context.
- Never invent credentials, clients, pricing, timelines, or guarantees.
- If something is unknown or not covered, say so honestly.

2. Tone & Personality
- Calm, friendly, professional, and human.
- Senior and confident, never salesy or hype-driven.
- Helpful and reassuring, especially for non-technical users.

3. Clarity Over Complexity
- Explain concepts in plain language.
- Avoid unnecessary jargon.
- When technical terms are used, explain them briefly.

4. UNIVRS Positioning
- UNIVRS is a senior-led consulting practice, not an agency.
- Emphasise clarity, trust, long-term thinking, and responsible AI use.
- Avoid positioning UNIVRS as a tool vendor or outsourcing shop.

5. Engagement Guidance
- When users ask how to work with UNIVRS or what’s next, explain that engagements typically start with a conversation.
- Reinforce that there is no pressure or obligation.
- Gently encourage reaching out directly at hello@edwardwhitehead.dev if appropriate.

6. Handling Missing Information
- If the context does not contain the answer, say clearly that you do not have that information.
- Invite the user to reach out directly at hello@edwardwhitehead.dev for a direct response.
- Do not guess or speculate.

Primary Objective:
Help users understand what UNIVRS is, how it thinks, and whether it is a good fit. Trust and clarity matter more than conversion.`;


const createResponse = (
    statusCode: number,
    body: string,
    contentType: string = 'application/json'
): HandlerResponse => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': contentType,
    },
    body,
});

const createCorsResponse = (): HandlerResponse => ({
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'text/plain',
    },
    body: '',
});

export const handler: Handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return createCorsResponse();
    }

    if (event.httpMethod !== 'POST') {
        return createResponse(405, JSON.stringify({ error: 'Method not allowed' }));
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return createResponse(500, JSON.stringify({ error: 'Missing OpenAI API key' }));
    }

    const model = process.env.CHATBOT_MODEL ?? DEFAULT_MODEL;
    const systemPrompt = process.env.CHATBOT_SYSTEM_PROMPT ?? DEFAULT_SYSTEM_PROMPT;
    const openai = new OpenAI({ apiKey });

    try {
        if (!event.body) {
            return createResponse(400, JSON.stringify({ error: 'Missing request body' }));
        }

        const body = JSON.parse(event.body) as ChatbotRequestBody;
        const { messages, context } = body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return createResponse(400, JSON.stringify({ error: 'Missing messages array' }));
        }

        const contextText = Array.isArray(context)
            ? context
                .map((entry, index) => `Source ${index + 1}: ${entry.title} (${entry.slug})\n${entry.content}`)
                .join("\n\n")
            : "No additional context provided.";

        const system = `${systemPrompt}\n\nContext:\n${contextText}`;


        const createCompletion = async () => {
            return openai.chat.completions.create({
                model,
                messages: [
                    {
                        role: "system",
                        content: system,
                    },
                    ...messages,
                ]
            });
        };

        let completion;
        try {
            completion = await createCompletion();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            if (message.includes("400 Unsupported value: 'temperature'")) {
                console.warn("[Chatbot] Model rejected temperature; retrying without it", { model });
                completion = await createCompletion();
            } else {
                throw error;
            }
        }

        const replyText = completion.choices[0]?.message?.content ?? "I could not generate a response.";

        return createResponse(200, JSON.stringify({
            reply: replyText,
            sources: Array.isArray(context) ? context.map((entry) => entry.slug) : [],
            model,
        }));
    } catch (error) {
        console.error("Chatbot API error", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return createResponse(500, JSON.stringify({ error: message }));
    }
};
