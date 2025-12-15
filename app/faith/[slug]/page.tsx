import PostPage from "../../components/PostPage"

interface FaithSlugPageProps {
    params: {
        slug: string
    }
}

export default function FaithSlugPage({ params }: FaithSlugPageProps) {
    return <PostPage params={params} postType="sermons" />
}