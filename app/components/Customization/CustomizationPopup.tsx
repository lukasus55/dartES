"use client";

import { useState, useEffect } from "react";
import { X, Users, Power } from "lucide-react";
import GameSettings from "./GameSettings";
import ThemeSettings from "./ThemeSettings";

interface CustomizationPopupProps {
  onClose: () => void;
}

const DEFAULT_PLAYERS = [
  { id: 1, name: "PLAYER 1", isEnabled: true },
  { id: 2, name: "PLAYER 2", isEnabled: true },
  { id: 3, name: "PLAYER 3", isEnabled: false },
  { id: 4, name: "PLAYER 4", isEnabled: false },
  { id: 5, name: "PLAYER 5", isEnabled: false },
];

const STORAGE_KEY = "dartES_config";

export default function CustomizationPopup({ onClose }: CustomizationPopupProps) {
  // --- PLAYERS STATE ---
  const [playersConfig, setPlayersConfig] = useState(DEFAULT_PLAYERS);


  // --- LOAD DATA ---
  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);

    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);

      setPlayersConfig(parsed.players || DEFAULT_PLAYERS);
    }
  }, []);

  // --- SAVING LOGIC ---
  const saveToStorage = (updates: any) => {
    const currentConfig = {
      players: updates.players ?? playersConfig,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentConfig));
  };

  const handlePlayerChange = (id: number, field: "name" | "isEnabled", value: any) => {
    const updatedPlayers = playersConfig.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    setPlayersConfig(updatedPlayers);
    saveToStorage({ players: updatedPlayers });
    window.dispatchEvent(new Event("storage"));
  };

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

      <GameSettings />

      <ThemeSettings />

      {/* --- PLAYERS SECTION --- */}
      <div className="flex flex-col gap-4 pt-4 border-t border-neutral-800">
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
          <Users size={14} /> Players
        </h3>
        
        <div className="flex flex-col gap-2">
          {playersConfig.map((player) => (
            <div key={player.id} className="flex items-center gap-3">
              <input 
                type="text"
                value={player.name}
                onChange={(e) => handlePlayerChange(player.id, "name", e.target.value)}
                className={`
                    flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 
                    text-sm font-mono outline-none focus:border-neutral-600 transition-colors
                    ${player.isEnabled ? "text-white" : "text-neutral-600"}
                `}
                disabled={!player.isEnabled}
              />

              <button
                onClick={() => handlePlayerChange(player.id, "isEnabled", !player.isEnabled)}
                className={`
                  p-2 rounded-lg transition-all duration-200 border
                  ${player.isEnabled 
                    ? "text-green-400 bg-green-400/10 border-green-400/20" 
                    : "text-neutral-600 bg-neutral-900 border-neutral-800 hover:bg-neutral-800 hover:text-neutral-400"}
                `}
                title={player.isEnabled ? "Disable Player" : "Enable Player"}
              >
                <Power size={14} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}