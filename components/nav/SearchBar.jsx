import { Search } from "lucide-react";

export default function SearchBar() {
   return (
      <div className="relative w-full ">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
         <input
            type="text"
            placeholder="Search Collection"
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-menoGreen"
         />
         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            CTRL K
         </span>
      </div>
   );
}
