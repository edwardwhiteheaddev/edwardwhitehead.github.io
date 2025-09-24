import { getMarkdownData } from "@/lib/markdown";
import { Title, Container, Paper, TypographyStylesProvider } from "@mantine/core";

export const metadata = {
  title: "About Me | Edward Whitehead",
  description: "A summary of Edward Whitehead's professional experience and skills.",
};

interface AboutData {
  title: string;
  contentHtml: string;
}

async function AboutPage() {
  const { title, contentHtml } = await getMarkdownData<AboutData>("about");
  return (
    <Container>
      <Paper p="xl" shadow="sm" withBorder>
        <Title order={1} mb="lg">{title}</Title>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </TypographyStylesProvider>
      </Paper>
    </Container>
  );
}

export default AboutPage;
