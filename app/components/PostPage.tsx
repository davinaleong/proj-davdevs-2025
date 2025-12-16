import { notFound } from 'next/navigation'
import HeroSection from "./HeroSection"
import Prose from "./Prose"
import TagFlex from "./TagFlex"
import Tag from "./Tag"
import { getPostBySlug, PostType } from "../utils/content"
import { MDXRemote } from 'next-mdx-remote/rsc'

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

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })

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
                <Prose>
                    <MDXRemote source={post.content} />
                </Prose>

                {post.tags.length > 0 && (
                    <TagFlex>
                        {post.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </TagFlex>
                )}
            </section>
        </div>
    )
}