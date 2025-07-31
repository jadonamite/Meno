import { Activity, Settings } from "lucide-react";

export default function MainMenu({ onNavigate }) {
  const mainMenuItems = [
    { icon: Activity, label: "Activities", path: "/activities" },
    { icon: Settings, label: "Profile", path: "/profile" },
  ];

  return (
    <>
      {mainMenuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => onNavigate(item.path)}
          className="w-full px-6 py-4 text-left flex items-center gap-4 hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white"
        >
          <item.icon className="w-5 h-5" />
          <span className="text-base font-normal">{item.label}</span>
        </button>
      ))}
    </>
  );
}
