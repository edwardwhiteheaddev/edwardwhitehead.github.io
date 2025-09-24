import {
  Title,
  Container,
  Paper,
  Card,
  Text,
  SimpleGrid,
  Group,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { Octokit } from "octokit";
import { IconStar, IconGitFork, IconExternalLink } from "@tabler/icons-react";

export const metadata = {
  title: "GitHub Projects | Edward Whitehead",
  description: "A live view of Edward Whitehead's public projects on GitHub.",
};

async function getGitHubProjects() {
  // Note to user: It's highly recommended to create a personal access token (PAT)
  // on GitHub and set it as an environment variable GITHUB_TOKEN to avoid rate limits.
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username: "edward-whitehead",
      sort: "updated",
      direction: "desc",
      per_page: 12, // Limiting to a reasonable number for the page
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    return []; // Return an empty array on error
  }
}

async function GitHubPage() {
  const projects = await getGitHubProjects();

  return (
    <Container>
      <Paper p="xl" shadow="sm" withBorder>
        <Title order={1} mb="xl">
          My GitHub Projects
        </Title>
        <Text mb="lg">
          Here are some of my latest public repositories on GitHub. This list is updated automatically.
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {projects.map((project) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={project.id}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <Group justify="space-between" align="flex-start">
                  <Title order={3}>{project.name}</Title>
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
                    leftSection={<IconStar size={12} />}
                  >
                    {project.stargazers_count}
                  </Badge>
                  <Badge
                    variant="light"
                    color="gray"
                    leftSection={<IconGitFork size={12} />}
                  >
                    {project.forks_count}
                  </Badge>
                </Group>
                {project.language && <Badge color="blue">{project.language}</Badge>}
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Paper>
    </Container>
  );
}

export default GitHubPage;
