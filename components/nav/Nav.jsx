"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";
import LoginModal from "./LoginModal";
import { useModal } from "../../hooks/useModal";

export default function Nav() {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const { isOpen, openModal, closeModal } = useModal();

   return (
      <nav className="flex items-center justify-between w-full px-4 md:px-10 py-4 bg-neutral-950 border-b border-gray-800 z-50 relative">
         <Logo />

         <div className="hidden md:flex flex-grow justify-center md:w-[40vw] xl_custom:w-[60vw]">
            <SearchBar />
         </div>

         <div className="flex items-center gap-4">
            <NavActions onLoginClick={openModal} />

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

         <LoginModal isOpen={isOpen} onClose={closeModal} />
      </nav>
   );
}
