"use client";

import { useState } from "react";
import { CornerDownLeft } from "lucide-react"; // Enter icon

interface ScoreInputProps {
  onSubmit: (score: number) => void;
  currentPlayerName: string;
  isProcessing?: boolean;
}

export default function ScoreInput({
  onSubmit,
  currentPlayerName,
  isProcessing,
}: ScoreInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseInt(inputValue);

    if (!isNaN(score) && score >= 0 && score <= 180) {
      onSubmit(score);
      setInputValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 mt-8"
    >
      <div className="text-gray-400 text-sm font-mono max-lg:hidden">
        ENTER SCORE FOR{" "}
        <span className="text-accent font-bold">{currentPlayerName}</span>
      </div>

      <div className="relative group">
        <input
          type="number"
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="0"
          className="
            w-48 h-16 bg-secondary border-2 border-gray-700 rounded-xl
            text-center text-4xl font-bold text-white outline-none
            transition-all duration-200
            focus:border-accent focus:shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]
            placeholder:text-gray-700
            
            /* --- HIDE SPINNERS --- */
            [appearance:textfield] 
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        {/* Enter Button */}
        <button
          type="submit"
          disabled={!inputValue || isProcessing}
          className="
            absolute right-2 top-2 bottom-2 w-12 
            flex items-center justify-center
            bg-gray-800 rounded-lg text-gray-400
            hover:bg-accent hover:text-black transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
        "
        >
          <CornerDownLeft size={20} />
        </button>
      </div>
    </form>
  );
}
