import PostPage from "../../components/PostPage"

interface FemSolutionsSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function FemSolutionsSlugPage({ params }: FemSolutionsSlugPageProps) {
    const resolvedParams = await params
    return <PostPage params={resolvedParams} postType="fem" />
}