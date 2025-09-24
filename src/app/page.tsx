import { getMarkdownData } from "@/lib/markdown";
import {
  Title,
  Text,
  Container,
  Paper,
  Button,
  Group,
} from "@mantine/core";
import Link from "next/link";
import classes from "./Home.module.css";


export const metadata = {
  title: "Edward Whitehead | Seasoned Software Developer",
  description: "Welcome to the personal resume website of Edward Whitehead, a software developer specializing in AI, web, and mobile projects.",
};

interface AboutData {
  contentHtml: string;
}

async function HomePage() {
  const aboutData = await getMarkdownData<AboutData>("about");
  const introSnippet = aboutData.contentHtml.split("</p>")[0] + "</p>";

  return (
    <Container>
      <Paper p="xl" shadow="sm" withBorder className={classes.hero}>
        <Title order={1} className={classes.title}>
          Doing What I love, <span className={classes.highlight}>Remotely</span>
        </Title>
        <Text className={classes.subtitle} mt="md">
          Seasoned Software Developer | AI, Web & Mobile Projects
        </Text>
        <Group mt="xl">
          <Button component={Link} href="/projects" size="lg" variant="filled">
            View My Work
          </Button>
          <Button component={Link} href="/contact" size="lg" variant="outline">
            Get In Touch
          </Button>
        </Group>
      </Paper>

      <Paper p="xl" shadow="sm" withBorder mt="xl">
        <Title order={2} mb="md">A Little About Me</Title>
        <div dangerouslySetInnerHTML={{ __html: introSnippet }} />
        <Button component={Link} href="/about" variant="subtle" mt="md">
          Read More...
        </Button>
      </Paper>
    </Container>
  );
}

export default HomePage;
