import Nav from "../components/nav/Nav";
import Hero from "../components/Hero";
import NFTGrid from "../components/NFTGrid";
import ActionSection from "../components/ActionSection";

export default function Home() {
   return (
      <div className="min-h-screen bg-neutral">
         <Nav />
         <Hero />
         <NFTGrid />
         <ActionSection />
      </div>
   );
}
