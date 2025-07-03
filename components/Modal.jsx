"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }

      return () => {
         document.body.style.overflow = "unset";
      };
   }, [isOpen]);

   useEffect(() => {
      const handleEscape = (e) => {
         if (e.key === "Escape") {
            onClose();
         }
      };

      if (isOpen) {
         document.addEventListener("keydown", handleEscape);
      }

      return () => {
         document.removeEventListener("keydown", handleEscape);
      };
   }, [isOpen, onClose]);

   return (
      <AnimatePresence>
         {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
               {/* Backdrop */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
               />

               {/* Modal */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-800">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-semibold text-white">
                        {title}
                     </h2>
                     <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                        aria-label="Close modal">
                        <X className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Content */}
                  {children}
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
}
