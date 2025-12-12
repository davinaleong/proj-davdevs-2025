export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dav/Devs</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Click the menu button in the header to open the sliding navigation menu.
      </p>
      <div className="mt-8 space-y-4">
        <p>This is the home page content. The header and menu are now part of the layout and will be available on all pages.</p>
        <p>Navigate to different sections using the menu to see how it persists across pages.</p>
      </div>
    </div>
  );
}
