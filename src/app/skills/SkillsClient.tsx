'use client';

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
import { FadeIn } from "@/components/FadeIn";

interface SkillCategory {
  category: string;
  list: string;
}

interface SkillsData {
  title: string;
  skills: SkillCategory[];
  contentHtml: string;
}

export function SkillsClient({ data }: { data: SkillsData }) {
  const { title, skills, contentHtml } = data;

  return (
    <FadeIn>
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
    </FadeIn>
  );
}
