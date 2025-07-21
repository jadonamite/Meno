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
   chainId: "0x1", // Ethereum Mainnet
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
   const [accounts, setAccounts] = useState([]);
   const [balance, setBalance] = useState("0");
   const [isInitialized, setIsInitialized] = useState(false);

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

            await web3authInstance.init();

            setWeb3auth(web3authInstance);
            setIsInitialized(true);

            // Check if already connected after initialization
            if (web3authInstance.status === "connected") {
               handleSessionRestore(web3authInstance);
            }

            // Set up event listeners
            web3authInstance.on(ADAPTER_EVENTS.CONNECTED, () => {
               handleSessionRestore(web3authInstance);
            });

            web3authInstance.on(ADAPTER_EVENTS.DISCONNECTED, () => {
               handleLogoutState();
            });
         } catch (error) {
            console.error("Web3Auth initialization failed:", error);
         } finally {
            setLoading(false);
         }
      };

      init();
   }, []);

   const handleSessionRestore = async (instance) => {
      try {
         const prov = instance.provider;
         setProvider(prov);
         setLoggedIn(true);

         const user = await instance.getUserInfo();
         setUserInfo(user);

         await fetchAccountData(prov);
      } catch (err) {
         console.error("Failed to restore session:", err);
      }
   };

   const fetchAccountData = async (prov = provider) => {
      if (!prov) return;

      try {
         const userAccounts = await prov.request({ method: "eth_accounts" });
         setAccounts(userAccounts);

         if (userAccounts.length > 0) {
            const userBalance = await prov.request({
               method: "eth_getBalance",
               params: [userAccounts[0], "latest"],
            });
            setBalance(userBalance);
         }
      } catch (err) {
         console.error("Error fetching accounts/balance:", err);
      }
   };

   const login = async () => {
      if (!web3auth || !isInitialized) {
         console.warn("Web3Auth is not initialized yet. Please wait...");
         return;
      }

      try {
         const web3authProvider = await web3auth.connect();
         setProvider(web3authProvider);
         setLoggedIn(true);

         const user = await web3auth.getUserInfo();
         setUserInfo(user);

         await fetchAccountData(web3authProvider);
      } catch (error) {
         console.error("Login failed:", error);
      }
   };

   const logout = async () => {
      if (!web3auth || !isInitialized) return;

      try {
         await web3auth.logout();
         handleLogoutState();
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   const handleLogoutState = () => {
      setProvider(null);
      setLoggedIn(false);
      setUserInfo(null);
      setAccounts([]);
      setBalance("0");
   };

   return (
      <Web3AuthContext.Provider
         value={{
            web3auth,
            provider,
            loggedIn,
            loading,
            userInfo,
            accounts,
            balance,
            login,
            logout,
            isInitialized,
         }}>
         {children}
      </Web3AuthContext.Provider>
   );
};
