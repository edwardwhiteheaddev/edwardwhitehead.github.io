'use client';

import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

const links = [
  { link: '/', label: 'Home' },
  { link: '/about', label: 'About' },
  { link: '/experience', label: 'Experience' },
  { link: '/projects', 'label': 'Projects' },
  { link: '/github', label: 'GitHub' },
  { link: '/contact', label: 'Contact' },
];

export function AppShellWrapper({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  const navLinks = links.map((item) => (
    <NavLink
      key={item.label}
      component={Link}
      href={item.link}
      label={item.label}
      onClick={toggle}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            Edward Whitehead
          </Link>
          <Group gap={5} visibleFrom="sm">
            {links.map((link) => (
              <Link key={link.label} href={link.link} style={{ padding: '8px 12px', textDecoration: 'none', color: 'inherit', fontSize: '14px' }}>
                {link.label}
              </Link>
            ))}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">{navLinks}</AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
