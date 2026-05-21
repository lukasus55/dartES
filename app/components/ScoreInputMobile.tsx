"use client";

import { JSX, useState } from "react";
import { CornerDownLeft, Delete, Undo2 } from "lucide-react";
import { PlayerWithResults } from "./ScoreboardContainer";

interface ScoreInputMobileProps {
    onSubmit: (score: number) => void;
    onUndo: () => void;
    currentPlayer: PlayerWithResults;
    ModeButton: () => JSX.Element;
    isSingleMode: boolean;
}

export default function ScoreInputMobile({onSubmit, onUndo, currentPlayer, ModeButton, isSingleMode}: ScoreInputMobileProps) {

const [inputValue, setInputValue] = useState("");

const handleNumClick = (num: string) => {
    if (inputValue.length < 3) {
        setInputValue((prev) => prev + num);
    }
};

const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1));
};

const handleSubmit = () => {
    const score = parseInt(inputValue);
    const maxScore = isSingleMode ? 60 : 180;
    
    if (!isNaN(score) && score >= 0 && score <= maxScore) {
    onSubmit(score);
    setInputValue("");
    }
};

return (
    <div className="fixed bottom-0 left-0 w-full bg-neutral-950 border-t border-neutral-900 max-w-screen flex justify-center">
        <div className="max-w-120">
            <div className="flex flex-wrap items-center justify-center py-4 gap-1 w-full bg-neutral-950/50">
                <span className="flex justify-center text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 w-full">
                    Score for&nbsp;<span className="text-primary">{currentPlayer.name}</span>
                </span>

                <div className="flex w-full *:flex *:justify-center">
                    <div className="w-1/5"></div>
                    <div className="w-3/5">
                        <div
                            className="
                            h-12 min-w-30 px-6
                            flex items-center justify-center
                            bg-neutral-900 rounded-full border border-neutral-800
                            text-3xl font-bold text-primary tracking-widest
                            "
                        >
                            {inputValue || <span className="text-neutral-700 opacity-50">0</span>}
                        </div>
                    </div>
                    <div className="w-1/5"> <ModeButton/> </div>
                </div>
                
            </div>

            <div className="grid grid-cols-3 gap-1 p-2 max-w-md mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                key={num}
                onClick={() => handleNumClick(num.toString())}
                className="
                h-14 rounded-xl
                bg-neutral-900 text-white text-2xl font-bold
                active:bg-neutral-800 active:scale-95 transition-all
                border border-neutral-800
            "
                >
                {num}
                </button>
            ))}

            <button
                onClick={inputValue ? handleDelete : onUndo}
                className={`
                h-14 rounded-xl
                flex items-center justify-center
                active:bg-neutral-800 active:scale-95 transition-all
                border border-neutral-800
                ${inputValue ? "bg-neutral-900/50 text-red-400" : "bg-neutral-900 text-neutral-400"}
                `}
            >
                {inputValue ? <Delete size={24} /> : <Undo2 size={24} />}
            </button>

            <button
                onClick={() => handleNumClick("0")}
                className="
                h-14 rounded-xl
                bg-neutral-900 text-white text-2xl font-bold
                active:bg-neutral-800 active:scale-95 transition-all
                border border-neutral-800
                "
            >
                0
            </button>

            <button
                onClick={handleSubmit}
                disabled={!inputValue}
                className="
                h-14 rounded-xl
                bg-primary/10 text-primary border border-primary/20
                flex items-center justify-center
                active:scale-95 transition-all
                disabled:opacity-30 disabled:active:scale-100
                "
            >
                <CornerDownLeft size={28} strokeWidth={3} />
            </button>
            </div>
        </div>
    </div>
);
}
