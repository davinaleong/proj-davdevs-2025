import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"

export default function Faith() {
    // Get all sermon posts on server side
    const allSermons = getPostsByType('sermons')

    return (
        <div>
            <HeroSection variant="gradient" height="half">
                <div className="flow">
                    <h1 className="text-3xl lg:text-6xl font-bold">Messages of Faith 🙏✨</h1>
                    <p className="lg:text-xl">Discover hope, inspiration, and spiritual growth through heartfelt messages that encourage your journey of faith.</p>
                </div>
            </HeroSection>
            <PostsList 
                posts={allSermons} 
                postType="sermons"
                searchPlaceholder="Search sermons..."
                baseHref="/faith"
            />
        </div>
    )
}