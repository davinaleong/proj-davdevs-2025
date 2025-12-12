import Image from 'next/image'
import Placeholder from './assets/images/placeholder.svg'

export default function Home() {
  return (
    <div>
      <article className="max-w-sm bg-gray-100 dark:bg-slate-900 border border-blue-500 rounded-sm shadow-md overflow-hidden">
        <div className="text-white bg-blue-500 text-sm">Featured</div>
        <header className="p-2">
          <h4 className="text-lg font-bold">Card Title</h4>
          <p>Card description goes here.</p>
        </header>
        <Image src={Placeholder} alt="Placeholder Image" width={600} height={400} className="w-full object-cover aspect-video" />
        <div className="p-2 flow">
          <p>Simple, smart tools for everyday tasks and creative projects.</p>
        </div>
        <footer className="p-2">
          <span className="text-sm text-gray-600">Footer Information</span>
        </footer>
      </article>
    </div>
  );
}
