"use client";

import { useChatbot } from "@/components/chatbot/ChatbotProvider";
import { IconLoader2, IconMessageCircle, IconRefresh, IconSend, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const KNOWLEDGE_URL = "/chatbot-knowledge.json";
const DEFAULT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? "";
const CONTEXT_COUNT = 5;

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

export type KnowledgeEntry = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  embedding: number[] | null;
  metadata: Record<string, unknown>;
};

type KnowledgePayload = {
  generatedAt: string;
  documentCount: number;
  source: string;
  embeddingModel: string | null;
  documents: KnowledgeEntry[];
};

export default function ChatbotPanel() {
  const { isOpen, close } = useChatbot();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [knowledge, setKnowledge] = useState<KnowledgeEntry[]>([]);
  const [knowledgeStatus, setKnowledgeStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [apiUrl, setApiUrl] = useState<string>(() => {
    if (DEFAULT_API_URL) return DEFAULT_API_URL;
    if (typeof window === "undefined") return "";
    const origin = window.location.origin;
    return `${origin}/api/chatbot`;
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const node = bottomRef.current;
    node?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (knowledgeStatus !== "idle") return;
    setKnowledgeStatus("loading");
    fetch(KNOWLEDGE_URL, { cache: "reload" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Failed to load knowledge (${response.status})`);
        const payload = (await response.json()) as KnowledgePayload;
        setKnowledge(payload.documents ?? []);
        setKnowledgeStatus("ready");
      })
      .catch((error) => {
        console.error(error);
        setKnowledgeStatus("error");
      });
  }, [knowledgeStatus]);

  useEffect(() => {
    if (!DEFAULT_API_URL) {
      const origin = window.location.origin;
      const stored = window.localStorage.getItem("chatbot.apiUrl")?.trim();

      console.log("[Chatbot] Checking stored URL:", { stored, origin, currentApiUrl: apiUrl });

      // Only use stored URL if it's a valid external URL
      const isValidExternal = Boolean(
        stored &&
        stored.length > 0 &&
        stored.startsWith("http") &&
        !stored.startsWith(origin)
      );

      if (isValidExternal && stored) {
        console.log("[Chatbot] Using stored external URL:", stored);
        setApiUrl(stored);
      } else if (stored && stored !== apiUrl) {
        console.log("[Chatbot] Clearing invalid stored URL:", stored);
        window.localStorage.removeItem("chatbot.apiUrl");
      }
    }
  }, [apiUrl]);

  useEffect(() => {
    if (apiUrl) {
      window.localStorage.setItem("chatbot.apiUrl", apiUrl);
    }
  }, [apiUrl]);

  const canSend = useMemo(() => Boolean(input.trim()) && !loading && !!apiUrl, [apiUrl, input, loading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setErrorMessage("");

    try {
      const context = selectContext(question, knowledge, CONTEXT_COUNT);

      // Runtime validation: ensure we're not calling the root URL
      let targetUrl = apiUrl;
      const origin = window.location.origin;
      
      console.log("[Chatbot] Debug validation:", {
        DEFAULT_API_URL,
        apiUrl,
        origin,
        "apiUrl === origin": apiUrl === origin,
        "includes /api/": apiUrl.includes("/api/")
      });
      
      const isInvalidUrl = !DEFAULT_API_URL && (
        !targetUrl ||
        targetUrl === origin ||
        targetUrl === `${origin}/` ||
        !targetUrl.includes("/api/")
      );

      console.log("[Chatbot] isInvalidUrl:", isInvalidUrl);

      if (isInvalidUrl) {
        targetUrl = `${origin}/api/chatbot`;
        console.warn("[Chatbot] Fixed invalid API URL from", apiUrl, "to", targetUrl);
        setApiUrl(targetUrl);
      }

      console.log("[Chatbot] Calling API:", targetUrl);
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          context,
        }),
      });

      console.log("[Chatbot] Response status:", response.status, response.statusText);
      console.log("[Chatbot] Response content-type:", response.headers.get("content-type"));

      if (!response.ok) {
        const text = await response.text();
        console.error("[Chatbot] Error response body:", text.slice(0, 500));
        throw new Error(`Request failed (${response.status}): ${text.slice(0, 100)}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        console.error("[Chatbot] Non-JSON response:", text.slice(0, 500));
        throw new Error(`Expected JSON but got ${contentType}. Response starts with: ${text.slice(0, 100)}`);
      }

      const data = await response.json();
      console.log("[Chatbot] Parsed response:", data);
      const reply: ChatMessage = {
        role: "assistant",
        content: typeof data.reply === "string" ? data.reply : "I encountered an unexpected response.",
        sources: Array.isArray(data.sources) ? data.sources : undefined,
      };

      setMessages((prev) => [...prev, reply]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble reaching the assistant service right now.",
        },
      ]);
      setErrorMessage(`Chatbot error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  }

  function resetConversation() {
    setMessages([]);
    setErrorMessage("");
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="chatbot-shell">
      <div ref={containerRef} className={clsx("chatbot-panel", { "chatbot-panel--has-error": errorMessage })}>
        <header className="chatbot-panel__header">
          <div className="chatbot-panel__heading">
            <IconMessageCircle size={20} />
            <span>Ask Ed’s AI</span>
          </div>
          <div className="chatbot-panel__actions">
            <button type="button" className="chatbot-panel__icon-btn" onClick={resetConversation} aria-label="Reset conversation">
              <IconRefresh size={18} />
            </button>
            <button type="button" className="chatbot-panel__icon-btn" onClick={close} aria-label="Close chatbot">
              <IconX size={18} />
            </button>
          </div>
        </header>

        {!apiUrl && (
          <div className="chatbot-panel__notice">
            <p>
              Configure <code>NEXT_PUBLIC_CHATBOT_API_URL</code> to enable the AI assistant.
            </p>
          </div>
        )}

        {knowledgeStatus === "loading" && (
          <div className="chatbot-panel__status">
            <IconLoader2 className="chatbot-panel__spinner" size={24} />
            <span>Loading knowledge base…</span>
          </div>
        )}
        {knowledgeStatus === "error" && (
          <div className="chatbot-panel__notice">
            <p>Could not load the knowledge base. Check that `npm run build:knowledge` was run.</p>
          </div>
        )}

        <div className="chatbot-panel__messages">
          {messages.length === 0 && (
            <div className="chatbot-panel__placeholder">
              <p>Ask about Edward’s experience, projects, or skills.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={clsx("chatbot-panel__message", `chatbot-panel__message--${message.role}`)}>
              <p>{message.content}</p>
              {message.sources && message.sources.length > 0 && (
                <div className="chatbot-panel__sources">
                  <span>Sources:</span>
                  <ul>
                    {message.sources.map((source) => (
                      <li key={source}>{source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="chatbot-panel__message chatbot-panel__message--assistant chatbot-panel__message--typing">
              <IconLoader2 className="chatbot-panel__spinner" size={20} />
              <span>Thinking…</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {errorMessage && (
          <div className="chatbot-panel__error">
            <p>{errorMessage}</p>
          </div>
        )}

        <form className="chatbot-panel__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="chatbot-message"
            placeholder="Ask me anything about Edward..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={!apiUrl || loading}
          />
          <button type="submit" className="chatbot-panel__send" disabled={!canSend}>
            <IconSend size={18} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function selectContext(question: string, documents: KnowledgeEntry[], limit: number) {
  if (documents.length === 0) return [];
  const scored = documents.map((document) => ({
    document,
    score: scoreMatch(question, document),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ document }) => ({
    id: document.id,
    slug: document.slug,
    title: document.title,
    content: document.content,
  }));
}

function scoreMatch(question: string, document: KnowledgeEntry) {
  if (document.embedding && document.embedding.length > 0) {
    return cosineSimilarity(document.embedding, embedQuery(question, document.embedding.length));
  }
  const normalizedQuestion = question.toLowerCase();
  const normalizedContent = document.content.toLowerCase();
  let score = 0;
  if (normalizedContent.includes(normalizedQuestion)) score += 2;
  const tokens = normalizedQuestion.split(/[\s,.;:!?]+/).filter(Boolean);
  tokens.forEach((token) => {
    if (normalizedContent.includes(token)) score += 1;
  });
  return score;
}

function cosineSimilarity(a: number[], b: number[]) {
  const minLength = Math.min(a.length, b.length);
  let dot = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  for (let index = 0; index < minLength; index += 1) {
    const valueA = a[index];
    const valueB = b[index];
    dot += valueA * valueB;
    magnitudeA += valueA * valueA;
    magnitudeB += valueB * valueB;
  }
  const denominator = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);
  return denominator === 0 ? 0 : dot / denominator;
}

function embedQuery(question: string, dimensions: number) {
  const vector = new Array(dimensions).fill(0);
  const tokens = question.toLowerCase().split(/[\s,.;:!?]+/).filter(Boolean);
  tokens.forEach((token) => {
    const hash = simpleHash(token);
    const position = hash % dimensions;
    vector[position] += 1;
  });
  return vector;
}

function simpleHash(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}
