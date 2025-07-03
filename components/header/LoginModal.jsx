import Modal from "../Modal";

export default function LoginModal({ isOpen, onClose }) {
   return (
      <Modal isOpen={isOpen} onClose={onClose} title="Login to Meno">
         <div className="space-y-4">
            <p className="text-gray-300">Connect your wallet to continue</p>
            <div className="space-y-3">
               {["MetaMask", "WalletConnect", "Coinbase Wallet"].map(
                  (wallet) => (
                     <button
                        key={wallet}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors">
                        Connect {wallet}
                     </button>
                  )
               )}
            </div>
         </div>
      </Modal>
   );
}
