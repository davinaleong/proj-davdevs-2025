import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import HeroSection from "./HeroSection"
import Prose from "./Prose"
import TagFlex from "./TagFlex"
import Tag from "./Tag"
import Anchor from "./Anchor"
import Nav from "./Nav"
import LinkButton from "./LinkButton"
import PostImages from "./PostImages"
import { getPostBySlug, PostType } from "../utils/content"
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getDateFormatConfig } from '../utils/site-config'
import colorsData from '../data/colors.json'

// Tool Components
import Calculator from './tools/apps/Calculator'
import CardMilesConverter from './tools/apps/CardMilesConverter'
import ColorPalettes from './tools/apps/ColorPalettes'
import ColorValueConverter from './tools/apps/ColorValueConverter'
import DuplicatedParagraphScanner from './tools/apps/DuplicatedParagraphScanner'
import MemoryCards from './tools/apps/MemoryCards'
import PasswordCreator from './tools/apps/PasswordCreator'
import PasswordStrengthMeter from './tools/apps/PasswordStrengthMeter'
import QrCodeGenerator from './tools/apps/QrCodeGenerator'
import Translator from './tools/apps/Translator'
import Timers from './tools/apps/Timers'
import Minesweeper from './tools/apps/Minesweeper'

// Tool component mapping
const TOOL_COMPONENTS: Record<string, () => React.ReactElement> = {
    '20251010-calculator': () => <Calculator />,
    '20251010-card-miles-converter': () => <CardMilesConverter />,
    '20250511-color-palettes': () => <ColorPalettes groups={colorsData.colorGroups} />,
    '20251010-color-value-converter': () => <ColorValueConverter />,
    '20250529-duplicated-paragraph-scanner': () => <DuplicatedParagraphScanner />,
    '20251116-memory-cards': () => <MemoryCards />,
    '20250528-easy-password-generator': () => <PasswordCreator />,
    '20250511-password-strength-meter': () => <PasswordStrengthMeter />,
    '20250511-qr-code-generator': () => <QrCodeGenerator />,
    '20251010-translator': () => <Translator />,
    '20251218-timers': () => <Timers />,
    '20260102-minesweeper': () => <Minesweeper />,
}

interface PostPageParams {
    slug: string
}

interface PostPageProps {
    params: PostPageParams
    postType: PostType
}

export default function PostPage({ params, postType }: PostPageProps) {
    const post = getPostBySlug(postType, params.slug)
    
    if (!post) {
        notFound()
    }

    const dateConfig = getDateFormatConfig()
    const formattedDate = new Date(post.date).toLocaleDateString(
        dateConfig.locale, 
        dateConfig.options as Intl.DateTimeFormatOptions
    )

    return (
        <div>
            <HeroSection variant="responsive" height="half">
                <h1 className="text-4xl lg:text-6xl font-bold">{post.title}</h1>
                <p className="max-w-[60ch] mx-auto lg:text-lg">{post.description}</p>
                <p className="flex items-center justify-center gap-1 text-sm">
                    <span>
                        <time dateTime={post.date}>{formattedDate}</time>
                    </span>
                    <span>&middot;</span>
                    <span>{post.readingTime} min read</span>
                    {post.featured && (<>
                        <span>&middot;</span>
                        <span className="inline-block uppercase text-xs rounded-sm text-white bg-orange-500 px-2 py-1">Featured</span>
                    </>)}
                </p>
                <p className="text-sm opacity-75">By {post.author}</p>
                
                {post.links && post.links.length > 0 && (
                    <Nav justify="center">
                        {post.links.map((link, index) => (
                            <LinkButton
                                key={index}
                                href={link.href}
                                external={link.href.startsWith('http')}
                                className="text-sm"
                            >
                                {link.label}
                            </LinkButton>
                        ))}
                    </Nav>
                )}
            </HeroSection>
            
            <section className="container mx-auto p-4 flow max-w-4xl">
                {/* Images Section */}
                {postType !== 'static' && post.images && post.images.length > 0 && (
                    <PostImages images={post.images} postType={postType} />
                )}

                {postType === 'tools' && TOOL_COMPONENTS[post.slug] ? (
                    // Render tool component and MDX content for tools
                    <>
                        <div className="mb-8">
                            {(() => {
                                const ToolComponent = TOOL_COMPONENTS[post.slug]
                                return <ToolComponent />
                            })()}
                        </div>
                        <Prose>
                            <MDXRemote source={post.content} />
                        </Prose>
                    </>
                ) : (
                    // Render MDX content for other post types
                    <Prose>
                        <MDXRemote source={post.content} />
                    </Prose>
                )}

                {post.tags.length > 0 && (
                    <TagFlex>
                        {post.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </TagFlex>
                )}

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Anchor
                        href={`/${postType}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
                    >
                        <ArrowLeft size={16} />
                        Back to {postType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Anchor>
                </div>
            </section>
        </div>
    )
}