import { Button, Group, Text } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './HeroSection.module.css';
import { HeroSectionProps } from '@/schemas/HeroSectionProps';

export function HeroSection(props: HeroSectionProps) {
    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <h1 className={classes.title}>
                    {props.title}{' '}
                    <Text component="span" variant="text" c={'yellow'} inherit>
                        {props.titleGradientText}
                    </Text>{' '}
                    {props.titleEndText}
                </h1>

                <Text className={classes.description} c="dimmed">
                    {props.contentHtml}
                </Text>

                <Group className={classes.controls}>
                    {props.btnGradientIsEnabled && (
                        <Button
                            component="a"
                            size="xl"
                            className={classes.control}
                            variant="filled"
                            bg="#ffc542"
                            c="white"
                            href={props.btnGradientHref}
                        >
                            {props.btnGradientText}
                        </Button>
                    )}

                    {props.btnDefaultIsEnabled && (
                        <Button
                            component="a"
                            href="https://github.com/mantinedev/mantine"
                            size="xl"
                            variant="default"
                            className={classes.control}
                            leftSection={<GithubIcon size={20} />}
                            target='_blank'
                        >
                            GitHub
                        </Button>
                    )}
                </Group>
            </div>
        </div>
    );
}