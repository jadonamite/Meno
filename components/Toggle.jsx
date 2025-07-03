"use client";
export default function Toggle({ label, checked, onChange }) {
   return (
      <div className="flex items-center space-x-2">
         <span className="text-sm text-gray-400">{label}</span>
         <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-menoGreen focus:ring-offset-2 focus:ring-offset-neutral ${
               checked ? "bg-menoGreen" : "bg-gray-600"
            }`}
            role="switch"
            aria-checked={checked}
            aria-label={`Toggle ${label}`}>
            <span
               className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  checked ? "translate-x-6" : "translate-x-1"
               }`}
            />
         </button>
      </div>
   );
}
