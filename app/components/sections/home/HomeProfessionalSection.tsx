import HomeSection from '../../HomeSection'
import Card from '../../Card'
import { getPostBySlug } from '../../../utils/content'

export default function HomeProfessionalSection() {
  // Load Resume and Timeline data from actual MDX files
  const resumePost = getPostBySlug('static', 'resume');
  const timelinePost = getPostBySlug('static', 'timeline');

  return (
    <HomeSection
      title="My Professional Journey 💼"
      variant="neutral"
    >
      <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumePost && (
              <Card
                post={resumePost}
                baseHref="/pages"
              />
            )}
            {timelinePost && (
              <Card
                post={timelinePost}
                baseHref="/pages"
              />
            )}
          </div>
        </div>
    </HomeSection>
  );
}