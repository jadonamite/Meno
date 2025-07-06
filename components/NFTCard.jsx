"use client";
import { motion } from "framer-motion";
import { formatPrice } from "../lib/utils";

export default function NFTCard({ collection, showFiat }) {
   const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.5 },
      },
   };

   return (
      <motion.div
         variants={cardVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true }}
         className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 group border border-gray-800 flex">
         {/* Collection Image */}
         <div className="w-36  bg-gray-800 flex items-center justify-center p-4 flex-shrink-0 overflow-hidden">
            {collection.image ? (
               <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-150"
               />
            ) : (
               <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-150">
                  <span className="text-white font-bold text-lg">
                     {collection.name?.charAt(0)}
                  </span>
               </div>
            )}
         </div>

         {/* Collection Info */}
         <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
               <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-white text-base">
                     {collection.name}
                  </h3>
                  {collection.verified && (
                     <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">✓</span>
                     </div>
                  )}
               </div>

               <div className="flex items-center justify-between text-sm">
                  <div>
                     <p className="text-gray-400 text-xs">Volume</p>
                     <p className="font-medium text-white">
                        {collection.volume} ETH
                     </p>
                  </div>
                  <div className="text-right">
                     <p className="text-gray-400 text-xs">24h</p>
                     <p
                        className={`font-medium ${
                           collection.change24h >= 0
                              ? "text-green-400"
                              : "text-red-400"
                        }`}>
                        {collection.change24h >= 0 ? "+" : ""}
                        {collection.change24h}%
                     </p>
                  </div>
               </div>
            </div>

            <button className="w-full py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors text-sm">
               View Collection
            </button>
         </div>
      </motion.div>
   );
}
