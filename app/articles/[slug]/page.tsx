import PostPage from "../../components/PostPage"

interface ArticleSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ArticleSlugPage({ params }: ArticleSlugPageProps) {
    const resolvedParams = await params
    return <PostPage params={resolvedParams} postType="articles" />
}