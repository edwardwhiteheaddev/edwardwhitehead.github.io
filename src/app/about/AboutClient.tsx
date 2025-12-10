'use client';

import { FadeIn } from '@/components/FadeIn';
import {
  Card,
  Container,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';

interface AboutData {
  title: string;
  contentHtml: string;
  skillProgress?: { label: string; value: number }[];
}

export function AboutClient({ data }: { data: AboutData }) {
  const { title, contentHtml, skillProgress = [] } = data;

  return (
    <FadeIn>
      <div className="about-hero">
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <Title order={1} size="h1" c="white" mb="sm">
            {title}
          </Title>
          <Text c="gray.2" size="lg" maw={720} ta="center">
            A candid, AI-shaped snapshot of who I am right now.
          </Text>
        </div>
      </div>

      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Card
            shadow="md"
            padding="xl"
            radius="lg"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <TypographyStylesProvider className="about-richtext">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </TypographyStylesProvider>
          </Card>

          {skillProgress.length > 0 && (
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <Title order={3} size="h3" c="white">
                  Skill Snapshot
                </Title>
                <Text size="sm" c="dimmed">
                  Self-assessed focus areas
                </Text>
              </Group>

              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                {skillProgress.map((item) => (
                  <Card
                    key={item.label}
                    padding="lg"
                    radius="md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <Stack gap="xs">
                      <Group justify="space-between" align="center">
                        <Text fw={600} c="white">
                          {item.label}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {item.value}%
                        </Text>
                      </Group>
                      <Progress value={item.value} color="red" radius="xl" />
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          )}
        </Stack>
      </Container>
    </FadeIn>
  );
}
