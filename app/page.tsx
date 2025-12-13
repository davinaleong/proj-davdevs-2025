import HomeHeroSection from './components/sections/home/HomeHeroSection'
import HomePostSection from './components/sections/home/HomePostSection'
import HomeSocialSection from './components/sections/home/HomeSocialSection'
import HomeJokeSection from './components/sections/home/HomeJokeSection'

export default function Home() {
  return (
    <div>
      <HomeHeroSection />
      <HomePostSection title="Latest Sermons" postType="sermons" variant="primary" viewAllHref="/sermons" viewAllText="View All Sermons" />
      <HomeSocialSection />
      <HomeJokeSection />
    </div>
  );
}
