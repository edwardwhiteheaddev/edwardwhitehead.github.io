'use client';

import {
  Title,
  Container,
  Card,
  Text,
  SimpleGrid,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { IconCode } from "@tabler/icons-react";

interface Project {
  name: string;
  description: string;
}

interface ProjectsData {
  title: string;
  projects: Project[];
}

export function ProjectsClient({ data }: { data: ProjectsData }) {
  const { title, projects } = data;

  return (
    <FadeIn>
      <Container>
        <Title order={1} ta="center" mb="xl">
          {title}
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                shadow="md"
                padding="xl"
                radius="md"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <ThemeIcon variant="light" size={40} radius={40}>
                    <IconCode style={{ width: rem(20), height: rem(20) }} />
                </ThemeIcon>
                <Title order={3} mt="md">{project.name}</Title>
                <Text mt="sm" c="dimmed">{project.description}</Text>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </FadeIn>
  );
}
