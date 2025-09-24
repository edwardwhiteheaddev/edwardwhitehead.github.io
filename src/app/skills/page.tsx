import { getMarkdownData } from "@/lib/markdown";
import {
  Title,
  Container,
  Paper,
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";

export const metadata = {
  title: "Skills & Highlights | Edward Whitehead",
  description: "An overview of Edward Whitehead's core technical skills and career highlights.",
};

interface SkillCategory {
  category: string;
  list: string;
}

interface SkillsData {
  title: string;
  skills: SkillCategory[];
}

async function SkillsPage() {
  const { title, skills, contentHtml } = await getMarkdownData<SkillsData & { contentHtml: string }>("skills");

  return (
    <Container>
      <Paper p="xl" shadow="sm" withBorder>
        <Title order={1} mb="xl">
          {title}
        </Title>

        <Title order={2} mb="md" size="h3">Core Skills</Title>
        <Accordion variant="separated" mb="xl">
          {skills.map((skill, index) => (
            <AccordionItem key={index} value={skill.category}>
              <AccordionControl>{skill.category}</AccordionControl>
              <AccordionPanel>
                <Text>{skill.list}</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Title order={2} mb="md" size="h3">Key Highlights</Title>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </TypographyStylesProvider>
      </Paper>
    </Container>
  );
}

export default SkillsPage;
