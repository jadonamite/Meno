import Image from "next/image"; // 1. Import the Image component

export default function Logo() {
   return (
      <Image
         src="/meno.svg"
         alt="Meno Logo"
         width={150} //  intrinsic width of  SVG (adjust as needed)
         height={80} //  intrinsic height of  SVG (adjust as needed)
         // className="h-10 w-auto"
      />
   );
}
