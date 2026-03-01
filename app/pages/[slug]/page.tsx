import EnhancedPostPage from "../../components/EnhancedPostPage"

interface PagesSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function PagesSlugPage({ params }: PagesSlugPageProps) {
    const resolvedParams = await params
    return <EnhancedPostPage params={resolvedParams} postType="static" />
}