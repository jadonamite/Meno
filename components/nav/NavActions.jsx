"use client";

import { useWeb3Auth } from "../../lib/Web3AuthContext";

export default function NavActions({ onLoginClick }) {
   const { loggedIn, accounts } = useWeb3Auth();

   const formatAddress = (address) => {
      if (!address) return "";
      return `${address.substring(0, 6)}...${address.substring(
         address.length - 4
      )}`;
   };

   return (
      <button onClick={onLoginClick} className="gradient-button">
         {loggedIn ? formatAddress(accounts[0]) || "Connected" : "Login"}
      </button>
   );
}
