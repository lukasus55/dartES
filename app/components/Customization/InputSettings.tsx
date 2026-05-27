"use client"

import { useState } from "react";
import { TextCursorInput } from "lucide-react";
import { DEFAULT_INPUT_SETTINGS, saveInputSettings, type UserConfig } from "@/app/utils/configStorage";

export default function InputSettings({config} : {config: UserConfig}) {
    const [modeChangePoint, setModeChangePoint] = useState(config.modeChangePoint ?? DEFAULT_INPUT_SETTINGS.modeChangePoint);

    const handleModeChangePoint = (value: number) => {
        if (isNaN(value) || isNaN(modeChangePoint)) return;

        saveInputSettings({ 
            modeChangePoint: Math.max(0, value),
        });
    }

    return (
        <div className="flex flex-col gap-4 pt-4 border-t border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <TextCursorInput size={14} /> Input Settings
            </h3>

            <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-500 font-mono">CHANGE TO SINGLE MODE WHEN (0 TO DISABLE)</label>
                    <input
                        type="number"
                        defaultValue={modeChangePoint}
                        onBlur={(e) => handleModeChangePoint(parseInt(e.target.value))}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-neutral-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
            </div>
        </div>
    )
}