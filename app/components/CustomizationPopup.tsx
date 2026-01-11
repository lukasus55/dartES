"use client";

import { useState, useEffect } from "react";
import { X, RotateCcw } from "lucide-react";

interface CustomizationPopupProps {
  onClose: () => void;
}

const DEFAULT_THEME = {
  primary: "#F3EFF5",
  secondary: "#0F131B",
  accent: "#72B01D",
};

export default function CustomizationPopup({ onClose }: CustomizationPopupProps) {
  const getCssVar = (name: string) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }
    return "";
  };

  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [accentColor, setAccentColor] = useState("");

  useEffect(() => {
    setPrimaryColor(getCssVar("--customizablePrimary") || DEFAULT_THEME.primary);
    setSecondaryColor(getCssVar("--customizableSecondary") || DEFAULT_THEME.secondary);
    setAccentColor(getCssVar("--customizableAccent") || DEFAULT_THEME.accent);
  }, []);

  const handleColorChange = (varName: string, value: string, setter: (v: string) => void) => {
    setter(value);
    document.documentElement.style.setProperty(varName, value);
  };

  const handleResetSingle = (varName: string, defaultValue: string, setter: (v: string) => void) => {
    handleColorChange(varName, defaultValue, setter);
  };

  return (
    <div className="
      absolute top-24 left-1/2 -translate-x-1/2 flex flex-col gap-6 p-6 min-w-75
      bg-neutral-950 border-2 border-neutral-800 rounded-2xl shadow-2xl shadow-neutral-900/50
      backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200 z-50
    ">
      
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 text-neutral-600 hover:text-white transition-colors p-1"
      >
        <X size={18} />
      </button>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
          Theme Colors
        </h3>

        {/* PRIMARY- */}
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner transition-colors duration-200"
            style={{ backgroundColor: primaryColor }}
          />
          <div className="flex-1 flex flex-col">
            <label className="text-xs text-neutral-500 font-mono mb-1">PRIMARY (TEXT)</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={primaryColor.toUpperCase()}
                onChange={(e) => handleColorChange("--customizablePrimary", e.target.value, setPrimaryColor)}
                className="
                  w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5
                  text-sm text-gray-200 font-mono focus:outline-none focus:border-neutral-600 focus:bg-neutral-800
                  transition-all
                "
                placeholder="#000000"
              />
              <button 
                onClick={() => handleResetSingle("--customizablePrimary", DEFAULT_THEME.primary, setPrimaryColor)}
                className="p-2 text-neutral-600 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                title="Reset to default"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* SECONDARY */}
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner transition-colors duration-200"
            style={{ backgroundColor: secondaryColor }}
          />
          <div className="flex-1 flex flex-col">
            <label className="text-xs text-neutral-500 font-mono mb-1">SECONDARY (BG)</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={secondaryColor.toUpperCase()}
                onChange={(e) => handleColorChange("--customizableSecondary", e.target.value, setSecondaryColor)}
                className="
                  w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5
                  text-sm text-gray-200 font-mono focus:outline-none focus:border-neutral-600 focus:bg-neutral-800
                  transition-all
                "
                placeholder="#000000"
              />
              <button 
                onClick={() => handleResetSingle("--customizableSecondary", DEFAULT_THEME.secondary, setSecondaryColor)}
                className="p-2 text-neutral-600 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                title="Reset to default"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ACCENT*/}
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner transition-colors duration-200"
            style={{ backgroundColor: accentColor }}
          />
          <div className="flex-1 flex flex-col">
            <label className="text-xs text-neutral-500 font-mono mb-1">ACCENT</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={accentColor.toUpperCase()}
                onChange={(e) => handleColorChange("--customizableAccent", e.target.value, setAccentColor)}
                className="
                  w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5
                  text-sm text-gray-200 font-mono focus:outline-none focus:border-neutral-600 focus:bg-neutral-800
                  transition-all
                "
                placeholder="#000000"
              />
              <button 
                onClick={() => handleResetSingle("--customizableAccent", DEFAULT_THEME.accent, setAccentColor)}
                className="p-2 text-neutral-600 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                title="Reset to default"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4 border-t border-neutral-800 opacity-50">
        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider">
          Game Settings
        </h3>
        <div className="text-xs text-neutral-600 italic">
          Coming soon...
        </div>
      </div>

    </div>
  );
}