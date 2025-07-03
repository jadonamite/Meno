"use client";
import { useState } from "react";
import NFTCard from "./NFTCard";
import Toggle from "./Toggle";
import Pagination from "./Pagination";
import { nftCollections } from "../data/nfts";

export default function NFTGrid() {
   const [activeFilter, setActiveFilter] = useState("All");
   const [showFiat, setShowFiat] = useState(false);
   const [activeTimeFilter, setActiveTimeFilter] = useState("1D");
   const [currentPage, setCurrentPage] = useState(1);

   const filters = ["All", "Top", "Rare"];
   const timeFilters = ["6h", "12h", "1D", "7D", "30D"];
   const itemsPerPage = 6;

   const filteredCollections = nftCollections.filter((collection) => {
      if (activeFilter === "All") return true;
      return collection.category === activeFilter.toLowerCase();
   });

   const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const displayedCollections = filteredCollections.slice(
      startIndex,
      startIndex + itemsPerPage
   );

   return (
      <section className="px-4 md:px-6 lg:px-12 py-16">
         {/* Filter Controls */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            {/* Category Filters */}
            <div className="flex items-center space-x-6">
               <div className="flex items-center space-x-4">
                  {filters.map((filter) => (
                     <button
                        key={filter}
                        onClick={() => {
                           setActiveFilter(filter);
                           setCurrentPage(1);
                        }}
                        className={`text-lg font-medium transition-colors ${
                           activeFilter === filter
                              ? "text-menoGreen"
                              : "text-gray-400 hover:text-white"
                        }`}>
                        {filter}
                     </button>
                  ))}
               </div>
            </div>

            {/* Price Toggle and Time Filters */}
            <div className="flex items-center space-x-6">
               <Toggle label="FIAT" checked={showFiat} onChange={setShowFiat} />

               <div className="flex items-center space-x-2">
                  {timeFilters.map((time) => (
                     <button
                        key={time}
                        onClick={() => setActiveTimeFilter(time)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                           activeTimeFilter === time
                              ? "bg-menoGreen text-black"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}>
                        {time}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* NFT Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedCollections.map((collection) => (
               <NFTCard
                  key={collection.id}
                  collection={collection}
                  showFiat={showFiat}
               />
            ))}
         </div>

         {/* Pagination */}
         <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
         />
      </section>
   );
}
