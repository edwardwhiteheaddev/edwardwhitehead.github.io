'use client';

import {
  Title,
  Text,
  Container,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import classes from "./Home.module.css";

interface HomeData {
  introSnippet: string;
}

export function HomeClient({ data }: { data: HomeData }) {
  const { introSnippet } = data;
  return (
    <Container className={classes.wrapper}>
      <FadeIn>
        <Stack className={classes.hero}>
            <Title className={classes.title}>
            A <span className={classes.highlight}>seasoned developer</span> building modern,
            AI-powered web and mobile experiences.
            </Title>

            <Text c="dimmed" mt="md" size="xl">
            I help businesses and entrepreneurs bring their visions to life, from
            concept to full-scale deployment.
            </Text>

            <Group mt="xl">
            <Button component={Link} href="/projects" size="lg" radius="xl">
                View My Work
            </Button>
            <Button component={Link} href="/contact" size="lg" radius="xl" variant="outline">
                Get In Touch
            </Button>
            </Group>
        </Stack>
      </FadeIn>

      <FadeIn>
        <Stack className={classes.aboutSection}>
            <Title order={2} ta="center">A Little About Me</Title>
            <Text
            c="dimmed"
            dangerouslySetInnerHTML={{ __html: introSnippet }}
            ta="center"
            maw={600}
            mx="auto"
            className={classes.aboutText}
            />
            <Group justify="center" mt="md">
            <Button component={Link} href="/about" variant="subtle">
                Read More...
            </Button>
            </Group>
        </Stack>
      </FadeIn>
    </Container>
  );
}
