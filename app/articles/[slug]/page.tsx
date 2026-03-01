import EnhancedPostPage from "../../components/EnhancedPostPage"

interface ArticleSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ArticleSlugPage({ params }: ArticleSlugPageProps) {
    const resolvedParams = await params
    return <EnhancedPostPage params={resolvedParams} postType="articles" />
}