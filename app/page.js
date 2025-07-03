import Header from "../components/Header";
import Hero from "../components/Hero";
import NFTGrid from "../components/NFTGrid";
import ActionSection from "../components/ActionSection";

export default function Home() {
   return (
      <div className="min-h-screen bg-neutral">
         <Header />
         <Hero />
         <NFTGrid />
         <ActionSection />
      </div>
   );
}
