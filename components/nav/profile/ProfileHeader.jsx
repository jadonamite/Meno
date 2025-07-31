import { X } from "lucide-react";

export default function ProfileHeader({ accounts, onClose }) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {accounts[0] ? accounts[0].slice(2, 4).toUpperCase() : "U"}
          </span>
        </div>
        <span className="text-white font-medium">My Account</span>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors p-1"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}