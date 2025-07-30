import ConnectedNavbar from "../nav/ConnectedNavbar";

export default function ConnectedLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral">
      <ConnectedNavbar />
      <main>{children}</main>
    </div>
  );
}