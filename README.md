# 🚀 Edward Whitehead - Portfolio Website

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Live-brightgreen?style=for-the-badge&logo=vercel)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Sass](https://img.shields.io/badge/Sass-1.93.2-CC6699?style=for-the-badge&logo=sass)](https://sass-lang.com/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0153483e-1ae4-4b63-a6fa-b8a34317ead2/deploy-status)](https://app.netlify.com/projects/edwardwhiteheaddev/deploys)

### 🌟 A Modern, Responsive Portfolio Showcasing 20+ Years of Software Development Excellence

[🎯 Live Demo](https://edwardwhitehead.dev)

</div>

---

## 📝 About

A cutting-edge portfolio website built with **Next.js 15** and **React 19**, showcasing the professional journey of Edward Whitehead - a seasoned software developer, AI innovator, and entrepreneur with over two decades of experience in building scalable solutions across mobile, web, and cloud platforms.

### 🎯 Who Am I?

- 🏗️ **Software Architect** specializing in full-stack solutions
- 🤖 **AI Innovator** building the next generation of intelligent applications  
- 🚀 **Startup Founder** with multiple successful SaaS platforms
- 🌍 **Remote-First** developer collaborating worldwide

---

## ✨ Features

### 🎨 **Design & UX**

- 🌙 **Dark Theme** with elegant color schemes
- 📱 **Fully Responsive** design (mobile-first approach)
- ✨ **Smooth Animations** with AOS (Animate On Scroll)
- 🎭 **Interactive Elements** with hover effects and transitions
- ⚡ **Optimized Performance** with Next.js 15 and Turbopack

### 🛠️ **Technical Excellence**

- 🔥 **Modern Stack**: Next.js 15, React 19, TypeScript 5
- 🎯 **SEO Optimized** with proper meta tags and structure
- 📊 **Analytics Ready** for tracking and insights
- 🔒 **Type Safety** throughout the entire codebase
- 🎨 **Component-Based Architecture** for maintainability

### 📋 **Content Management**

- 📝 **Markdown-Driven Content** for easy updates
- 🔄 **Dynamic Routing** for projects and blog posts
- 🏷️ **Frontmatter Support** for metadata management
- 🔍 **Search-Friendly** content structure

### 🎪 **Interactive Sections**

- 👋 **Hero Section** with animated typing effects
- 🛠️ **Skills Showcase** with interactive cards and highlights
- 💼 **Experience Timeline** with detailed job history
- 🎯 **Projects Portfolio** with filterable categories
- 📬 **Contact Form** with email integration
- 🌐 **Social Links** and professional networks

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js) ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript) |
| **Styling** | ![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap) |
| **UI/UX** | ![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=flat&logo=mantine) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?style=flat&logo=framer) ![AOS](https://img.shields.io/badge/AOS-FF6B6B?style=flat) |
| **Development** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier) ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git) |
| **Deployment** | [![Netlify Status](https://api.netlify.com/api/v1/badges/0153483e-1ae4-4b63-a6fa-b8a34317ead2/deploy-status)](https://app.netlify.com/projects/edwardwhiteheaddev/deploys) |

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or later
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/edwardwhiteheaddev/edwardwhitehead.github.io.git

# Navigate to project directory
cd edwardwhitehead.github.io

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server with Turbopack
npm run dev

# Or use alternative package managers
yarn dev
pnpm dev
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

---

## 📁 Project Structure

```
edwardwhitehead.github.io/
├── 📁 src/
│   ├── 📁 app/                    # Next.js 15 App Router
│   │   ├── 📄 layout.tsx          # Root layout
│   │   ├── 📄 page.tsx            # Homepage
│   │   ├── 📄 globals.scss        # Global styles
│   │   └── 📁 [routes]/           # Dynamic routes
│   ├── 📁 components/             # Reusable components
│   │   ├── 📁 kyros/              # Main theme components
│   │   │   ├── 📄 Hero.tsx        # Hero section
│   │   │   ├── 📄 Skills.tsx      # Skills showcase
│   │   │   ├── 📄 Experience.tsx  # Experience timeline
│   │   │   ├── 📄 Projects.tsx    # Projects portfolio
│   │   │   └── 📄 Contact.tsx     # Contact section
│   │   └── 📁 ui/                 # UI components
│   ├── 📁 lib/                    # Utility functions
│   │   └── 📄 markdown.ts         # Markdown processing
│   └── 📁 assets/                 # Static assets
├── 📁 content/                    # Markdown content files
│   ├── 📄 hero.md                 # Hero section content
│   ├── 📄 skills.md               # Skills and highlights
│   ├── 📄 experience.md           # Work experience
│   ├── 📄 projects.md             # Projects showcase
│   └── 📄 contact.md              # Contact information
├── 📁 public/                     # Static files
├── 📄 package.json                # Dependencies
├── 📄 tsconfig.json              # TypeScript config
├── 📄 next.config.ts             # Next.js config
└── 📄 README.md                   # This file
```

---

## 🎨 Customization

### Content Management

All content is managed through Markdown files in the `/content` directory:

- **Hero Section**: Edit `content/hero.md`
- **Skills & Highlights**: Edit `content/skills.md`
- **Experience**: Edit `content/experience.md`
- **Projects**: Edit `content/projects.md`
- **Contact**: Edit `content/contact.md`

### Styling & Theme

- **Global Styles**: `src/app/globals.scss`
- **CSS Variables**: Defined in `:root` for easy theme customization
- **Component Styles**: Scoped styles within each component
- **Responsive Design**: Mobile-first approach with breakpoints

### Adding New Sections

1. Create a new component in `src/components/kyros/`
2. Add corresponding content file in `content/`
3. Import and use in `src/app/page.tsx`
4. Add styles to `globals.scss`

---

## 🌟 Key Highlights

### Performance Optimizations

- ⚡ **Next.js 15** with Turbopack for lightning-fast builds
- 🖼️ **Image Optimization** with Next.js Image component
- 📦 **Code Splitting** for optimal loading
- 🔄 **Static Generation** for maximum performance

### SEO & Accessibility

- 🔍 **SEO Optimized** with proper meta tags
- ♿ **Accessibility Ready** with semantic HTML
- 📱 **Mobile-First** responsive design
- 🌐 **Social Media** integration

### Developer Experience

- 🔥 **Hot Reloading** with Turbopack
- 🛡️ **Type Safety** with TypeScript
- 📝 **ESLint Configuration** for code quality
- 🎯 **Component Architecture** for maintainability

---

## 📚 Documentation

### Component Architecture

Each component follows a consistent pattern:

- **Props Interface**: TypeScript interfaces for type safety
- **Default Export**: Component function
- **Styling**: CSS classes following BEM methodology
- **Animations**: AOS integration for smooth animations

### Content Structure

Content files use frontmatter for metadata and markdown for content:

```markdown
---
title: "Section Title"
subtitle: "Optional subtitle"
---

# Markdown content here
```

### Animation System

The website uses AOS (Animate On Scroll) with consistent timing:

- **Base delay**: 0ms
- **Increment**: 150ms per element
- **Duration**: 800ms
- **Easing**: ease-out-cubic

---

## 🚀 Deployment

### GitHub Pages

This repository is configured for GitHub Pages deployment:

1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site is available at `https://edwardwhitehead.github.io`

### Vercel (Recommended)

For optimal performance with Next.js features:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/edwardwhiteheaddev/edwardwhitehead.github.io)

### Other Platforms

- **Netlify**: Drag and drop the `out` folder after `npm run build`
- **AWS S3**: Upload static files from `out` folder
- **Docker**: Build container with included Dockerfile

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 About the Developer

**Edward Whitehead** is a seasoned software developer and entrepreneur with 20+ years of experience building scalable solutions. Specializing in:

- 🏗️ **Full-Stack Development** (React, Next.js, .NET, Mobile)
- 🤖 **AI & Machine Learning** Integration
- ☁️ **Cloud Architecture** (Azure, GCP, Firebase)
- 🚀 **Startup Development** & Product Management

### 📫 Get In Touch

- 🌐 **Website**: [edwardwhitehead.dev](https://edwardwhitehead.dev)
- 💼 **LinkedIn**: [edward-whitehead](https://www.linkedin.com/in/edwardwhiteheaddev)
- 📧 **Email**: [hello@edwardwhitehead.dev](mailto:hello@edwardwhitehead.dev)
- 📱 **Phone**: [+27 61-760-9568](tel:+27617609568)

---

<div align="center">

### ⭐ Star this repository if you found it helpful

**Built with ❤️ by Edward Whitehead**

</div>
