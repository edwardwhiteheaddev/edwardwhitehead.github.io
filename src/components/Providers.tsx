"use client";

import { MantineProvider } from "@mantine/core";
import dynamic from "next/dynamic";
import { theme } from "@/theme";
import { ChatbotProvider } from "@/components/chatbot/ChatbotProvider";

const ChatbotPanel = dynamic(() => import("@/components/chatbot/ChatbotPanel"), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <ChatbotProvider>
        {children}
        <ChatbotPanel />
      </ChatbotProvider>
    </MantineProvider>
  );
}
