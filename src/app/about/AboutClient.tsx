'use client';

import { Title, Container, Paper, TypographyStylesProvider } from "@mantine/core";
import { FadeIn } from "@/components/FadeIn";

interface AboutData {
  title: string;
  contentHtml: string;
}

export function AboutClient({ data }: { data: AboutData }) {
  const { title, contentHtml } = data;
  return (
    <FadeIn>
      <Container>
        <Paper p="xl" shadow="sm" withBorder>
          <Title order={1} mb="lg">{title}</Title>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </TypographyStylesProvider>
        </Paper>
      </Container>
    </FadeIn>
  );
}
