"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Nav({ onLoginClick }) {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   return (
      <nav className="flex items-center justify-between w-full px-4 md:px-10 py-4 bg-neutral-950 border-b border-gray-800 z-50 relative">
         <Logo />

         {/* Search */}
         <div className="hidden md:flex flex-2 justify-center max-w-lg">
            <SearchBar />
         </div>

         {/* Actions */}
         <div className="flex items-center gap-4">
            <button
               className="hidden md:inline-block bg-menoGreen text-black font-semibold px-4 py-2 rounded-lg hover:bg-green-400 transition"
               onClick={onLoginClick}>
               Login
            </button>

            {/* Mobile Menu Icon */}
            <button
               className="md:hidden"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               aria-label="Toggle menu">
               {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
               ) : (
                  <Menu className="w-6 h-6" />
               )}
            </button>
         </div>
      </nav>
   );
}
