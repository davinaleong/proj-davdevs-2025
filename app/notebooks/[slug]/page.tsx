import EnhancedPostPage from "../../components/EnhancedPostPage"

interface NotebooksSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function NotebooksSlugPage({ params }: NotebooksSlugPageProps) {
    const resolvedParams = await params
    return <EnhancedPostPage params={resolvedParams} postType="notebooks" />
}