import { getMarkdownData } from "@/lib/markdown";
import {
  Title,
  Container,
  Paper,
  Card,
  Text,
  SimpleGrid,
} from "@mantine/core";

export const metadata = {
  title: "Projects | Edward Whitehead",
  description: "A selection of projects by Edward Whitehead.",
};

interface Project {
  name: string;
  description: string;
}

interface ProjectsData {
  title: string;
  projects: Project[];
}

async function ProjectsPage() {
  const { title, projects } = await getMarkdownData<ProjectsData>("projects");

  return (
    <Container>
      <Paper p="xl" shadow="sm" withBorder>
        <Title order={1} mb="xl">
          {title}
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {projects.map((project, index) => (
            <Card shadow="sm" padding="lg" radius="md" withBorder key={index}>
              <Title order={3}>{project.name}</Title>
              <Text mt="sm">{project.description}</Text>
            </Card>
          ))}
        </SimpleGrid>
      </Paper>
    </Container>
  );
}

export default ProjectsPage;
