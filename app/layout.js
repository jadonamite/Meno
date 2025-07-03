import "./globals.css";

export const metadata = {
   title: "Meno - NFT Marketplace",
   description: "Off-ramp NFT to Fiat seamlessly",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className="bg-violet-400 text-white">{children}</body>
      </html>
   );
}
