import HomeHeroSection from './components/sections/home/HomeHeroSection'
import HomePostSection from './components/sections/home/HomePostSection'
import HomeSocialSection from './components/sections/home/HomeSocialSection'
import HomeJokeSection from './components/sections/home/HomeJokeSection'
import { findLinkByLabel } from './utils/links'
import { getPostSectionContent } from './utils/hero-content'

export default function Home() {
  const toolsLink = findLinkByLabel("Tools");
  const femLink = findLinkByLabel("Fem");
  const faithLink = findLinkByLabel("Faith");
  
  const toolsContent = getPostSectionContent('tools');
  const femContent = getPostSectionContent('fem');
  const sermonsContent = getPostSectionContent('sermons');
  
  return (
    <div>
      <HomeHeroSection />
      {toolsContent && (
        <HomePostSection 
          title={toolsContent.title} 
          postType="tools" 
          variant={toolsContent.variant} 
          viewAllHref={toolsLink?.href || "/tools"} 
          viewAllText={toolsContent.viewAllText} 
        />
      )}
      {femContent && (
        <HomePostSection 
          title={femContent.title} 
          postType="fem" 
          viewAllHref={femLink?.href || "/fem"} 
          viewAllText={femContent.viewAllText} 
        />
      )}
      {sermonsContent && (
        <HomePostSection 
          title={sermonsContent.title} 
          postType="sermons" 
          variant={sermonsContent.variant} 
          viewAllHref={faithLink?.href || "/faith"} 
          viewAllText={sermonsContent.viewAllText} 
        />
      )}
      <HomeSocialSection />
      <HomeJokeSection />
    </div>
  );
}
