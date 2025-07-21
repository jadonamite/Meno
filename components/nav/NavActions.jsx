
'use client';

import { useWeb3Auth } from "../../lib/Web3AuthContext";
import { useEffect, useState } from "react";

export default function NavActions({ onLoginClick }) {
   const { loggedIn, userInfo, getAccounts } = useWeb3Auth();
   const [userAddress, setUserAddress] = useState('');

   useEffect(() => {
      if (loggedIn) {
         fetchUserAddress();
      }
   }, [loggedIn]);

   const fetchUserAddress = async () => {
      try {
         const accounts = await getAccounts();
         if (accounts && accounts.length > 0) {
            setUserAddress(accounts[0]);
         }
      } catch (error) {
         console.error('Error fetching address:', error);
      }
   };

   const formatAddress = (address) => {
      if (!address) return '';
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
   };

   if (loggedIn) {
      return (
         <button onClick={onLoginClick} className="gradient-button">
            {formatAddress(userAddress) || 'Connected'}
         </button>
      );
   }

   return (
      <button onClick={onLoginClick} className="gradient-button">
         Login
      </button>
   );
}