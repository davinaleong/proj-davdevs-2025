import HeroSection from "../components/HeroSection"
import PostsList from "../components/PostsList"
import { getPostsByType } from "../utils/content"

export default function FemSolutions() {
    // Get all sermon posts on server side
    const allSolutions = getPostsByType('fem')

    return (
        <div>
            <HeroSection variant="gradient" height="half">
                <div className="flow">
                    <h1 className="text-3xl lg:text-6xl font-bold">Frontend Mentor Solutions 🎯</h1>
                    <p className="lg:text-xl">A curated collection of Frontend Mentor challenges—crafted with clean code, thoughtful UI, and real-world best practices.</p>
                </div>
            </HeroSection>
            <PostsList 
                posts={allSolutions} 
                postType="fem"
                searchPlaceholder="Search solutions..."
                baseHref="/fem"
            />
        </div>
    )
}