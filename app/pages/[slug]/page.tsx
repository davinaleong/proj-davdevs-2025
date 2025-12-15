import PostPage from "../../components/PostPage"

interface PagesSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function PagesSlugPage({ params }: PagesSlugPageProps) {
    const resolvedParams = await params
    return <PostPage params={resolvedParams} postType="static" />
}