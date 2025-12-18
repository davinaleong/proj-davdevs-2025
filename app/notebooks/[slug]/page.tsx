import PostPage from "../../components/PostPage"

interface NotebooksSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function NotebooksSlugPage({ params }: NotebooksSlugPageProps) {
    const resolvedParams = await params
    return <PostPage params={resolvedParams} postType="notebooks" />
}