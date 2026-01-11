"use client";

import { HexColorPicker } from "react-colorful";
import { X } from "lucide-react";

interface ColorPickerPopupProps {
  color: string, 
  onChange: (c: string) => void, 
  onClose: () => void
}

export default function ColorPickerPopup({ color, onChange, onClose }: ColorPickerPopupProps) {
  return (
    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-150">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider pl-1">
          Select Color
        </span>
        <button 
          onClick={onClose}
          className="text-neutral-500 hover:text-white transition-colors p-0.5 rounded-md hover:bg-neutral-800"
        >
          <X size={14} />
        </button>
      </div>

      <HexColorPicker color={color} onChange={onChange} />
    </div>
  );
}