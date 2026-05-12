"use client";
import { useState } from "react";
import IconButton from "./IconButton";
import { Users, Pencil, RotateCcw, Ellipsis } from "lucide-react";
import CustomizationPopup from "./Customization/CustomizationPopup";

import PlayersPopup from "./Customization/PlayersPopup";
import MorePopup from "./MorePopup";

interface TopbarProps {
  onReset: () => void;
}

type PopupType = 'customization' | 'players' | 'more' | null;

export default function Topbar({ onReset }: TopbarProps) {
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  function togglePopup(popupName: NonNullable<PopupType>){
    setActivePopup((current) => {
      return current === popupName ? null : popupName;
    });
  };

  return (
    <div className="max-lg:absolute flex fixed top-0 left-0 w-screen p-5 min-h-30 items-center z-100">
      <div className="flex w-full justify-center gap-10 max-sm:gap-4">
        <IconButton
          icon={RotateCcw}
          label="Reset"
          onClick={onReset}
        />
        <IconButton 
          icon={Pencil} 
          label="Edit" 
          onClick={() => togglePopup('customization')}
        />
        <IconButton 
          icon={Users} 
          label="Players" 
          onClick={() => togglePopup('players')}
        />
        <div className="relative">
          <IconButton 
            icon={Ellipsis} 
            label="More" 
            onClick={() => togglePopup('more')}
          />
          {activePopup === 'more' && (
            <MorePopup onClose={() => setActivePopup(null)} />
          )}
        </div>
      </div>

      {activePopup === 'customization' && (
        <CustomizationPopup onClose={() => setActivePopup(null)} />
      )}

      {activePopup === 'players' && (
        <PlayersPopup onClose={() => setActivePopup(null)} />
      )}

    </div>
  );
}