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

export function ProjectsClient({ projects }: { projects: ProjectsMarkdownData[] }) {

  return (
    <FadeIn>
      <Container py="xl">
        {/* Page Header */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '300px',
            backgroundImage: 'url(https://images.unsplash.com/photo-1506794778225-cbf6c8df4c5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170)',
            backgroundColor: '#1a1b1e',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '3rem',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Dark overlay for text readability */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
              zIndex: 1,
            }}
          />
          <div style={{ textAlign: 'center', padding: '2rem', position: 'relative', zIndex: 2 }}>
            <Title order={1} size="h1" c="white" mb="md" style={{ fontSize: '2.5rem' }}>
              Projects
            </Title>
            <Text c="gray.2" size="xl" maw={800} mx="auto">
              A showcase of my featured projects and technical work
            </Text>
          </div>
        </div>

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
