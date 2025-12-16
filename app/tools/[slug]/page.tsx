import PostPage from "../../components/PostPage"

interface ToolsSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ToolsSlugPage({ params }: ToolsSlugPageProps) {
    const resolvedParams = await params
    return <PostPage params={resolvedParams} postType="tools" />
}