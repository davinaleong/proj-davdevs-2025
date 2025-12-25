# Dav/Devs 2025 - Complete Repository Map

Generated on: December 25, 2025

## Root Structure
```
proj-davdevs-2025/
├── .git/                                    # Git version control
├── .github/                                 # GitHub configuration
│   └── workflows/
│       └── sync-to-blob.yml                 # GitHub Action workflow
├── .gitignore                               # Git ignore patterns
├── .next/                                   # Next.js build output (generated)
├── app/                                     # Next.js App Router directory
├── eslint.config.mjs                        # ESLint configuration
├── next-env.d.ts                            # Next.js TypeScript declarations
├── next.config.ts                           # Next.js configuration
├── node_modules/                            # Dependencies (generated)
├── package-lock.json                        # Dependency lock file
├── package.json                             # Project dependencies and scripts
├── postcss.config.mjs                       # PostCSS configuration
├── public/                                  # Static assets
├── README.md                                # Project documentation
├── REPOSITORY_MAP.md                        # This file
├── scripts/                                 # Build and utility scripts
├── text-files/                              # Text data files
├── tsconfig.json                            # TypeScript configuration
└── types/                                   # TypeScript type definitions
```

## App Directory (`/app`)
```
app/
├── _import/                                 # Content migration workspace
├── api/                                     # API routes
├── articles/                                # Articles route pages
├── assets/                                  # Asset files
├── components/                              # React components
├── config/                                  # Configuration files
├── content/                                 # MDX content files
├── data/                                    # JSON data files
├── favicon.ico                              # Site favicon
├── favicon.svg                              # SVG favicon
├── fem/                                     # FEM (Frontend Mentor) route pages
├── funny/                                   # Funny/Jokes route pages
├── globals.css                              # Global CSS styles
├── knowledge-sharing/                       # Knowledge sharing route pages
├── layout.tsx                               # Root layout component
├── notebooks/                               # Notebooks route pages
├── page.tsx                                 # Homepage component
├── pages/                                   # Additional pages
├── projects/                                # Projects route pages
├── sermons/                                 # Sermons route pages
├── sitemap.ts                               # Dynamic sitemap generation
├── technical-demos/                         # Technical demos route pages
├── test/                                    # Test pages/components
├── tools/                                   # Tools route pages
└── utils/                                   # Utility functions
```

## Components (`/app/components`)
```
components/
├── animations/                              # Animation components
├── sections/                                # Page section components
├── tools/                                   # Tool-specific components
├── Anchor.tsx                               # Link component with animations
├── Brand.tsx                                # Brand/Logo component
├── Button.tsx                               # Button component
├── Card.tsx                                 # Card component
├── CardCarousel.tsx                         # Card carousel component
├── CardGrid.tsx                             # Card grid layout
├── Chatbot.tsx                              # Chatbot interface
├── ChatInput.tsx                            # Chat input component
├── ChatToggle.tsx                           # Chat toggle button
├── ChatWindow.tsx                           # Chat window component
├── ClientLayout.tsx                         # Client-side layout wrapper
├── ComingSoon.tsx                           # Coming soon placeholder
├── DropdownMenu.tsx                         # Dropdown menu component
├── Gallery.tsx                              # Image gallery component
├── Group.tsx                                # Group/Container component
├── HeroSection.tsx                          # Hero section component
├── HomeSection.tsx                          # Home page sections
├── ImageDisplay.tsx                         # Image display component
├── Input.tsx                                # Input field component
├── Label.tsx                                # Form label component
├── Lightbox.tsx                             # Lightbox/Modal for images
├── LinkButton.tsx                           # Link styled as button
├── ListFooter.tsx                           # List pagination footer
├── ListHeader.tsx                           # List header with controls
├── Menu.tsx                                 # Navigation menu
├── MessageBubble.tsx                        # Chat message bubble
├── Modal.tsx                                # Modal dialog component
├── Nav.tsx                                  # Navigation component
├── Pagination.tsx                           # Pagination component
├── Panel.tsx                                # Panel/Container component
├── PostImages.tsx                           # Post image gallery
├── PostPage.tsx                             # Post page template
├── PostsList.tsx                            # Posts listing component
├── PrimaryFooter.tsx                        # Main site footer
├── PrimaryHeader.tsx                        # Main site header
├── Prose.tsx                                # Prose/Content wrapper
├── QrCode.tsx                               # QR code component
├── ResponseBubble.tsx                       # Chat response bubble
├── ScrollDown.tsx                           # Scroll down indicator
├── SearchAutocomplete.tsx                   # Search with autocomplete
├── SearchInput.tsx                          # Search input field
├── SearchModal.tsx                          # Search modal dialog
├── Section.tsx                              # Generic section wrapper
├── SortInput.tsx                            # Sort controls
├── Tab.tsx                                  # Tab component
├── TabFlex.tsx                              # Flexible tab container
├── TabPanel.tsx                             # Tab panel content
├── Table.tsx                                # Table component
├── Tag.tsx                                  # Tag/Label component
├── TagFlex.tsx                              # Flexible tag container
├── Textarea.tsx                             # Textarea input
└── ThemeSwitcherButton.tsx                  # Dark/Light mode toggle
```

