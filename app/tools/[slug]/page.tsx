import EnhancedPostPage from "../../components/EnhancedPostPage"

interface ToolsSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ToolsSlugPage({ params }: ToolsSlugPageProps) {
    const resolvedParams = await params
    return <EnhancedPostPage params={resolvedParams} postType="tools" />
}