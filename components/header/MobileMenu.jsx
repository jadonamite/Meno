import SearchBar from "./SearchBar";

export default function MobileMenu({ isOpen, onLoginClick, onClose }) {
   if (!isOpen) return null;

   return (
      <div className="absolute top-full left-0 right-0 bg-neutral border-b border-gray-800 md:hidden z-40">
         <div className="p-4 space-y-4">
            <SearchBar />
            <button onClick={onLoginClick} className="gradient-button w-full">
               Login
            </button>
         </div>
      </div>
   );
}
