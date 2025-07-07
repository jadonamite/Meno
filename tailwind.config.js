// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            // Custom brand colors
            neutral: "#111111",
            menoGreen: "#00FF85",
            verifyGreen: "#00FF00",

            // Gradient colors for buttons
            btnGradientStart: "#00e676",
            btnGradientEnd: "#00ffb3",

            // Additional utility colors
            "gray-850": "#1f2937",
            "gray-925": "#0f172a",
         },
         fontFamily: {
            pixel: ["Artpast", "monospace"],
            sans: ["Inter", "sans-serif"],
         },
         animation: {
            "fade-in": "fadeIn 0.5s ease-in-out",
            "slide-up": "slideUp 0.3s ease-out",
         },
         keyframes: {
            fadeIn: {
               "0%": { opacity: "0" },
               "100%": { opacity: "1" },
            },
            slideUp: {
               "0%": { transform: "translateY(20px)", opacity: "0" },
               "100%": { transform: "translateY(0)", opacity: "1" },
            },
         },
         screens: {
            // Add your custom breakpoint
            xl_custom: "1000px", // You can name it whatever you like, e.g., 'lg_desktop'
         },
      },
   },
   plugins: [],
};
