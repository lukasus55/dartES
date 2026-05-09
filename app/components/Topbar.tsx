"use client";
import { useState } from "react";
import IconButton from "./IconButton";
import { Users, Pencil, RotateCcw, TvMinimal, FileSpreadsheet } from "lucide-react";
import CustomizationPopup from "./Customization/CustomizationPopup";
import { exportMatchToExcel } from "../utils/exportMatchToExcel";
import PlayersPopup from "./Customization/PlayersPopup";

interface TopbarProps {
  onReset: () => void;
}

type PopupType = 'customization' | 'players' | null;

export default function Topbar({ onReset }: TopbarProps) {
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  function togglePopup(popupName: NonNullable<PopupType>){
    setActivePopup((current) => {
      return current === popupName ? null : popupName;
    });
  };

  return (
    <div className="max-lg:absolute flex fixed top-0 left-0 w-screen p-5 min-h-30 items-center z-100">
      <div className="flex w-full justify-center gap-10">
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
        <IconButton 
          icon={FileSpreadsheet} 
          label="Export" 
          onClick={exportMatchToExcel}
        />
        <a href="./setup">
          <IconButton 
            icon={TvMinimal} 
            label="Broadcast" 
            onClick={() => {}}
          />
        </a>
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