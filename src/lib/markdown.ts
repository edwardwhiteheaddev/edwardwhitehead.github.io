import { BlogPostMarkdownData, ProjectsMarkdownData } from "@/schemas";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");
const projectsDirectory = path.join(process.cwd(), "content", "projects");
const blogDirectory = path.join(process.cwd(), "content", "blog");

export async function getMarkdownData<T>(fileName: string): Promise<{ contentHtml: string } & T> {
  const fullPath = path.join(contentDirectory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...matterResult.data as T,
  };
}

export async function getProjectData<T>(projectId: string): Promise<{ contentHtml: string } & T> {
  const fullPath = path.join(projectsDirectory, `${projectId}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...matterResult.data as T,
  };
}

export function getAllProjectIds(): string[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getAllProjects(): Promise<ProjectsMarkdownData[]> {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData: ProjectsMarkdownData[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;

    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug (filename takes precedence for routing)
    allProjectsData.push({
      contentHtml: '', // We don't need the full HTML for the listing
      ...matterResult.data as Omit<ProjectsMarkdownData, 'contentHtml'>,
      slug: id, // Override any slug from front matter with filename
    });
  }

  // Sort projects by id
  return allProjectsData.sort((a, b) => a.id - b.id);
}

export async function getFeaturedProjects(): Promise<ProjectsMarkdownData[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => project.featured === true);
}

export function getAllProjectSlugs(): string[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getBlogPostBySlug<T>(slug: string): Promise<{ contentHtml: string } & T> {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    contentHtml,
    slug,
    ...matterResult.data as T,
  };
}

export async function getAllBlogPosts(): Promise<BlogPostMarkdownData[]> {
  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData: BlogPostMarkdownData[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;

    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug
    allPostsData.push({
      slug,
      contentHtml: '', // We don't need the full HTML for the listing
      ...matterResult.data as Omit<BlogPostMarkdownData, 'slug' | 'contentHtml'>,
    });
  }

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getFeaturedBlogs(): Promise<BlogPostMarkdownData[]> {
  const allBlogs = await getAllBlogPosts();
  return allBlogs.filter(blog => blog.featured === true);
}

export function getAllBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}
