import { Search } from "lucide-react"

export default function Home() {
  return (
    <div>
      <form className="flex items-center gap-2 bg-white dark:bg-blue-100 rounded-sm overflow-hidden">
        <label htmlFor="input-search">Search</label>
        <input type="text" id="input-search" className="flex-1"/>
        <Search size={16} />
      </form>
    </div>
  );
}
