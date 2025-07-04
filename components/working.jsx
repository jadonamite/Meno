"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero({ enableParallax = true, enableEntrance = true }) {
   const containerRef = useRef(null);
   const { scrollY } = useScroll();

   const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
   const foregroundY = useTransform(scrollY, [0, 500], [0, -100]);

   const entranceVariants = {
      hidden: { opacity: 0, y: 100, scale: 0.95 },
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
         className="relative min-h-screen overflow-hidden bg-[#0e0e0e] text-white flex items-center justify-center px-4 md:px-12">
         {/* Background "AKUMA" Text */}
         <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={enableParallax ? { y: backgroundY } : {}}
            variants={enableEntrance ? backgroundVariants : {}}
            initial={enableEntrance ? "hidden" : "visible"}
            animate="visible">
            <h1 className="text-[9vw] md:text-[11vw] lg:text-[13vw] font-black text-stone-700 uppercase pixel-text leading-none select-none tracking-tighter">
               Akuma
            </h1>
         </motion.div>

         {/* Foreground: Main Image & Bottom Info */}
         <motion.div
            className="relative z-10  w-full gap-10"
            style={enableParallax ? { y: foregroundY } : {}}
            variants={enableEntrance ? entranceVariants : {}}
            initial={enableEntrance ? "hidden" : "visible"}
            animate="visible">
            {/* Character Image */}
            <img
               src="/akuma-characters.png"
               alt="Akuma Collection Characters"
               className="w-full max-w-[70%] object-contain mx-auto"
            />

            {/* CTA & Floor Price */}
            <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl gap-6 sm:gap-0">
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="gradient-button text-black font-semibold px-6 py-3 rounded-lg w-full sm:w-auto">
                  View Collection
               </motion.button>

               <div className="text-center sm:text-right">
                  <p className="text-sm text-gray-400">Floor Price</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                     10 ETH
                  </p>
               </div>
            </div>
         </motion.div>
      </section>
   );
}
