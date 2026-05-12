"use client"
import { useState } from "react";
import { CornerDownLeft } from "lucide-react";

interface ScoreInputDesktop {
    onSubmit: (score: number) => void;
    currentPlayerName: string;
}

export default function ScoreInputDesktop( {onSubmit, currentPlayerName} : ScoreInputDesktop) {
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
        className="flex items-end gap-3"
    >
        <div className="flex flex-col gap-1.5">
        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider pl-1 max-lg:hidden">
            Score for <span className="text-primary">{currentPlayerName}</span>
        </div>

        <div className="relative group">
            <input
            type="number"
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="0"
            className="
                w-48 h-10 
                bg-neutral-950 
                border-2 border-neutral-800 
                rounded-full 
                text-center text-xl font-bold text-primary
                placeholder:text-neutral-700
                outline-none
                transition-all duration-200
                
                hover:border-neutral-700
                focus:border-primary/50 focus:bg-neutral-900
                
                /* --- HIDE SPINNERS --- */
                [appearance:textfield] 
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none
            "
            />

            {/* Enter Button (Integrated inside right) */}
            <button
            type="submit"
            disabled={!inputValue}
            className="
                absolute right-1 top-1 bottom-1 w-10
                flex items-center justify-center
                rounded-full
                text-neutral-500
                hover:bg-neutral-800 hover:text-primary
                disabled:opacity-0 disabled:cursor-default
                transition-all duration-200
            "
            >
            <CornerDownLeft size={16} strokeWidth={2.5} />
            </button>
        </div>
        </div>
    </form>
);
}
