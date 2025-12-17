import PostPage from "../../components/PostPage"

interface TechDemoSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function TechDemoSlugPage({ params }: TechDemoSlugPageProps) {
    const resolvedParams = await params
return <PostPage params={resolvedParams} postType="technical-demos" />
}