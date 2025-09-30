import { Project } from '@/schemas/Project';
import { Button, Container, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import Link from 'next/link';
import classes from './ProjectCardsSection.module.css';

interface ProjectCardsProps {
    projects: Project[];
}

export function ProjectCardsGrid({ projects }: ProjectCardsProps) {
    const cards = projects.map((project) => (
        <Paper
            key={project.title}
            shadow="md"
            p="xl"
            radius="md"
            className={classes.card}
            style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={classes.overlay} />
            <div className={classes.content}>
                <Text className={classes.category} size="xs">
                    {project.category}
                </Text>
                <Title order={3} className={classes.title}>
                    {project.title}
                </Title>
                <Text className={classes.date}>{project.date}</Text>
            </div>
            <Button
                variant="white"
                color="dark"
                className={classes.button}
                component={Link}
                href={`/projects/${project.slug}`}
            >
                View Project
            </Button>
        </Paper>
    ));

    return (
        <div className={classes.wrapper}>
            <Title ta="center" className={classes.pageTitle} mt="sm">
                FEATURED PROJECTS
            </Title>
            <Container py="xl">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 0, sm: 'md' }}>
                    {cards}
                </SimpleGrid>
            </Container>
        </div>
    );
}