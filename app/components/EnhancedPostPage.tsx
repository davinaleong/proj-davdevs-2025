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
import { getEnhancedPostBySlug, EnhancedPost } from "../utils/enhanced-content"
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
import EmojiFoodCatcher from './tools/apps/EmojiFoodCatcher'

type ComponentProps = Record<string, unknown>

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

// Tool component mapping
const TOOL_COMPONENTS: Record<string, React.ComponentType<ComponentProps>> = {
    '20251010-calculator': Calculator,
    '20251010-card-miles-converter': CardMilesConverter,
    '20250511-color-palettes': () => <ColorPalettes groups={colorsData.colorGroups} />,
    '20251010-color-value-converter': ColorValueConverter,
    '20250529-duplicated-paragraph-scanner': DuplicatedParagraphScanner,
    '20251116-memory-cards': MemoryCards,
    '20250528-easy-password-generator': PasswordCreator,
    '20250511-password-strength-meter': PasswordStrengthMeter,
    '20250511-qr-code-generator': QrCodeGenerator,
    '20251010-translator': Translator,
    '20251218-timers': Timers,
    '20260102-minesweeper': Minesweeper,
    '20260102-emoji-food-catcher': EmojiFoodCatcher,
}

// Component type mapping for enhanced posts
const COMPONENT_MAP: Record<string, React.ComponentType<ComponentProps>> = {
    calculator: Calculator,
    'card-miles-converter': CardMilesConverter,
    'color-palettes': () => <ColorPalettes groups={colorsData.colorGroups} />,
    'color-value-converter': ColorValueConverter,
    'duplicated-paragraph-scanner': DuplicatedParagraphScanner,
    'memory-cards': MemoryCards,
    'password-creator': PasswordCreator,
    'password-strength-meter': PasswordStrengthMeter,
    'qr-code-generator': QrCodeGenerator,
    translator: Translator,
    timers: Timers,
    minesweeper: Minesweeper,
    'emoji-food-catcher': EmojiFoodCatcher,
}

interface PostPageParams {
    slug: string
}

interface PostPageProps {
    params: PostPageParams
    postType: PostType
}

/**
 * Enhanced content renderer that processes component placeholders
 */
function EnhancedContentRenderer({ 
    htmlContent, 
    components, 
    componentConfig, 
    slug,
    isToolPost
}: {
    htmlContent: string;
    components: string[];
    componentConfig: ComponentProps;
    slug: string;
    isToolPost: boolean;
}) {
    // Process HTML to inject components
    const processedContent = htmlContent.replace(
        /<div data-component="([^"]+)"(?:\s+data-config="([^"]*)")?><\/div>/g,
        (_match, componentName, _encodedConfig, offset) => {
            // Return a placeholder that will be replaced by React component
            return `<div id="component-${componentName}-${offset}"></div>`;
        }
    );

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            
            {/* Render components based on type */}
            {(isToolPost || components.includes('tool')) && TOOL_COMPONENTS[slug] && (
                <div className="my-8 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    {(() => {
                        const ToolComponent = TOOL_COMPONENTS[slug];
                        return <ToolComponent {...componentConfig} />;
                    })()}
                </div>
            )}
            
            {/* Render individual components */}
            {components.filter(comp => comp !== 'tool').map((componentName, index) => {
                const Component = COMPONENT_MAP[componentName];
                if (!Component) return null;
                const componentProps = componentConfig[componentName];
                const safeProps = isRecord(componentProps) ? componentProps : {};
                
                return (
                    <div key={index} className="my-8">
                        <Component {...safeProps} />
                    </div>
                );
            })}
        </div>
    );
}

export default function EnhancedPostPage({ params, postType }: PostPageProps) {
    // Try enhanced post first (markdown), fallback to MDX
    const enhancedPost = getEnhancedPostBySlug(postType, params.slug);
    const mdxPost = enhancedPost ? null : getPostBySlug(postType, params.slug);
    
    if (!enhancedPost && !mdxPost) {
        notFound();
    }

    const post = enhancedPost || mdxPost!;
    const isEnhanced = !!enhancedPost;

    const dateConfig = getDateFormatConfig();
    const formattedDate = new Date(post.date).toLocaleDateString(
        dateConfig.locale, 
        dateConfig.options as Intl.DateTimeFormatOptions
    );

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

                {/* Content Rendering */}
                <Prose>
                    {isEnhanced ? (
                        // Enhanced markdown rendering
                        <EnhancedContentRenderer
                            htmlContent={(post as EnhancedPost).htmlContent}
                            components={(post as EnhancedPost).components || []}
                            componentConfig={(post as EnhancedPost).componentConfig || {}}
                            slug={post.slug}
                            isToolPost={postType === 'tools'}
                        />
                    ) : (
                        // Traditional MDX rendering
                        <>
                            {postType === 'tools' && TOOL_COMPONENTS[post.slug] ? (
                                // Render tool component and MDX content for tools
                                <>
                                    <div className="mb-8">
                                        {(() => {
                                            const ToolComponent = TOOL_COMPONENTS[post.slug];
                                            return <ToolComponent />;
                                        })()}
                                    </div>
                                    <MDXRemote source={post.content} />
                                </>
                            ) : (
                                // Render MDX content for other post types
                                <MDXRemote source={post.content} />
                            )}
                        </>
                    )}
                </Prose>

                {/* Tags */}
                {post.tags.length > 0 && (
                    <TagFlex>
                        {post.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </TagFlex>
                )}

                {/* Back button */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Anchor
                        href={`/${postType}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
                    >
                        <ArrowLeft size={16} />
                        Back to {postType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Anchor>
                </div>

                {/* Development info */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded text-sm">
                        <strong>Dev Info:</strong> Rendering {isEnhanced ? 'Enhanced Markdown' : 'MDX'} content
                        {isEnhanced && (
                            <div>
                                <strong>Components:</strong> {(post as EnhancedPost).components?.join(', ') || 'None'}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}