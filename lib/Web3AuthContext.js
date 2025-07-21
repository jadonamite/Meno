"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import {
   CHAIN_NAMESPACES,
   WEB3AUTH_NETWORK,
   ADAPTER_EVENTS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const Web3AuthContext = createContext();

export const useWeb3Auth = () => {
   const context = useContext(Web3AuthContext);
   if (!context) {
      throw new Error("useWeb3Auth must be used within Web3AuthProvider");
   }
   return context;
};

const clientId =
   process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID ||
   "BHgArYmWwSeq21czpcarYh0EVq2WWOzflX-NTK-tY1-1pauPzHKRRLgpABkmYiIV_og9jAvoIxQ8L3Smrwe04Lw";

const chainConfig = {
   chainNamespace: CHAIN_NAMESPACES.EIP155,
   chainId: "0x1",
   rpcTarget: "https://rpc.ankr.com/eth",
   displayName: "Ethereum Mainnet",
   blockExplorerUrl: "https://etherscan.io",
   ticker: "ETH",
   tickerName: "Ethereum",
   logo: "https://images.toruswallet.io/ethereum.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
   config: { chainConfig },
});

export const Web3AuthProvider = ({ children }) => {
   const [web3auth, setWeb3auth] = useState(null);
   const [provider, setProvider] = useState(null);
   const [loggedIn, setLoggedIn] = useState(false);
   const [loading, setLoading] = useState(true);
   const [userInfo, setUserInfo] = useState(null);

   useEffect(() => {
      const init = async () => {
         try {
            const web3authInstance = new Web3Auth({
               clientId,
               web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
               chainConfig,
               privateKeyProvider,
               uiConfig: {
                  appName: "Meno NFT Marketplace",
                  mode: "dark",
                  logoLight: "https://web3auth.io/images/web3authlog.png",
                  logoDark: "https://web3auth.io/images/web3authlogodark.png",
                  defaultLanguage: "en",
                  loginGridCol: 3,
                  primaryButton: "externalLogin",
               },
            });

            setWeb3auth(web3authInstance);

            await web3authInstance.init();

            // If user is already connected (auto-login), set session
            if (web3authInstance.status === "CONNECTED") {
               setProvider(web3authInstance.provider);
               setLoggedIn(true);
               const user = await web3authInstance.getUserInfo();
               setUserInfo(user);
            }

            // Optional: Listen to events
            web3authInstance.on(ADAPTER_EVENTS.CONNECTED, async (data) => {
               setProvider(web3authInstance.provider);
               setLoggedIn(true);
               const user = await web3authInstance.getUserInfo();
               setUserInfo(user);
            });

            web3authInstance.on(ADAPTER_EVENTS.DISCONNECTED, () => {
               setProvider(null);
               setLoggedIn(false);
               setUserInfo(null);
            });
         } catch (error) {
            console.error("Web3Auth initialization failed:", error);
         } finally {
            setLoading(false);
         }
      };

      init();
   }, []);

   const login = async () => {
      if (!web3auth) return;

      try {
         const web3authProvider = await web3auth.connectModal(); // ✅ Correct method for Modal SDK
         setProvider(web3authProvider);
         setLoggedIn(true);

         const user = await web3auth.getUserInfo();
         setUserInfo(user);
      } catch (error) {
         console.error("Login failed:", error);
      }
   };

   const logout = async () => {
      if (!web3auth) return;

      try {
         await web3auth.logout();
         setProvider(null);
         setLoggedIn(false);
         setUserInfo(null);
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   const getAccounts = async () => {
      if (!provider) return [];

      try {
         const accounts = await provider.request({
            method: "eth_accounts",
         });
         return accounts;
      } catch (error) {
         console.error("Failed to get accounts:", error);
         return [];
      }
   };

   const getBalance = async () => {
      if (!provider) return "0";

      try {
         const accounts = await getAccounts();
         if (accounts.length > 0) {
            const balance = await provider.request({
               method: "eth_getBalance",
               params: [accounts[0], "latest"],
            });
            return balance;
         }
      } catch (error) {
         console.error("Failed to get balance:", error);
         return "0";
      }
   };

   return (
      <Web3AuthContext.Provider
         value={{
            web3auth,
            provider,
            loggedIn,
            loading,
            userInfo,
            login,
            logout,
            getAccounts,
            getBalance,
         }}>
         {children}
      </Web3AuthContext.Provider>
   );
};
