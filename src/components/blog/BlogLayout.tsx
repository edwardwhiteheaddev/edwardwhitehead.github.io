import { Container, Stack } from '@mantine/core';
import { ReactNode } from 'react';

interface BlogLayoutProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  py?: string;
}

export function BlogLayout({
  children,
  size = 'md',
  py = 'xl'
}: BlogLayoutProps) {
  return (
    <Container size={size} py={py}>
      <Stack gap="xl">
        {children}
      </Stack>
    </Container>
  );
}
