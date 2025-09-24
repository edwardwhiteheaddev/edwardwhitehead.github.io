'use client';

import {
  Title,
  Container,
  Text,
  Badge,
  Group,
  Grid,
  Stack,
  Divider,
} from "@mantine/core";
import { FadeIn } from "@/components/FadeIn";

interface Job {
  role: string;
  company: string;
  dates: string;
  description: string;
  skills: string;
}

interface ExperienceData {
  title: string;
  jobs: Job[];
}

export function ExperienceClient({ data }: { data: ExperienceData }) {
  const { title, jobs } = data;

  return (
    <FadeIn>
      <Container size="md">
        <Title order={1} ta="center" mb="xl">
          {title}
        </Title>
        <Stack gap="xl">
          {jobs.map((job, index) => (
            <div key={index}>
              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Stack gap={0}>
                    <Title order={4}>{job.company || 'Career Development'}</Title>
                    <Text c="dimmed" size="sm">{job.dates}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8 }}>
                  <Stack gap="sm">
                    <Title order={3}>{job.role}</Title>
                    <Text
                        dangerouslySetInnerHTML={{
                        __html: job.description.replace(/- /g, '• '),
                        }}
                        lh={1.7}
                    />
                    {job.skills && (
                        <Group gap="xs" mt="sm">
                            {job.skills.split('·').map((skill) => (
                            <Badge key={skill.trim()} variant="light" radius="sm">
                                {skill.trim()}
                            </Badge>
                            ))}
                        </Group>
                    )}
                  </Stack>
                </Grid.Col>
              </Grid>
              {index < jobs.length - 1 && <Divider my="xl" />}
            </div>
          ))}
        </Stack>
      </Container>
    </FadeIn>
  );
}
