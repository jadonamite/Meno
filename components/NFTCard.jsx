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
         className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors group">
         {/* Collection Image */}
         <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-4xl">
            {collection.emoji}
         </div>

         {/* Collection Info */}
         <div className="p-4">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-white">
                     {collection.name}
                  </h3>
                  {collection.verified && (
                     <div className="w-4 h-4 bg-verifyGreen rounded-full flex items-center justify-center">
                        <span className="text-black text-xs">✓</span>
                     </div>
                  )}
               </div>
            </div>

            <div className="flex items-center justify-between mb-4">
               <div>
                  <p className="text-sm text-gray-400">Floor</p>
                  <p className="font-medium text-white">
                     {formatPrice(collection.floorPrice, showFiat)}
                  </p>
               </div>
               <div className="text-right">
                  <p className="text-sm text-gray-400">24h</p>
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

            <button className="w-full py-2 bg-verifyGreen text-black font-semibold rounded-lg hover:bg-green-400 transition-colors">
               View Collection
            </button>
         </div>
      </motion.div>
   );
}
