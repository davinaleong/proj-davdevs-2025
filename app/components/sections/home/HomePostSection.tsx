import { ComponentProps } from 'react'
import HomeSection from '../../HomeSection'
import CardCarousel from '../../CardCarousel'
import { getLatestPostsByType, type PostType, type PostSummary } from '../../../utils/content'

interface HomePostSectionProps {
  title: string;
  postType: PostType;
  variant?: ComponentProps<typeof HomeSection>['variant'];
  showViewAllLink?: boolean;
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
  id?: string;
}

export default function HomePostSection({
  title,
  postType,
  variant = 'default',
  showViewAllLink = true,
  viewAllHref,
  viewAllText,
  className = "",
  id
}: HomePostSectionProps) {
  const posts = getLatestPostsByType(postType, 3);
  
  // Generate default view all href if not provided
  const defaultViewAllHref = `/${postType}`;
  const finalViewAllHref = viewAllHref || defaultViewAllHref;
  const finalViewAllText = viewAllText || `View All ${title}`;

  // Convert posts to card data
  const cardData = posts.map((post: PostSummary) => ({
    title: post.title,
    description: post.description,
    footerText: `${post.readingTime} min read • ${new Date(post.date).toLocaleDateString()}`,
    href: `/${post.type}/${post.slug}`,
    featured: post.featured,
    external: false
  }));

  // Don't render if no posts
  if (posts.length === 0) {
    return (
      <HomeSection 
        id={id}
        title={title} 
        variant={variant}
        className={className}
      >
        <div className="container mx-auto p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            No {postType} posts available yet.
          </p>
        </div>
      </HomeSection>
    );
  }

  return (
    <HomeSection 
      id={id}
      title={title} 
      variant={variant}
      className={className}
      anchorProps={showViewAllLink ? {
        href: finalViewAllHref,
        children: finalViewAllText
      } : undefined}
    >
      <div className="container mx-auto p-6">
        <CardCarousel
          cards={cardData}
        />
      </div>
    </HomeSection>
  );
}