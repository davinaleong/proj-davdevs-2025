import EnhancedPostPage from "../../components/EnhancedPostPage"

interface FaithSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function FaithSlugPage({ params }: FaithSlugPageProps) {
    const resolvedParams = await params
    return <PostPage params={resolvedParams} postType="sermons" />
}