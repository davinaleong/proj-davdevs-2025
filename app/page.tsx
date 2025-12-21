import HomeHeroSection from './components/sections/home/HomeHeroSection'
import HomePostSection from './components/sections/home/HomePostSection'
import HomeSocialSection from './components/sections/home/HomeSocialSection'
import HomeJokeSection from './components/sections/home/HomeJokeSection'
import HomeProfessionalSection from './components/sections/home/HomeProfessionalSection'
import { SlideUpOnScroll } from './components/animations'
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
      <SlideUpOnScroll>
        <HomeHeroSection />
      </SlideUpOnScroll>
      <SlideUpOnScroll>
        <HomeProfessionalSection />
      </SlideUpOnScroll>
      
      {portfolioContent && (
        <SlideUpOnScroll>
          <HomePostSection 
            title={portfolioContent.title} 
            postType="projects" 
            variant={portfolioContent.variant} 
            viewAllHref={portfolioLink?.href || "/projects"} 
            viewAllText={portfolioContent.viewAllText} 
          />
        </SlideUpOnScroll>
      )}
      {articleContent && (
        <SlideUpOnScroll>
          <HomePostSection 
            title={articleContent.title} 
            postType="articles" 
            variant={articleContent.variant} 
            viewAllHref={articleLink?.href || "/articles"} 
            viewAllText={articleContent.viewAllText} 
          />  
        </SlideUpOnScroll>
      )}
      {toolsContent && (
        <SlideUpOnScroll>
          <HomePostSection 
            title={toolsContent.title} 
            postType="tools" 
            variant={toolsContent.variant} 
            viewAllHref={toolsLink?.href || "/tools"} 
            viewAllText={toolsContent.viewAllText} 
          />
        </SlideUpOnScroll>
      )}
      {notebooksContent && (
        <SlideUpOnScroll>
          <HomePostSection 
            title={notebooksContent.title} 
            postType="notebooks" 
            variant={notebooksContent.variant} 
            viewAllHref={notebooksLink?.href || "/notebooks"} 
            viewAllText={notebooksContent.viewAllText} 
          />
        </SlideUpOnScroll>
      )}
      {knowledgeSharingContent && (
        <SlideUpOnScroll>
          <HomePostSection 
            title={knowledgeSharingContent.title} 
            postType="knowledge-sharing"
            variant={knowledgeSharingContent.variant} 
            viewAllHref={knowledgeSharingLink?.href || "/knowledge-sharing"} 
            viewAllText={knowledgeSharingContent.viewAllText} 
          />
        </SlideUpOnScroll>
      )}
      {femContent && (
        <SlideUpOnScroll>
          <HomePostSection 
            title={femContent.title} 
            postType="fem"
            variant={femContent.variant} 
            viewAllHref={femLink?.href || "/fem"} 
            viewAllText={femContent.viewAllText} 
          />
        </SlideUpOnScroll>
      )}
      {sermonsContent && (
        <SlideUpOnScroll>
          <HomePostSection 
            title={sermonsContent.title} 
            postType="sermons" 
            variant={sermonsContent.variant} 
            viewAllHref={faithLink?.href || "/faith"} 
            viewAllText={sermonsContent.viewAllText} 
          />
        </SlideUpOnScroll>
      )}
      <SlideUpOnScroll>
        <HomeSocialSection />
      </SlideUpOnScroll>
      <SlideUpOnScroll>
        <HomeJokeSection />
      </SlideUpOnScroll>
    </div>
  );
}
