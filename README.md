# DavDevs 2025 Portfolio

A modern portfolio website built with Next.js, featuring interactive components, original humor, and a comprehensive design system.

## ✨ Features

- **🎭 Interactive Joke Section** - Original jokes with Q&A gameplay, timer, and smart answer checking
- **🎨 Component Library** - Reusable UI components with variant systems and theming
- **🌙 Dark Mode Support** - Seamless light/dark theme switching
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **🔍 SEO Optimized** - Dynamic sitemap generation and meta optimization
- **⚡ Performance** - Next.js 15+ with React 19 and optimized loading

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
├── components/          # Reusable UI components
│   ├── sections/       # Page section components
│   │   ├── home/      # Home page sections
│   │   └── jokes/     # Joke-related components
│   ├── Button.tsx     # Button component with variants
│   ├── Section.tsx    # Layout section component
│   └── ...
├── data/              # Static data files
│   └── jokes.json     # Original joke content
├── utils/             # Utility functions
│   ├── jokes.ts       # Joke management utilities
│   └── sitemap.ts     # SEO sitemap generation
└── pages/
    ├── funny/         # Interactive jokes page
    └── sitemap.xml/   # Dynamic sitemap route
```

## 🎮 Key Features

### Interactive Joke System
- **Smart Answer Checking** - Fuzzy matching with similarity scoring
- **Visual Feedback** - Color-coded responses based on accuracy
- **Timer Challenge** - 30-second countdown with progress visualization
- **Explanation Support** - Additional context for wordplay jokes

### Component Library
- **Variant Systems** - Consistent theming across components
- **TypeScript Support** - Full type safety and IntelliSense
- **Responsive Design** - Mobile-first responsive components
- **Accessibility** - WCAG compliant interactive elements

### SEO & Performance
- **Dynamic Sitemap** - Auto-generated XML sitemap at `/sitemap.xml`
- **Meta Optimization** - Structured metadata for search engines
- **Performance** - Optimized images, fonts, and lazy loading

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **UI**: React 19, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4 with dark mode
- **Deployment**: Vercel-ready

## 📝 Content

All jokes and humorous content are original creations. See disclaimer in the joke section for intellectual property information.

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
```

## 📄 License

This project is open source. Original joke content is proprietary.

---

Built with ❤️ using Next.js and modern web technologies.
