"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, User, Wallet, LogOut, Copy, Check, X, Search, Heart, Activity, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWeb3Auth } from "../../lib/Web3AuthContext";

export default function UserProfile({ className = "" }) {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [copied, setCopied] = useState(false);
   const [isExploreOpen, setIsExploreOpen] = useState(false);
   const modalRef = useRef(null);
   const router = useRouter();
   const { accounts, logout, getUserInfo } = useWeb3Auth();

   const formatAddress = (address) => {
      if (!address) return "";
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
   };

   const copyAddress = async () => {
      if (accounts[0]) {
         await navigator.clipboard.writeText(accounts[0]);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalOpen(false);
         }
      };

      const handleEscapeKey = (event) => {
         if (event.key === 'Escape') {
            setIsModalOpen(false);
         }
      };

      if (isModalOpen) {
         document.addEventListener("mousedown", handleClickOutside);
         document.addEventListener("keydown", handleEscapeKey);
         document.body.style.overflow = 'hidden';
      }

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
         document.removeEventListener("keydown", handleEscapeKey);
         document.body.style.overflow = 'unset';
      };
   }, [isModalOpen]);

   const handleLogout = async () => {
      setIsModalOpen(false);
      if (logout) {
         await logout();
      }
   };

   const navigateTo = (path) => {
      setIsModalOpen(false);
      router.push(path);
   };

   const exploreSubItems = [
      { icon: Wallet, label: "Portfolio", path: "/portfolio" },
      { icon: User, label: "NFTs", path: "/nfts" },
      { icon: Heart, label: "Favourites", path: "/favourites" },
   ];

   const mainMenuItems = [
      { icon: Activity, label: "Activities", path: "/activities" },
      { icon: Settings, label: "Profile", path: "/profile" },
   ];

   return (
      <>
         <div className={`relative ${className}`}>
            <button
               onClick={() => setIsModalOpen(!isModalOpen)}
               className="flex items-center gap-2 gradient-button text-black font-semibold px-6 py-3 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-0">
               <Wallet className="w-4 h-4" />
               <span>{formatAddress(accounts[0]) || "Connected"}</span>
               <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                     isModalOpen ? "rotate-180" : ""
                  }`}
               />
            </button>
         </div>

         {/* Modal Overlay */}
         {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-start">
               <div 
                  ref={modalRef}
                  className={`w-full max-w-sm md:w-[30vw] h-[90vh] ml-[30px] bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out ${
                     isModalOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                  }`}
                  style={{
                     animation: isModalOpen ? 'slideInFromLeft 0.3s ease-out' : 'slideOutToLeft 0.3s ease-in'
                  }}
               >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                           <span className="text-white font-bold text-sm">
                              {accounts[0] ? accounts[0].slice(2, 4).toUpperCase() : "U"}
                           </span>
                        </div>
                        <span className="text-white font-medium">My Account</span>
                     </div>
                     <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                     >
                        <X className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 py-4 overflow-y-auto">
                     {/* Explore Section with Collapsible Sub-items */}
                     <div>
                        <button
                           onClick={() => setIsExploreOpen(!isExploreOpen)}
                           className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white"
                        >
                           <div className="flex items-center gap-4">
                              <Search className="w-5 h-5" />
                              <span className="text-base font-normal">Explore</span>
                           </div>
                           <ChevronRight className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-90' : ''}`} />
                        </button>
                        
                        {/* Explore Sub-items */}
                        <div className={`overflow-hidden transition-all duration-200 ${isExploreOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                           {exploreSubItems.map((item, index) => (
                              <button
                                 key={index}
                                 onClick={() => navigateTo(item.path)}
                                 className="w-full px-6 py-3 text-left flex items-center gap-4 hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white ml-6"
                              >
                                 <item.icon className="w-4 h-4" />
                                 <span className="text-sm font-normal">{item.label}</span>
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Main Menu Items */}
                     {mainMenuItems.map((item, index) => (
                        <button
                           key={index}
                           onClick={() => navigateTo(item.path)}
                           className="w-full px-6 py-4 text-left flex items-center gap-4 hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white"
                        >
                           <item.icon className="w-5 h-5" />
                           <span className="text-base font-normal">{item.label}</span>
                        </button>
                     ))}
                  </div>

                  {/* Wallet Info Section */}
                  <div className="p-6 border-t border-gray-700/50 space-y-4">
                     <div className="text-sm text-gray-400 mb-2">Connected wallet</div>
                     
                     {/* Wallet Address with Copy */}
                     <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                              <Wallet className="w-4 h-4 text-white" />
                           </div>
                           <div>
                              <div className="text-white font-medium text-sm">Ethereum</div>
                              <div className="text-gray-400 text-xs">{formatAddress(accounts[0])}</div>
                           </div>
                        </div>
                        <button
                           onClick={copyAddress}
                           className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                        >
                           {copied ? (
                              <Check className="w-4 h-4 text-green-500" />
                           ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                           )}
                        </button>
                     </div>

                     {/* Balance Display */}
                     <div className="space-y-2">
                        <div className="flex items-center justify-between">
                           <span className="text-sm text-gray-400">💎 0.0002 ETH</span>
                           <span className="text-sm text-gray-400">$0.602</span>
                        </div>
                     </div>

                     {/* Action Buttons */}
                     <div className="flex gap-3 mt-4">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                           Buy NFTs
                        </button>
                        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                           Sell NFTs
                        </button>
                     </div>

                     {/* Disconnect Button */}
                     <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 py-3 hover:bg-red-500/10 rounded-lg transition-colors mt-4"
                     >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Disconnect</span>
                     </button>
                  </div>
               </div>
            </div>
         )}

         <style jsx>{`
            @keyframes slideInFromLeft {
               from {
                  transform: translateX(-100%);
                  opacity: 0;
               }
               to {
                  transform: translateX(0);
                  opacity: 1;
               }
            }
            
            @keyframes slideOutToLeft {
               from {
                  transform: translateX(0);
                  opacity: 1;
               }
               to {
                  transform: translateX(-100%);
                  opacity: 0;
               }
            }
         `}</style>
      </>
   );
}