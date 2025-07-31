import { useState } from "react";
import { useRouter } from "next/navigation";
import ExploreMenu from "./ExploreMenu";
import MainMenu from "./MainMenu";

export default function ProfileMenu({ onClose }) {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const router = useRouter();

  const navigateTo = (path) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="flex-1 py-4 overflow-y-auto">
      <ExploreMenu 
        isOpen={isExploreOpen}
        onToggle={() => setIsExploreOpen(!isExploreOpen)}
        onNavigate={navigateTo}
      />
      <MainMenu onNavigate={navigateTo} />
    </div>
  );
}