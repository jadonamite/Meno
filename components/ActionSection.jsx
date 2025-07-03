"use client";
import { motion } from "framer-motion";

export default function ActionSection() {
   const actions = [
      {
         title: "Buy",
         description: "Mint NFTs from your favourite collections",
         icon: "💰",
         color: "from-blue-500 to-cyan-500",
      },
      {
         title: "Sell",
         description: "Sell into native tokens",
         icon: "💎",
         color: "from-green-500 to-emerald-500",
      },
      {
         title: "Off-Ramp",
         description: "Authorize off ramp to your desired fiat currency",
         icon: "🏦",
         color: "from-purple-500 to-pink-500",
      },
   ];

   return (
      <section className="px-4 md:px-6 lg:px-12 py-16">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-menoGreen pixel-text mb-4">
               OFF-RAMP NFT TO FIAT SEAMLESSLY
            </h2>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actions.map((action, index) => (
               <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center">
                  <div
                     className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-4xl shadow-lg`}>
                     {action.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                     {action.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                     {action.description}
                  </p>
               </motion.div>
            ))}
         </div>
      </section>
   );
}
