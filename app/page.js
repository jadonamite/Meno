import Nav from "../components/nav/Nav";
import Hero from "../components/Hero";
import NFTGrid from "../components/NFTGrid";
import ActionSection from "../components/ActionSection";
import CollectionTable from "../components/CollectionTable";
import Footer from "../components/Footer";

export default function Home() {
   return (
      <div className="min-h-screen bg-neutral">
         <Nav />
         <Hero />
         <CollectionTable />
         <NFTGrid />
         <ActionSection />
         <Footer />
      </div>
   );
}
