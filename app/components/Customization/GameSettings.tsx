"use client";

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { DEFAULT_SETTINGS, saveSettings, UserConfig } from "@/app/utils/configStorage";
import { number } from "zod";

export default function GameSettings({config} : {config: UserConfig}) {

    const [startingScore, setStartingScore] = useState(config.startingScore ?? DEFAULT_SETTINGS.startingScore);
    const [legsToWinSet, setLegsToWinSet] = useState(config.legsToWinSet ?? DEFAULT_SETTINGS.legsToWinSet);

    const handleStartingScore = (value: number) => {
        if (isNaN(value)) return;
        setStartingScore(value);
    }

    const handleLegsToWinSet = (value: number) => {
        if (isNaN(value)) return;
        setLegsToWinSet(value);
    }
    
    useEffect (() => {
        saveSettings({startingScore, legsToWinSet}); 
    }, [startingScore, legsToWinSet])

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <Settings size={14} /> Game Settings
            </h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-500 font-mono">START SCORE</label>
                    <input
                        type="number"
                        defaultValue={startingScore}
                        onBlur={(e) => handleStartingScore(parseInt(e.target.value))}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-neutral-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-500 font-mono">LEGS TO SET</label>
                    <input
                        type="number"
                        defaultValue={legsToWinSet}
                        onBlur={(e) => handleLegsToWinSet(parseInt(e.target.value))}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-neutral-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
            </div>
        </div>
    )
}