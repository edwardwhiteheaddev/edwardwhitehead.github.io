import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import OpenAI from 'openai';

const root = process.cwd();
const contentDir = path.join(root, 'content');
const outputPath = path.join(root, 'public', 'chatbot-knowledge.json');
const openaiKey = process.env.OPENAI_API_KEY;
const embeddingModel = process.env.CHATBOT_EMBEDDING_MODEL ?? 'text-embedding-3-large';
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

async function collectDocuments() {
  const entries = [];
  async function walk(dir, segments = []) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const nextPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        await walk(nextPath, [...segments, item.name]);
      } else if (item.name.endsWith('.md')) {
        const slug = [...segments, item.name.replace(/\.md$/i, '')];
        const raw = await fs.readFile(nextPath, 'utf8');
        const parsed = matter(raw);
        const content = parsed.content.replace(/\r\n/g, '\n').trim();
        if (!content) continue;
        const chunks = chunkContent(content);
        for (let index = 0; index < chunks.length; index += 1) {
          const fragment = chunks[index];
          const embedding = await embedFragment(fragment);
          entries.push({
            id: `${slug.join('/')}-${index + 1}`,
            slug: slug.join('/'),
            title: parsed.data?.title ?? slug[slug.length - 1],
            excerpt: fragment.slice(0, 160),
            content: fragment,
            embedding,
            metadata: parsed.data ?? {},
          });
        }
      }
    }
  }
  await walk(contentDir);
  return entries;
}

async function embedFragment(text) {
  if (!openai) return null;
  const response = await openai.embeddings.create({ model: embeddingModel, input: text });
  return response.data[0]?.embedding ?? null;
}

function chunkContent(text, size = 900) {
  const paragraphs = text.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const chunks = [];
  let current = '';
  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length <= size) {
      current = candidate;
    } else {
      if (current) chunks.push(current);
      if (paragraph.length > size) {
        const parts = splitLongParagraph(paragraph, size);
        parts.slice(0, -1).forEach((part) => chunks.push(part));
        current = parts.at(-1) ?? '';
      } else {
        current = paragraph;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function splitLongParagraph(paragraph, size) {
  const words = paragraph.split(/\s+/);
  const segments = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= size) {
      current = candidate;
    } else {
      if (current) segments.push(current);
      current = word;
    }
  }
  if (current) segments.push(current);
  return segments;
}

async function main() {
  const documents = await collectDocuments();
  const payload = {
    generatedAt: new Date().toISOString(),
    documentCount: documents.length,
    source: 'content',
    embeddingModel: openai ? embeddingModel : null,
    documents,
  };
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Knowledge base saved to ${path.relative(root, outputPath)} with ${documents.length} segments.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
