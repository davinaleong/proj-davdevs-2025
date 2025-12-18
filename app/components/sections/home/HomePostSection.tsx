import { ComponentProps } from 'react'
import HomeSection from '../../HomeSection'
import Card from '../../Card'
import { getLatestPostsByType, type PostType } from '../../../utils/content'

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.slug}
              post={post}
              baseHref={`/${postType}`}
            />
          ))}
        </div>
      </div>
    </HomeSection>
  );
}