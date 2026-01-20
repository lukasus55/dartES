"use client";
import { useState } from "react";
import IconButton from "./IconButton";
import { Pencil, RotateCcw, TvMinimal, FileSpreadsheet } from "lucide-react";
import CustomizationPopup from "./CustomizationPopup";
import { exportMatchToExcel } from "../utils/exportMatchToExcel";

interface TopbarProps {
  onReset: () => void;
}

export default function Topbar({ onReset }: TopbarProps) {
  const [showCustomization, setShowCustomization] = useState(false);

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
          onClick={() => setShowCustomization((prev) => !prev)}
        />
        <IconButton 
          icon={FileSpreadsheet} 
          label="Export" 
          onClick={exportMatchToExcel}
        />
        <a href="./setup"><IconButton 
          icon={TvMinimal} 
          label="Broadcast" 
          onClick={() => (``)}
        /></a>
      </div>

      {showCustomization && (
        <CustomizationPopup onClose={() => setShowCustomization(false)} />
      )}
    </div>
  );
}