import HeroSection from "./../../components/HeroSection"
import LinkButton from "./../../components/LinkButton"
import ImageDisplay from "./../../components/ImageDisplay"

export default function FaithSlugPage() {
    return (
        <div>
            <HeroSection className="flow" variant="responsive" height="half">
                <h1 className="text-4xl lg:text-6xl font-bold">Post Title</h1>
                <p className="lg:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, iste.</p>
                <p className="text-sm"><time>15 Dec 2025</time></p>
                <p className="flex justify-center gap-5">
                    <LinkButton href="#">Link 1</LinkButton>
                    <LinkButton href="#">Link 2</LinkButton>
                </p>
            </HeroSection>
            <section className="container mx-auto md:p-4">
                <ImageDisplay alt="Placeholder image" aspectRatio="landscape"/>
                {/* Post Type: Article(s) */}
                <ImageDisplay alt="Placeholder image" aspectRatio="square"/>
            </section>
        </div>
    )
}