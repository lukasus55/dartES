"use client";

import { X } from "lucide-react";
import GameSettings from "./GameSettings";
import ThemeSettings from "./ThemeSettings";
import PlayersSettings from "./PlayersSettings";
import { getUserConfig } from "@/app/utils/configStorage";

export default function CustomizationPopup({ onClose }: {onClose: () => void;}) {

  const config = getUserConfig();

  return (
    <div className="
      absolute top-24 left-1/2 -translate-x-1/2 flex flex-col gap-6 p-6 min-w-75
      bg-neutral-950 border-2 border-neutral-800 rounded-2xl shadow-2xl shadow-neutral-900/50
      backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200 z-50
      max-h-[80vh] overflow-y-auto no-scrollbar
    ">
      
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 text-neutral-600 hover:text-white transition-colors p-1 cursor-pointer"
      >
        <X size={18} />
      </button>

      <GameSettings config={config}/>

      <ThemeSettings config={config}/>
      
    </div>
  );
}