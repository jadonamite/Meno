"use client";
export default function Pagination({ currentPage, totalPages, onPageChange }) {
   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

   return (
      <div className="flex justify-center items-center space-x-2">
         {pages.map((page) => (
            <button
               key={page}
               onClick={() => onPageChange(page)}
               className={`w-8 h-8 rounded-full font-medium transition-colors ${
                  currentPage === page
                     ? "bg-menoGreen text-black"
                     : "bg-gray-800 text-gray-300 hover:bg-gray-700"
               }`}>
               {page}
            </button>
         ))}
      </div>
   );
}
