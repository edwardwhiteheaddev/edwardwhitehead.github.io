'use client';

import logo from '@/assets/logo.png';
import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
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
      header={{ height: '120px' }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: true }
      }}
      styles={{ main: { backgroundColor: 'var(--mantine-color-dark-7)' } }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" hiddenFrom="sm">
          {/* Mobile layout - centered logo with burger */}
          <div style={{ width: '40px' }}></div> {/* Spacer for symmetry */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            <Image
              src={logo.src}
              alt="Logo"
              width={318.94}
              height={40}
              style={{ height: "auto" }}
            />
          </Link>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
          />
        </Group>

        <Group h="100%" px="md" justify="space-between" visibleFrom="sm">
          {/* Desktop layout - left-aligned logo with nav */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            <Image
              src={logo.src}
              alt="Logo"
              width={318.94}
              height={40}
              style={{ height: "auto" }}
            />
          </Link>
          <Group gap={5}>
            {links.map((link) => (
              <Link key={link.label} href={link.link} style={{ padding: '8px 12px', textDecoration: 'none', color: 'inherit', fontSize: '14px' }}>
                {link.label}
              </Link>
            ))}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">{navLinks}</AppShell.Navbar>

      <AppShell.Main style={{ width: '100%' }}>{children}</AppShell.Main>
    </AppShell>
  );
}
