import HomeSection from '../../HomeSection'
import Card from '../../Card'
import { getKnowledgeSharingPosts } from '../../../utils/site-config'

export default function HomeKnowledgeSharingSection() {
  const knowledgeSharingPosts = getKnowledgeSharingPosts();

  return (
    <HomeSection
      title="Knowledge Sharing 📚"
      variant="neutral"
    >
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            post={knowledgeSharingPosts.devto}
            external={true}
          />
          <Card
            post={knowledgeSharingPosts.talks}
            external={true}
          />
        </div>
      </div>
    </HomeSection>
  );
}