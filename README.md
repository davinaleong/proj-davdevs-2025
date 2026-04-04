# Dav/Devs 2025 Portfolio

A comprehensive portfolio website showcasing web development projects, technical articles, interactive tools, and personal content. Built with Next.js and modern web technologies.

## ✨ Features

- **💼 Project Portfolio** - Showcase of web development projects with live demos and source code
- **📚 Technical Articles** - In-depth tutorials, guides, and development insights
- **🛠️ Interactive Tools** - Utility applications including color converters, QR generators, timers, and more
- **🐍 Python Notebooks** - Interactive Jupyter notebooks demonstrating programming concepts
- **🎯 Frontend Mentor Solutions** - Challenge solutions and learning demonstrations
- **📖 Knowledge Sharing** - Educational content and learning resources
- **✝️ Faith Content** - Spiritual messages, sermons, and faith-based content
- **🎭 Interactive Features** - Original jokes, games, and engaging user experiences
- **🌙 Dark Mode Support** - Seamless light/dark theme switching
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **🔍 SEO Optimized** - Dynamic sitemap generation and comprehensive meta optimization
- **⚡ High Performance** - Next.js 15+ with React 19 and optimized loading

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd proj-davdevs-2025

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🏗️ Project Structure

```
app/
├── components/             # Reusable UI components
│   ├── sections/           # Page section components
│   ├── tools/              # Tool-specific components
│   ├── Button.tsx          # Button component with variants
│   ├── Section.tsx         # Layout section components
│   └── ...                 # Core UI components
├── content/                # MDX content files
│   ├── articles/           # Technical blog posts
│   ├── projects/           # Portfolio project descriptions
│   ├── tools/              # Tool documentation
│   ├── notebooks/          # Python notebook content
│   ├── fem/                # Frontend Mentor solutions
│   ├── knowledge-sharing/  # Educational content
│   ├── sermons/            # My personal Christian sermons
│   ├── technical-demos/    # Code demonstrations
│   └── static/             # Static pages (privacy, terms, etc.)
├── data/                   # Static data and configuration
│   ├── site-config.json    # Site navigation and settings
│   ├── jokes.json          # Original humor content
│   ├── colors.json         # Color palette data
│   └── ...                 # Various data files
├── utils/                  # Utility functions
│   ├── content-helpers.ts  # Content processing utilities
│   └── ...                 # Helper functions
└── [sections]/             # Dynamic route pages
    ├── projects/           # Portfolio showcase
    ├── articles/           # Blog articles
    ├── tools/              # Interactive utilities
    ├── notebooks/          # Python content
    ├── sermons/            # My personal Christian sermons
    └── ...                 # Additional content sections
```

## 🎮 Key Features & Sections

### 💼 Portfolio & Projects
- **Live Demonstrations** - Interactive project showcases with working demos
- **Source Code Access** - Direct links to GitHub repositories
- **Technology Showcases** - Projects spanning React, Laravel, vanilla JavaScript, and more
- **Responsive Galleries** - Image carousels and project screenshots

### 📚 Technical Content
- **Development Articles** - Tutorials on web technologies, AI, security, and best practices
- **Code Examples** - Practical implementations and demonstrations
- **Learning Resources** - Educational content for developers at all levels

### 🛠️ Interactive Tools
- **Color Converter** - Convert between hex, RGB, HSL color formats
- **QR Code Generator** - Create custom QR codes for various uses
- **Timer Applications** - Customizable countdown and stopwatch tools
- **Text Utilities** - Various text processing and formatting tools

### 🐍 Python Programming
- **Jupyter Notebooks** - Interactive programming demonstrations
- **Data Analysis** - Python tutorials and data science examples
- **Educational Content** - Programming concepts and best practices

### 🎯 Learning & Development
- **Frontend Mentor Solutions** - Challenge completions with explanations
- **Knowledge Sharing** - Educational presentations and tutorials
- **Technical Demos** - Code demonstrations and proof-of-concepts

### ✝️ Faith & Personal Content
- **Spiritual Messages** - Faith-based content and reflections
- **Personal Journey** - Timeline and resume information
- **Community Content** - Engaging and uplifting material

### 🎭 Interactive Entertainment
- **Original Humor** - Custom joke system with smart answer checking
- **Games & Challenges** - Interactive content with timers and scoring
- **Engaging UX** - Smooth animations and user feedback systems

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Content**: MDX for rich content with React components
- **Icons**: Lucide React for consistent iconography
- **Styling**: Tailwind CSS v4 with dark mode support
- **Data**: JSON-based content management
- **Performance**: Optimized images, fonts, and code splitting
- **SEO**: Dynamic sitemap generation and meta optimization
- **Deployment**: Vercel-ready with environment configuration

## 📝 Content Management

### Content Types
- **Projects**: MDX files with metadata, images, and live demo links
- **Articles**: Technical blog posts with code examples and tutorials
- **Tools**: Interactive applications with documentation
- **Notebooks**: Python programming content and demonstrations
- **Static Pages**: Legal documents, resume, and informational content

### Data Sources
- **Configuration**: JSON files for site settings and navigation
- **Content**: MDX files for rich text with embedded React components
- **Assets**: Optimized images and media files
- **Utilities**: Helper functions for content processing and SEO

All content is original unless otherwise specified. Code examples and tutorials are provided for educational purposes.

## 🔧 Development

```bash
# Development
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Generate sitemap
npm run generate-sitemap
```

## 🚀 Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<repository-url>)

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_CHAT_BUTTON_ENABLED=false
```

## 📄 License

This project is open source. Original joke content is proprietary.

---

**Dav/Devs Portfolio** - Showcasing development skills, sharing knowledge, and building community through code.

Built with ❤️ using Next.js and modern web technologies.
