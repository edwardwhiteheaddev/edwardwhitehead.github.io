'use client';

import { useState } from 'react';
import {
  Title,
  Container,
  Paper,
  TextInput,
  Textarea,
  Button,
  Group,
  Notification,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      message: (value) => (value.trim().length > 0 ? null : 'Message is required'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSubmitting(true);
    setNotification(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again later.');
      }

      setNotification({ type: 'success', message: 'Your message has been sent successfully!' });
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setNotification({ type: 'error', message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Paper p="xl" shadow="sm" withBorder>
        <Title order={1} mb="xl">
          Get In Touch
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Your Name"
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
          />
          <Textarea
            mt="md"
            label="Message"
            placeholder="Your message"
            required
            minRows={4}
            {...form.getInputProps('message')}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={submitting}>
              Send Message
            </Button>
          </Group>
        </form>

        {notification && (
          <Notification
            icon={notification.type === 'success' ? <IconCheck size={18} /> : <IconX size={18} />}
            color={notification.type === 'success' ? 'green' : 'red'}
            title={notification.type === 'success' ? 'Success' : 'Error'}
            mt="md"
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Notification>
        )}
      </Paper>
    </Container>
  );
}
