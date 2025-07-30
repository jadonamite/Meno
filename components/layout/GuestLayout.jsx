import Nav from "../nav/Nav";
import NFTGrid from "../NFTGrid";
import ActionSection from "../ActionSection";
import Footer from "../Footer";

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral">
      <Nav />
      <main>{children}</main>
      <NFTGrid />
      <ActionSection />
      <Footer />
    </div>
  );
}