import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import HeroSection from "./HeroSection"
import Prose from "./Prose"
import TagFlex from "./TagFlex"
import Tag from "./Tag"
import Anchor from "./Anchor"
import { getPostBySlug, PostType } from "../utils/content"
import { MDXRemote } from 'next-mdx-remote/rsc'
import dateFormatConfig from '../config/date-format.json'
import colorsData from '../data/colors.json'

// Tool Components
import Calculator from './tools/Calculator'
import CardMilesConverter from './tools/CardMilesConverter'
import ColorPalettes from './tools/ColorPalettes'
import ColorValueConverter from './tools/ColorValueConverter'
import DuplicatedParagraphScanner from './tools/DuplicatedParagraphScanner'
import MemoryCards from './tools/MemoryCards'
import PasswordCreator from './tools/PasswordCreator'
import PasswordStrengthMeter from './tools/PasswordStrengthMeter'
import QrCodeGenerator from './tools/QrCodeGenerator'
import Translator from './tools/Translator'

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

    const formattedDate = new Date(post.date).toLocaleDateString(
        dateFormatConfig.dateFormat.locale, 
        dateFormatConfig.dateFormat.options as Intl.DateTimeFormatOptions
    )

    return (
        <div>
            <HeroSection variant="responsive" height="half">
                <h1 className="text-4xl lg:text-6xl font-bold">{post.title}</h1>
                <p className="max-w-[60ch] mx-auto lg:text-lg">{post.description}</p>
                <p className="flex justify-center gap-1 text-sm">
                    <span>
                        <time dateTime={post.date}>{formattedDate}</time>
                    </span>
                    <span>&middot;</span>
                    <span>{post.readingTime} min read</span>
                </p>
                <p className="text-sm opacity-75">By {post.author}</p>
            </HeroSection>
            
            <section className="container mx-auto p-4 flow max-w-4xl">
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
                        Back to {postType.charAt(0).toUpperCase() + postType.slice(1)}
                    </Anchor>
                </div>
            </section>
        </div>
    )
}