import { getMarkdownData } from "@/lib/markdown";
import {
  Title,
  Container,
  Paper,
  Timeline,
  TimelineItem,
  Text,
  Badge,
  Group,
} from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";

export const metadata = {
  title: "Professional Experience | Edward Whitehead",
  description: "A detailed history of Edward Whitehead's professional roles and accomplishments.",
};

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

async function ExperiencePage() {
  const { title, jobs } = await getMarkdownData<ExperienceData>("experience");

  return (
    <Container>
      <Paper p="xl" shadow="sm" withBorder>
        <Title order={1} mb="xl">
          {title}
        </Title>
        <Timeline active={jobs.length} bulletSize={24} lineWidth={2}>
          {jobs.map((job, index) => (
            <TimelineItem key={index} bullet={<IconBriefcase size={14} />} title={job.role}>
              <Text c="dimmed" size="sm">
                {job.company} ({job.dates})
              </Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: job.description.replace(/\n/g, '<br />'),
                }}
                style={{ marginTop: '10px', marginBottom: '10px' }}
              />
              <Group gap="xs" mt="sm">
                {job.skills && job.skills.split('·').map((skill) => (
                  <Badge key={skill.trim()} variant="light">
                    {skill.trim()}
                  </Badge>
                ))}
              </Group>
            </TimelineItem>
          ))}
        </Timeline>
      </Paper>
    </Container>
  );
}

export default ExperiencePage;
