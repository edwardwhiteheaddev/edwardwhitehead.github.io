# How to Deploy and Manage Your Résumé Website

Congratulations on your new personal website! This guide will walk you through the final steps to get it live and how to manage it moving forward.

## 1. Environment Variables

Your website needs a few secret keys (environment variables) to work correctly. These are for fetching your GitHub projects and for sending emails from your contact form.

### What You Need

*   `GITHUB_TOKEN`: A personal access token for the GitHub API. This allows the site to fetch your repositories without getting rate-limited.
*   `SMTP_HOST`: The server address of your email provider (e.g., `smtp.gmail.com` or a custom provider like SendGrid).
*   `SMTP_PORT`: The port for the SMTP server (e.g., 587 or 465).
*   `SMTP_USER`: Your username for the email account you're sending from.
*   `SMTP_PASS`: The password for your email account (or an "App Password" if you're using Gmail/Google Workspace).
*   `SMTP_SECURE`: Set to `true` if your provider uses SSL (like on port 465), otherwise it can be omitted or `false`.

### How to Set Them Up

You need to set these variables in your GitHub repository so the deployment workflow (GitHub Actions) can use them.

1.  Go to your GitHub repository.
2.  Click on **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret** for each of the variables listed above.
4.  Create a secret for `GITHUB_TOKEN`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS`.

To get a `GITHUB_TOKEN`, go to your GitHub **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)** and generate a new token with the `public_repo` scope.

## 2. Deployment

This project is configured for **automatic deployment** to GitHub Pages.

*   **How it works:** Whenever you push a change to the `main` branch of your repository, a GitHub Action will automatically start.
*   **What it does:** It builds your Next.js application into static files, and then pushes those files to the `gh-pages` branch, which is what GitHub Pages serves.
*   **Your site URL:** Your website will be live at `https://<your-github-username>.github.io`.

You will need to make sure your repository is named `<your-github-username>.github.io` for the URL to work correctly without extra configuration. You also need to enable GitHub Pages in your repository settings and set the source to the `gh-pages` branch.

## 3. Managing Your Content

You can easily update almost all the content on your website by editing the markdown files in the `content/` directory.

*   **To change your bio:** Edit `content/about.md`.
*   **To update your skills:** Edit `content/skills.md`.
*   **To add or change a job:** Edit the list in `content/experience.md`.
*   **To add or change a project:** Edit the list in `content/projects.md`.

After you edit these files and push the changes to the `main` branch, your site will automatically rebuild and deploy with the new information.

## 4. Social Media & Sharing Image (Open Graph)

To make sure your website looks great when shared on social media like LinkedIn or Twitter, you need to add a banner image.

1.  Find the banner image you want to use (the recommended size is 1200x630 pixels).
2.  Rename the image file to `og-banner.png`.
3.  Place this file inside the `public/` directory in your project.

Once you push this change, it will be used as the preview image for your site. The placeholder URL in the metadata should also be updated to your live site URL.

That's it! Your website is now fully in your control.
