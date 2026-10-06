'use client';

import {
  Title,
  Container, Stack, Card
} from "@mantine/core";
import { FadeIn } from "@/components/FadeIn";
import { ExperienceMarkdownData } from "@/schemas";
import React from "react";

function renderDescription(description: string) {
  if (!description || description.trim().length === 0) {
    return null;
  }

  const lines = description
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const bulletLines = lines.filter((line) => line.startsWith('-'));

  if (bulletLines.length === 0) {
    return <p className="text-muted">{description}</p>;
  }

  return (
    <ul className="text-muted">
      {bulletLines.map((line) => (
        <li key={line}>{line.replace(/^[-•]\s*/, '')}</li>
      ))}
    </ul>
  );
}

export function ExperienceClient({ title, experience }: Readonly<{ title: string, experience: ExperienceMarkdownData }>) {

  return (
    <FadeIn>
      <div className="experience-hero">
        <div className="experience-hero__overlay" />
        <div className="experience-hero__content">
          <Title order={1} size="h1" c="white" mb="sm">
            {title}
          </Title>
        </div>
      </div>

      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Card
            shadow="md"
            padding="xl"
            radius="lg"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="container">
              <div className="kyros-resume">
                {experience.jobs.map((item, index) => (
                  <div
                    key={`${item.role}-${item.company}-${index}`}
                    className="kyros-resume__item"
                    data-aos="fade-up"
                    data-aos-delay={index * 120}
                  >
                    <h3 className="kyros-resume__title">{item.role}</h3>
                    <div className="kyros-resume__meta">
                      <span>{item.company}</span>
                      <span>•</span>
                      <span>{item.dates}</span>
                    </div>
                    <div className="kyros-resume__description">
                      {item.overview && item.overview.trim().length > 0 && (
                        <p className="text-muted" style={{ marginTop: '0.75rem' }}>
                          <strong>Overview:</strong> {item.overview}
                        </p>
                      )}
                      {renderDescription(item.description)}
                      {item.skills && item.skills.trim().length > 0 && (
                        <p className="text-muted" style={{ marginTop: '0.75rem' }}>
                          <strong>Skills:</strong> {item.skills}
                        </p>
                      )}
                      {item.notableAchievements && item.notableAchievements.trim().length > 0 && (
                        <div className="text-muted" style={{ marginTop: '0.75rem' }}>
                          <strong>Notable Achievements:</strong>
                          <ul>
                            {item.notableAchievements
                              .split('\n')
                              .map((achievement) => achievement.trim())
                              .filter((achievement) => achievement.length > 0)
                              .map((achievement, index) => (
                                <li key={`${achievement}-${index}`}>{achievement}</li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Stack>
      </Container>
    </FadeIn>
  );
}
