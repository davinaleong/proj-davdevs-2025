import HomeHeroSection from './components/sections/home/HomeHeroSection'
import HomePostSection from './components/sections/home/HomePostSection'
import HomeSocialSection from './components/sections/home/HomeSocialSection'
import HomeJokeSection from './components/sections/home/HomeJokeSection'
import HomeProfessionalSection from './components/sections/home/HomeProfessionalSection'
import { findLinkByLabel, getPostSectionContent } from './utils/site-config'

export default function Home() {
  const portfolioLink = findLinkByLabel("Portfolio");
  const articleLink = findLinkByLabel("Articles");
  const toolsLink = findLinkByLabel("Tools");
  const notebooksLink = findLinkByLabel("Python");
  const knowledgeSharingLink = findLinkByLabel("Knowledge Sharing");
  const femLink = findLinkByLabel("Fem");
  const faithLink = findLinkByLabel("Faith");
  
  const portfolioContent = getPostSectionContent('portfolio');
  const articleContent = getPostSectionContent('articles');
  const toolsContent = getPostSectionContent('tools');
  const notebooksContent = getPostSectionContent('notebooks');
  const knowledgeSharingContent = getPostSectionContent('knowledgeSharing');
  const femContent = getPostSectionContent('fem');
  const sermonsContent = getPostSectionContent('sermons');
  
  return (
    <div>
      <HomeHeroSection />
      <HomeProfessionalSection />
      
      {portfolioContent && (
        <HomePostSection 
          title={portfolioContent.title} 
          postType="projects" 
          variant={portfolioContent.variant} 
          viewAllHref={portfolioLink?.href || "/projects"} 
          viewAllText={portfolioContent.viewAllText} 
        />
      )}
      {articleContent && (
        <HomePostSection 
          title={articleContent.title} 
          postType="articles" 
          variant={articleContent.variant} 
          viewAllHref={articleLink?.href || "/articles"} 
          viewAllText={articleContent.viewAllText} 
        />
      )}
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
      {knowledgeSharingContent && (
        <HomePostSection 
          title={knowledgeSharingContent.title} 
          postType="knowledge-sharing"
          variant={knowledgeSharingContent.variant} 
          viewAllHref={knowledgeSharingLink?.href || "/knowledge-sharing"} 
          viewAllText={knowledgeSharingContent.viewAllText} 
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
