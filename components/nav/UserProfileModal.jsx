import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useWeb3Auth } from "../../lib/Web3AuthContext";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileMenu from "./profile/ProfileMenu";
import WalletInfo from "./profile/WalletInfo";

export default function UserProfileModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const { accounts } = useWeb3Auth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-start">
        <div 
          ref={modalRef}
          className="w-full max-w-sm md:w-[30vw] h-[90vh] ml-[30px] bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out"
          style={{
            animation: isOpen ? 'slideInFromLeft 0.3s ease-out' : 'slideOutToLeft 0.3s ease-in'
          }}
        >
          <ProfileHeader accounts={accounts} onClose={onClose} />
          <ProfileMenu onClose={onClose} />
          <WalletInfo accounts={accounts} onClose={onClose} />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutToLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
