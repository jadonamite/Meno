"use client";
import { useWeb3Auth } from "../../lib/Web3AuthContext";

export default function LoginButton({ className = "" }) {
   const { login } = useWeb3Auth();

   return (
      <button
         onClick={login}
         className={`gradient-button text-black font-semibold px-9 py-3 rounded-md transition transform hover:scale-105 ${className}`}>
         Connect Wallet
      </button>
   );
}
