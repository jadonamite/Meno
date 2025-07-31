'use client';
import { useWeb3Auth } from "../lib/Web3AuthContext";
import Navbar from "../components/nav/Nav";
import ConnectedNavbar from "../components/nav/ConnectedNavbar";
import Hero from "../components/Hero";
import NFTGrid from "../components/NFTGrid";
import ActionSection from "../components/ActionSection";
import CollectionTable from "../components/CollectionTable";
import Footer from "../components/Footer";

export default function Home() {
  const { loggedIn } = useWeb3Auth();

  if (loggedIn) {
    return (
      <div className="min-h-screen bg-neutral">
        <ConnectedNavbar />
        <Hero />
        <CollectionTable />
      </div>
    );
  }

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