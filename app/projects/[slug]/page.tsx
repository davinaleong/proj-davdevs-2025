import EnhancedPostPage from "../../components/EnhancedPostPage"

interface ProjectSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
    const resolvedParams = await params
    return <EnhancedPostPage params={resolvedParams} postType="projects" />
}