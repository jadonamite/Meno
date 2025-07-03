"use client";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import Modal from "./Modal";

export default function Header() {
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   return (
      <>
         <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-neutral border-b border-gray-800">
            {/* Logo */}
            <div className="flex items-center">
               <div className="text-2xl font-bold text-menoGreen">meno</div>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
               <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                     type="text"
                     placeholder="Search Collection"
                     className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-menoGreen focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                     CTRL K
                  </span>
               </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
               <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="gradient-button">
                  Login
               </button>
            </div>

            {/* Mobile Menu Button */}
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
               <div className="absolute top-full left-0 right-0 bg-neutral border-b border-gray-800 md:hidden">
                  <div className="p-4 space-y-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                           type="text"
                           placeholder="Search Collection"
                           className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-menoGreen"
                        />
                     </div>
                     <button
                        onClick={() => {
                           setIsLoginModalOpen(true);
                           setIsMobileMenuOpen(false);
                        }}
                        className="gradient-button w-full">
                        Login
                     </button>
                  </div>
               </div>
            )}
         </header>

         <Modal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            title="Login to Meno">
            <div className="space-y-4">
               <p className="text-gray-300">Connect your wallet to continue</p>
               <div className="space-y-3">
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors">
                     Connect MetaMask
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors">
                     Connect WalletConnect
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors">
                     Connect Coinbase Wallet
                  </button>
               </div>
            </div>
         </Modal>
      </>
   );
}
