"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";
import LoginModal from "./LoginModal";

export default function Header() {
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   return (
      <>
         <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-neutral border-b border-gray-800 relative z-50">
            <Logo />

            <div className="hidden md:flex flex-1 max-w-md mx-8">
               <SearchBar />
            </div>

            <div className="hidden md:flex">
               <NavActions onLoginClick={() => setIsLoginModalOpen(true)} />
            </div>

            {/* Mobile Toggle */}
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
         </header>

         {/* Mobile Menu */}
         <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onLoginClick={() => {
               setIsLoginModalOpen(true);
               setIsMobileMenuOpen(false);
            }}
         />

         {/* Login Modal */}
         <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
         />
      </>
   );
}
