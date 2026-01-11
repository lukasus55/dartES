"use client";

import { useState, useEffect } from "react";
import { X, RotateCcw, Settings, Users, Power, Palette } from "lucide-react";
import ColorPickerPopup from "./ColorPickerPopup";

interface CustomizationPopupProps {
  onClose: () => void;
}

const DEFAULT_THEME = {
  primary: "#F3EFF5",
  secondary: "#0F131B",
  accent: "#72B01D",
};

const DEFAULT_SETTINGS = {
  startingScore: 501,
  legsToWinSet: 3,
};

const DEFAULT_PLAYERS = [
  { id: 1, name: "PLAYER 1", isEnabled: true },
  { id: 2, name: "PLAYER 2", isEnabled: true },
  { id: 3, name: "PLAYER 3", isEnabled: false },
  { id: 4, name: "PLAYER 4", isEnabled: false },
  { id: 5, name: "PLAYER 5", isEnabled: false },
];

const STORAGE_KEY = "darts_app_theme_config";

export default function CustomizationPopup({ onClose }: CustomizationPopupProps) {
  // --- COLORS & SETTINGS STATE ---
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_THEME.primary);
  const [secondaryColor, setSecondaryColor] = useState(DEFAULT_THEME.secondary);
  const [accentColor, setAccentColor] = useState(DEFAULT_THEME.accent);
  const [startingScore, setStartingScore] = useState(DEFAULT_SETTINGS.startingScore);
  const [legsToWinSet, setLegsToWinSet] = useState(DEFAULT_SETTINGS.legsToWinSet);
  
  // --- PLAYERS STATE ---
  const [playersConfig, setPlayersConfig] = useState(DEFAULT_PLAYERS);

  const [activePicker, setActivePicker] = useState<string | null>(null);

  // --- LOAD DATA ---
  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    const getCssVar = (name: string) => {
        if (typeof window !== "undefined") {
          return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        }
        return "";
    };

    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      
      setPrimaryColor(parsed.primary || DEFAULT_THEME.primary);
      setSecondaryColor(parsed.secondary || DEFAULT_THEME.secondary);
      setAccentColor(parsed.accent || DEFAULT_THEME.accent);
      setStartingScore(parsed.startingScore || DEFAULT_SETTINGS.startingScore);
      setLegsToWinSet(parsed.legsToWinSet || DEFAULT_SETTINGS.legsToWinSet);
      setPlayersConfig(parsed.players || DEFAULT_PLAYERS);

      if (parsed.primary) document.documentElement.style.setProperty("--customizablePrimary", parsed.primary);
      if (parsed.secondary) document.documentElement.style.setProperty("--customizableSecondary", parsed.secondary);
      if (parsed.accent) document.documentElement.style.setProperty("--customizableAccent", parsed.accent);
    } else {
      setPrimaryColor(getCssVar("--customizablePrimary") || DEFAULT_THEME.primary);
      setSecondaryColor(getCssVar("--customizableSecondary") || DEFAULT_THEME.secondary);
      setAccentColor(getCssVar("--customizableAccent") || DEFAULT_THEME.accent);
    }
  }, []);

  // --- SAVING LOGIC ---
  const saveToStorage = (updates: any) => {
    const currentConfig = {
      primary: updates.primary ?? primaryColor,
      secondary: updates.secondary ?? secondaryColor,
      accent: updates.accent ?? accentColor,
      startingScore: updates.startingScore ?? startingScore,
      legsToWinSet: updates.legsToWinSet ?? legsToWinSet,
      players: updates.players ?? playersConfig,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentConfig));
  };

  const handleColorChange = (varName: string, value: string, setter: (v: string) => void) => {
    setter(value);
    document.documentElement.style.setProperty(varName, value);
    const key = varName === "--customizablePrimary" ? "primary" 
              : varName === "--customizableSecondary" ? "secondary" 
              : "accent";
    saveToStorage({ [key]: value });
  };

  const handleSettingChange = (key: string, value: number, setter: (v: number) => void) => {
    setter(value);
    saveToStorage({ [key]: value });
    window.dispatchEvent(new Event("storage")); 
  };

  const handlePlayerChange = (id: number, field: "name" | "isEnabled", value: any) => {
    const updatedPlayers = playersConfig.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    setPlayersConfig(updatedPlayers);
    saveToStorage({ players: updatedPlayers });
    window.dispatchEvent(new Event("storage"));
  };

  const handleResetSingle = (varName: string, defaultValue: string, setter: (v: string) => void) => {
    handleColorChange(varName, defaultValue, setter);
  };

  return (
    <div className="
      absolute top-24 left-1/2 -translate-x-1/2 flex flex-col gap-6 p-6 min-w-75
      bg-neutral-950 border-2 border-neutral-800 rounded-2xl shadow-2xl shadow-neutral-900/50
      backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200 z-50
      max-h-[80vh] overflow-y-auto
    ">
      
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 text-neutral-600 hover:text-white transition-colors p-1"
      >
        <X size={18} />
      </button>

      {/* --- COLORS SECTION --- */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
          <Palette size={14} /> Theme Colors
        </h3>

        {/* PRIMARY */}
        <div className="flex items-center gap-3 relative">
          <button 
            className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner transition-colors duration-200 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
            onClick={() => setActivePicker("primary")}
          />
          {activePicker === "primary" && (
            <div className="absolute top-10 left-0 z-50">
              <ColorPickerPopup 
                color={primaryColor} 
                onChange={(c) => handleColorChange("--customizablePrimary", c, setPrimaryColor)}
                onClose={() => setActivePicker(null)}
              />
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <label className="text-xs text-neutral-500 font-mono mb-1">PRIMARY (TEXT)</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={primaryColor.toUpperCase()}
                onChange={(e) => handleColorChange("--customizablePrimary", e.target.value, setPrimaryColor)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-gray-200 font-mono outline-none focus:border-neutral-600"
              />
              <button onClick={() => handleResetSingle("--customizablePrimary", DEFAULT_THEME.primary, setPrimaryColor)} className="p-2 text-neutral-600 hover:text-white rounded-lg">
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* SECONDARY */}
        <div className="flex items-center gap-3 relative">
          <button 
            className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner transition-colors duration-200 cursor-pointer"
            style={{ backgroundColor: secondaryColor }}
            onClick={() => setActivePicker("secondary")}
          />
          {activePicker === "secondary" && (
            <div className="absolute top-10 left-0 z-50">
              <ColorPickerPopup 
                color={secondaryColor} 
                onChange={(c) => handleColorChange("--customizableSecondary", c, setSecondaryColor)}
                onClose={() => setActivePicker(null)}
              />
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <label className="text-xs text-neutral-500 font-mono mb-1">SECONDARY (BG)</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={secondaryColor.toUpperCase()}
                onChange={(e) => handleColorChange("--customizableSecondary", e.target.value, setSecondaryColor)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-gray-200 font-mono outline-none focus:border-neutral-600"
              />
              <button onClick={() => handleResetSingle("--customizableSecondary", DEFAULT_THEME.secondary, setSecondaryColor)} className="p-2 text-neutral-600 hover:text-white rounded-lg">
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ACCENT */}
        <div className="flex items-center gap-3 relative">
          <button 
            className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner transition-colors duration-200 cursor-pointer"
            style={{ backgroundColor: accentColor }}
            onClick={() => setActivePicker("accent")}
          />
          {activePicker === "accent" && (
            <div className="absolute top-10 left-0 z-50">
              <ColorPickerPopup 
                color={accentColor} 
                onChange={(c) => handleColorChange("--customizableAccent", c, setAccentColor)}
                onClose={() => setActivePicker(null)}
              />
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <label className="text-xs text-neutral-500 font-mono mb-1">ACCENT</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={accentColor.toUpperCase()}
                onChange={(e) => handleColorChange("--customizableAccent", e.target.value, setAccentColor)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-gray-200 font-mono outline-none focus:border-neutral-600"
              />
              <button onClick={() => handleResetSingle("--customizableAccent", DEFAULT_THEME.accent, setAccentColor)} className="p-2 text-neutral-600 hover:text-white rounded-lg">
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

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

      {/* --- GAME SETTINGS SECTION --- */}
      <div className="flex flex-col gap-4 pt-4 border-t border-neutral-800">
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
          <Settings size={14} /> Game Settings
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-500 font-mono">START SCORE</label>
            <input 
              type="number" 
              value={startingScore}
              onChange={(e) => handleSettingChange("startingScore", parseInt(e.target.value) || 0, setStartingScore)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-neutral-600 outline-none
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-500 font-mono">LEGS TO SET</label>
            <input 
              type="number" 
              value={legsToWinSet}
              onChange={(e) => handleSettingChange("legsToWinSet", parseInt(e.target.value) || 0, setLegsToWinSet)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-neutral-600 outline-none
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>

    </div>
  );
}