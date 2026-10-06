import { getAllBlogPosts, getMarkdownData } from "@/lib/markdown";
import { BlogListingClient } from "./BlogListingClient";
import { ContactMarkdownData } from "@/schemas";
import { ScrollToTop } from "@/components/kyros/ScrollToTop";
import { ContactSection } from "@/components/kyros/Contact";

export const metadata = {
  title: "Blog | Edward Whitehead",
  description: "Insights and thoughts on web development, technology, and software engineering.",
};

export default async function BlogPage() {
  const [allPosts, contactData] = await Promise.all([getAllBlogPosts(), getMarkdownData<ContactMarkdownData>('contact')]);

  return (
    <>
      <BlogListingClient posts={allPosts}/>
      <ContactSection
        title={contactData.title}
        subtitle={contactData.subtitle}
        email={contactData.email}
        phone={contactData.phone}
        location={contactData.location}
        socials={contactData.socials ?? []}
        bodyHtml={contactData.contentHtml}
      />
      <ScrollToTop />
    </>
  );
}
