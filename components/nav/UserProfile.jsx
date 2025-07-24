"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Wallet, LogOut, Copy, Check } from "lucide-react";
import { useWeb3Auth } from "../../lib/Web3AuthContext";

export default function UserProfile({ className = "" }) {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [copied, setCopied] = useState(false);
   const dropdownRef = useRef(null);
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
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setIsDropdownOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const handleLogout = async () => {
      setIsDropdownOpen(false);
      if (logout) {
         await logout();
      }
   };

   return (
      <div className={`relative ${className}`} ref={dropdownRef}>
         <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 gradient-button text-black font-semibold px-6 py-3 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-0">
            <Wallet className="w-4 h-4" />
            <span>{formatAddress(accounts[0]) || "Connected"}</span>
            <ChevronDown
               className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
               }`}
            />
         </button>

         {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 backdrop-blur-md bg-white/10 border border-white/20 ring-1 ring-white/10 rounded-xl shadow-2xl py-2 z-50 transition-all duration-200">
               {/* User Info Section */}
               <div className="px-4 py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                     </div>
                     <div>
                        <p className="text-white font-medium text-sm">
                           Wallet Connected
                        </p>
                        <p className="text-gray-300 text-xs">
                           {formatAddress(accounts[0])}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Copy Address */}
               <button
                  onClick={copyAddress}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors">
                  {copied ? (
                     <Check className="w-4 h-4 text-green-500" />
                  ) : (
                     <Copy className="w-4 h-4 text-gray-300" />
                  )}
                  <span className="text-white text-sm">
                     {copied ? "Copied!" : "Copy Address"}
                  </span>
               </button>

               {/* Divider */}
               <hr className="border-white/10 my-2" />

               {/* My Profile */}
               <button className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors">
                  <User className="w-4 h-4 text-gray-300" />
                  <span className="text-white text-sm">My Profile</span>
               </button>

               {/* My Collections */}
               <button className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors">
                  <Wallet className="w-4 h-4 text-gray-300" />
                  <span className="text-white text-sm">My Collections</span>
               </button>

               {/* Divider */}
               <hr className="border-white/10 my-2" />

               {/* Logout */}
               <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-red-500/10 transition-colors text-red-400 hover:text-red-300">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Disconnect</span>
               </button>
            </div>
         )}
      </div>
   );
}
