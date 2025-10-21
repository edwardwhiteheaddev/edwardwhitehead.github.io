'use client';

import {
  Title,
  Container,
  Card,
  Text,
  SimpleGrid,
  Group,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { motion } from "framer-motion";
import { IconStar, IconGitFork, IconExternalLink } from "@tabler/icons-react";

interface GitHubProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
}

interface GitHubClientProps {
  projects: GitHubProject[];
}

export function GitHubClient({ projects }: GitHubClientProps) {
  return (
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
            GitHub Projects
          </Title>
          <Text c="gray.2" size="xl" maw={800} mx="auto">
            A collection of my public repositories showcasing my coding work and contributions
          </Text>
        </div>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="xl">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              shadow="md"
              padding="lg"
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
              <div>
                <Group justify="space-between" align="flex-start">
                  <Title order={3} c="white">{project.name}</Title>
                  <ActionIcon
                    component="a"
                    href={project.html_url}
                    target="_blank"
                    variant="subtle"
                  >
                    <IconExternalLink size={18} />
                  </ActionIcon>
                </Group>
                <Text mt="sm" size="sm" c="dimmed">
                  {project.description || "No description available."}
                </Text>
              </div>
              <Group justify="space-between" mt="md">
                <Group gap="xs">
                  <Badge
                    variant="light"
                    color="blue"
                    leftSection={<IconStar size={12} />}
                  >
                    {project.stargazers_count || 0}
                  </Badge>
                  <Badge
                    variant="light"
                    color="gray"
                    leftSection={<IconGitFork size={12} />}
                  >
                    {project.forks_count || 0}
                  </Badge>
                </Group>
                {project.language && <Badge color="blue">{project.language}</Badge>}
              </Group>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>
    </Container>
  );
}
