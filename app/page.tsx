import HomeHeroSection from './components/sections/home/HomeHeroSection'
import HomePostSection from './components/sections/home/HomePostSection'
import HomeSocialSection from './components/sections/home/HomeSocialSection'
import HomeJokeSection from './components/sections/home/HomeJokeSection'
import { findLinkByLabel } from './utils/links'

export default function Home() {
  const faithLink = findLinkByLabel("Faith");
  
  return (
    <div>
      <HomeHeroSection />
      <HomePostSection title="Messages of Faith 🙏✨" postType="sermons" variant="primary" viewAllHref={faithLink?.href || "/faith"} viewAllText="View All Sermons" />
      <HomeSocialSection />
      <HomeJokeSection />
    </div>
  );
}
