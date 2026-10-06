'use client';

import {
  Title,
  Container,
  Card,
  Text,
  SimpleGrid,
  Badge,
  Image,
  Group,
  Button,
} from "@mantine/core";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { IconCalendar } from "@tabler/icons-react";
import Link from "next/link";
import { ProjectsMarkdownData } from '@/schemas';

export function ProjectsClient({ projects }: Readonly<{ projects: ProjectsMarkdownData[] }>) {

  return (
    <FadeIn>
      {/* Page Header */}
        <div className="projects-hero">
          <div className="projects-hero__overlay" />
          <div className="projects-hero__content">
            <Title order={1} size="h1" c="white" mb="sm">
              Projects
            </Title>
          </div>
        </div>

      <Container py="xl">
        {/* Featured Projects */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="xl" mb="xl">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                shadow="md"
                padding="lg"
                component={Link}
                href={`/projects/${project.slug}`}
                style={{
                  textDecoration: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {project.image && (
                  <Card.Section>
                    <Image
                      src={project.image}
                      height={200}
                      alt={project.title}
                      style={{ objectFit: 'cover' }}
                    />
                  </Card.Section>
                )}

                <Group justify="space-between" mt="md" mb="xs">
                  <Badge variant="light" color="blue">
                    {project.category}
                  </Badge>
                  <Text size="sm" c="dimmed">
                    <IconCalendar size={14} style={{ marginRight: 4 }} />
                    {project.date}
                  </Text>
                </Group>

                <Title order={3} c="white" mb="sm">
                  {project.title}
                </Title>

                <Text c="dimmed" mb="md" style={{ flex: 1 }}>
                  {project.overview}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                >
                  View Project
                </Button>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>

      </Container>
    </FadeIn>
  );
}
