import PostPage from "../../components/PostPage"

interface FaithSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function FaithSlugPage({ params }: FaithSlugPageProps) {
    const resolvedParams = await params
    return <PostPage params={resolvedParams} postType="sermons" />
}