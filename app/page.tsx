import HomeHeroSection from './components/sections/home/HomeHeroSection'
import HomePostSection from './components/sections/home/HomePostSection'
import HomeSocialSection from './components/sections/home/HomeSocialSection'
import HomeJokeSection from './components/sections/home/HomeJokeSection'
import HomeProfessionalSection from './components/sections/home/HomeProfessionalSection'
import HomeKnowledgeSharingSection from './components/sections/home/HomeKnowledgeSharingSection'
import { findLinkByLabel, getPostSectionContent } from './utils/site-config'

export default function Home() {
  const toolsLink = findLinkByLabel("Tools");
  const notebooksLink = findLinkByLabel("Python");
  const femLink = findLinkByLabel("Fem");
  const faithLink = findLinkByLabel("Faith");
  
  const toolsContent = getPostSectionContent('tools');
  const notebooksContent = getPostSectionContent('notebooks');
  const femContent = getPostSectionContent('fem');
  const sermonsContent = getPostSectionContent('sermons');
  
  return (
    <div>
      <HomeHeroSection />
      <HomeProfessionalSection />
      {toolsContent && (
        <HomePostSection 
          title={toolsContent.title} 
          postType="tools" 
          variant={toolsContent.variant} 
          viewAllHref={toolsLink?.href || "/tools"} 
          viewAllText={toolsContent.viewAllText} 
        />
      )}
      {notebooksContent && (
        <HomePostSection 
          title={notebooksContent.title} 
          postType="notebooks" 
          variant={notebooksContent.variant} 
          viewAllHref={notebooksLink?.href || "/notebooks"} 
          viewAllText={notebooksContent.viewAllText} 
        />
      )}
      {femContent && (
        <HomePostSection 
          title={femContent.title} 
          postType="fem"
          variant={femContent.variant} 
          viewAllHref={femLink?.href || "/fem"} 
          viewAllText={femContent.viewAllText} 
        />
      )}
      <HomeKnowledgeSharingSection/>
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
