import { getAllBlogPosts } from "@/lib/markdown";
import { BlogListingClient } from "./BlogListingClient";

export const metadata = {
  title: "Blog | Edward Whitehead",
  description: "Insights and thoughts on web development, technology, and software engineering.",
};

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts();

  return <BlogListingClient posts={allPosts} />;
}