## Content (`/app/content`)
```
content/
├── articles/                                # Blog articles (MDX)
├── fem/                                     # Frontend Mentor projects (MDX)
├── knowledge-sharing/                       # Knowledge sharing posts (MDX)
├── notebooks/                               # Notebook/Learning content (MDX)
├── projects/                                # Project showcases (MDX)
├── sermons/                                 # sermons/Sermon content (MDX)
├── static/                                  # Static pages (MDX)
├── technical-demos/                         # Technical demonstrations (MDX)
└── tools/                                   # Tool documentation (MDX)
```

## Data Files (`/app/data`)
```
data/
├── resume/                                  # Resume data files
├── color-converter-examples.json           # Color converter examples
├── colors.json                              # Color palette data
├── hero-content.json                        # Homepage hero content
├── jokes.json                               # Random jokes data
├── loyalty-programs.json                    # Loyalty programs data
├── site-config.json                         # Site configuration
├── site-links.json                          # Navigation links
├── timeline.json                            # Timeline/Experience data
├── timer-presets.json                       # Timer preset configurations
├── timer-sounds.json                        # Timer sound options
├── translator-languages.json               # Translation language pairs
└── translator-styles.json                  # Translation style options
```

## Public Assets (`/public`)
```
public/
├── articles/                                # Article images
├── fem/                                     # Frontend Mentor project images
├── knowledge-sharing/                       # Knowledge sharing images
├── projects/                                # Project images
└── static/                                  # Static content images
```

## Configuration Files
```
├── eslint.config.mjs                        # ESLint linting configuration
├── next-env.d.ts                            # Next.js TypeScript definitions
├── next.config.ts                           # Next.js framework configuration
├── package.json                             # Node.js project configuration
├── postcss.config.mjs                       # PostCSS processing configuration
└── tsconfig.json                            # TypeScript compiler configuration
```

## Scripts & Utilities
```
scripts/
└── generate-sitemap.mjs                     # Sitemap generation script

text-files/
├── colors.txt                               # Color reference data
├── duplicate-paragraph-scanner.txt         # Scanner tool data
├── jokes.txt                                # Jokes text data
├── knowledge-sharing.txt                    # Knowledge sharing data
├── responsive-table.txt                     # Table component data
└── social.txt                               # Social links data

types/
└── gray-matter.d.ts                         # Markdown frontmatter types
```

## Technology Stack
- **Animations**: Framer Motion
- **Content**: MDX (Markdown + JSX)
- **Framework**: Next.js 14+ (App Router)
- **Icons**: Lucide React
- **Language**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm
- **Styling**: Tailwind CSS

## Key Features
- 🌓 Dark/Light mode toggle
- �️ Interactive tools and demos
- 📝 MDX-powered content management
- 🎯 Multiple content types (Articles, Projects, Tools, etc.)
- 🔍 Omni-search with autocomplete
- 📱 Responsive design
- ✨ Subtle animations and hover effects
- 🏷️ Tag-based content organization