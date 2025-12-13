import HeroSection from './components/HeroSection'
import JokeHomeSection from './components/sections/home/JokeHomeSection'

export default function Home() {
  return (
    <div>
      <HeroSection variant="gradient">
        <div className="flow">
          <h1 className="text-4xl lg:text-8xl font-bold">Dav/Devs</h1>
          <p className="lg:text-xl">Designing with purpose. Building with code. Living by faith.</p>
        </div>
      </HeroSection>
      <JokeHomeSection />
    </div>
  );
}
