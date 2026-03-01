import EnhancedPostPage from "../../components/EnhancedPostPage"

interface KnowledgeSharingSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function KnowledgeSharingSlugPage({ params }: KnowledgeSharingSlugPageProps) {
    const resolvedParams = await params
    return <EnhancedPostPage params={resolvedParams} postType="knowledge-sharing" />
}