import PostPage from "../../components/PostPage"

interface KnowledgeSharingSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function KnowledgeSharingSlugPage({ params }: KnowledgeSharingSlugPageProps) {
    const resolvedParams = await params
    return <PostPage params={resolvedParams} postType="knowledge-sharing" />
}