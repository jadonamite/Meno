"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero({ enableParallax = true, enableEntrance = true }) {
   const containerRef = useRef(null);
   const { scrollY } = useScroll();

   const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
   const foregroundY = useTransform(scrollY, [0, 500], [0, -100]);

   const entranceVariants = {
      hidden: { opacity: 0, y: 100, scale: 0.8 },
      visible: {
         opacity: 1,
         y: 0,
         scale: 1,
         transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
         },
      },
   };

   const backgroundVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.8,
            ease: "easeOut",
         },
      },
   };

   return (
      <section
         ref={containerRef}
         className="relative min-h-screen overflow-hidden bg-neutral">
         {/* Background Text with Parallax */}
         <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={enableParallax ? { y: backgroundY } : {}}
            variants={enableEntrance ? backgroundVariants : {}}
            initial={enableEntrance ? "hidden" : "visible"}
            animate="visible">
            <h1 className="text-[12rem] md:text-[20rem] lg:text-[24rem] font-black text-white/5 pixel-text select-none leading-none">
               AKUMA
            </h1>
         </motion.div>

         {/* Foreground Content with Parallax */}
         <motion.div
            className="relative z-10 flex items-center justify-between min-h-screen px-4 md:px-6 lg:px-12"
            style={enableParallax ? { y: foregroundY } : {}}
            variants={enableEntrance ? entranceVariants : {}}
            initial={enableEntrance ? "hidden" : "visible"}
            animate="visible">
            {/* Left Side - Characters */}
            <div className="flex items-center space-x-4 flex-1">
               <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <div className="text-2xl">👦</div>
               </div>
               <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <div className="text-xl">👴</div>
               </div>
               <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                  <div className="text-2xl">👧</div>
               </div>
               <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-xl">🥷</div>
               </div>
            </div>

            {/* Right Side - Collection Info */}
            <div className="text-right">
               <motion.button
                  className="gradient-button mb-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  View Collection
               </motion.button>
               <div>
                  <p className="text-gray-400 text-sm mb-1">Floor Price</p>
                  <p className="text-3xl md:text-4xl font-bold text-white">
                     10 ETH
                  </p>
               </div>
            </div>
         </motion.div>
      </section>
   );
}
