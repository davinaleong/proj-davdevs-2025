'use client'

import HeroSection from "./../../components/HeroSection"
import LinkButton from "./../../components/LinkButton"
import ImageDisplay from "./../../components/ImageDisplay"
import Prose from "./../../components/Prose"
import TagFlex from "../../components/TagFlex"
import Tag from "./../../components/Tag"

export default function FaithSlugPage() {
    return (
        <div>
            <HeroSection className="flow" variant="responsive" height="half">
                <h1 className="text-4xl lg:text-6xl font-bold">Post Title</h1>
                <p className="lg:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, iste.</p>
                <p className="flex justify-center gap-1 text-sm">
                    <span> <time>15 Dec 2025</time></span>
                    <span>&middot;</span>
                    <span><time>2 min</time></span>
                </p>
                <p className="flex justify-center gap-5">
                    <LinkButton href="#">Link 1</LinkButton>
                    <LinkButton href="#">Link 2</LinkButton>
                </p>
            </HeroSection>
            <section className="max-w-2xl mx-auto md:p-4">
                <ImageDisplay alt="Placeholder image" aspectRatio="landscape"/>
                {/* Post Type: Article(s) */}
                <ImageDisplay alt="Placeholder image" aspectRatio="square"/>
            </section>
            <section className="container mx-auto p-4 flow">
                <Prose>
                    <h2>Section Heading</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                    <h3>Subsection Heading</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </Prose>

                <TagFlex>
                    <Tag>Tag 1</Tag>
                    <Tag>Tag 2</Tag>
                    <Tag>Tag 3</Tag>
                </TagFlex>
            </section>
        </div>
    )
}