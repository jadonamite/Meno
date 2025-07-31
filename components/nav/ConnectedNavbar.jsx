"use client";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import UserProfileModal from "./UserProfileModal";
import MobileSearchOverlay from "./MobileSearchOverlay";

export default function ConnectedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between w-full px-4 md:px-10 py-4 bg-neutral-950 border-b border-gray-800 z-50 relative">
        <Logo />
        
        {/* Desktop Search */}
        <div className="hidden md:flex justify-center md:w-[40vw] xl_custom:w-[63vw]">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop User Profile */}
          <UserProfile className="hidden md:block" />

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay 
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />

      {/* Mobile User Profile Modal */}
      <UserProfileModal 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}