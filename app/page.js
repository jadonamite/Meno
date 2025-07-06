import Nav from "../components/nav/Nav";
import Hero from "../components/Hero";
import NFTGrid from "../components/NFTGrid";
import ActionSection from "../components/ActionSection";
import CollectionTable from "../components/CollectionTable";

export default function Home() {
   return (
      <div className="min-h-screen bg-neutral">
         <Nav />
         <Hero />
         <CollectionTable />
         <CollectionTable showFiat={true} />
         <NFTGrid />
         <ActionSection />
      </div>
   );
}
