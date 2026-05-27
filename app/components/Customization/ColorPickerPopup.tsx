"use client";

import { HexColorPicker } from "react-colorful";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useKeepInView } from "@/app/utils/useKeepInView";

interface ColorPickerPopupProps {
  color: string, 
  onChange: (c: string) => void, 
  onClose: () => void
}

export default function ColorPickerPopup({ color, onChange, onClose }: ColorPickerPopupProps) {
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const customContainer = useRef<HTMLDivElement | null>(document.querySelector("#CustomizationPopup"));

  useKeepInView(colorPickerRef, customContainer);

  return (
    <div className="absolute top-10 left-0 z-50">
      <div ref={colorPickerRef} className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl flex flex-col gap-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider pl-1">
            Select Color
          </span>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors p-0.5 rounded-md hover:bg-neutral-800 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        <HexColorPicker color={color} onChange={onChange} />
      </div>
    </div>
  );
}