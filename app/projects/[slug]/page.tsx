import PostPage from "../../components/PostPage"

interface ProjectSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
    const resolvedParams = await params
    return <PostPage params={resolvedParams} postType="projects" />
}