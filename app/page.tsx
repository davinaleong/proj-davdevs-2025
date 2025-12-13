import Card from './components/Card'

export default function Home() {
  return (
    <div>
      <Card 
        title="Sample Card"
        description="This is a sample card description."
      featured={true}
      />
    </div>
  );
}
