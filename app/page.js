'use client';
import { useWeb3Auth } from "../lib/Web3AuthContext";
import Hero from "../components/Hero";
import CollectionTable from "../components/CollectionTable";
import GuestLayout from "../components/layout/GuestLayout";
import ConnectedLayout from "../components/layout/ConnectedLayout";
import DashboardOverview from "../components/DashboardOverview";

export default function Home() {
  const { loggedIn } = useWeb3Auth();

  if (loggedIn) {
    return (
      <ConnectedLayout>
        <DashboardOverview />
      </ConnectedLayout>
    );
  }

  return (
    <GuestLayout>
      <Hero />
      <CollectionTable />
    </GuestLayout>
  );
}