import { Octokit } from "octokit";
import { generateMetadata as generateMetadataUtil } from '@/lib/generate-metadata';
import { Metadata } from "next";
import { GitHubClient } from "./GitHubClient";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataUtil({ metaDataFile: 'metadata' });
}

async function getGitHubProjects() {
  // Note to user: It's highly recommended to create a personal access token (PAT)
  // on GitHub and set it as an environment variable GITHUB_TOKEN to avoid rate limits.
  const octokit = new Octokit({
    auth: process.env.GITHUBTOKEN,
  });

  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username: "edwardwhiteheaddev",
      sort: "updated",
      direction: "desc",
      per_page: 12, // Limiting to a reasonable number for the page
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    return []; // Return an empty array on error
  }
}

async function GitHubPage() {
  const projects = await getGitHubProjects();

  return <GitHubClient projects={projects} />;
}

export default GitHubPage;
