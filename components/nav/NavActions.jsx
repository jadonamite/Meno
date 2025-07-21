"use client";

import { useWeb3Auth } from "../../lib/Web3AuthContext";
import { useEffect, useState } from "react";

export default function NavActions({ onLoginClick }) {
   const { loggedIn, userInfo, getAccounts } = useWeb3Auth();
   const [userAddress, setUserAddress] = useState("");

   useEffect(() => {
      if (loggedIn && !userAddress) {
         fetchUserAddress();
      }
   }, [loggedIn, userAddress]);

   const fetchUserAddress = async () => {
      try {
         const accounts = await getAccounts();
         if (accounts && accounts.length > 0) {
            setUserAddress(accounts[0]);
         }
      } catch (error) {
         console.error("Error fetching address:", error);
      }
   };

   const formatAddress = (address) => {
      if (!address) return "";
      return `${address.substring(0, 6)}...${address.substring(
         address.length - 4
      )}`;
   };

   return (
      <button onClick={onLoginClick} className="gradient-button">
         {loggedIn ? formatAddress(userAddress) || "Connected" : "Login"}
      </button>
   );
}
