'use client';

import { Container, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import classes from './Footer.module.css';
import ScrollToTop from './ScrollToTop';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <span className={classes.logo}>Edward Whitehead</span>
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component="a"
            href="https://www.linkedin.com/in/edward-whitehead-a16b544/"
            target="_blank"
          >
            <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component="a"
            href="https://github.com/edward-whitehead"
            target="_blank"
          >
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
      <ScrollToTop />
    </div>
  );
}
