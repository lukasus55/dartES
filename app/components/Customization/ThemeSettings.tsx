"use client"

import { useState, useEffect } from "react";
import ColorPickerPopup from "../ColorPickerPopup";
import { Palette, RotateCcw } from "lucide-react";
import { DEFAULT_THEME, saveTheme } from "@/app/utils/configStorage";
import type { UserConfig } from "@/app/utils/configStorage";
import applyTheme from "@/app/utils/applyTheme";

export default function ThemeSettings({config} : {config: UserConfig}) {

    const [primaryColor, setPrimaryColor] = useState(config.theme.primary ?? DEFAULT_THEME.primary);
    const [secondaryColor, setSecondaryColor] = useState(config.theme.secondary ?? DEFAULT_THEME.secondary);
    const [accentColor, setAccentColor] = useState(config.theme.accent ?? DEFAULT_THEME.accent);
    const [highlightColor, setHighlightColor] = useState(config.theme.highlight ?? DEFAULT_THEME.highlight);
    const [greenScreenColor, setGreenScreenColor] = useState(config.theme.greenScreen ?? DEFAULT_THEME.greenScreen);

    useEffect (() => {
        saveTheme({primary: primaryColor, secondary: secondaryColor, accent: accentColor, highlight: highlightColor, greenScreen: greenScreenColor});
        applyTheme();
    })

    const [activePicker, setActivePicker] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-4 pt-4 border-t border-neutral-800">
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
                            onChange={(c) => setPrimaryColor(c)}
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
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-gray-200 font-mono outline-none focus:border-neutral-600"
                        />
                        <button onClick={() => setPrimaryColor(DEFAULT_THEME.primary)} className="p-2 text-neutral-600 hover:text-white rounded-lg cursor-pointer">
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
                            onChange={(c) => setSecondaryColor(c)}
                            onClose={() => setActivePicker(null)}
                        />
                    </div>
                )}
                <div className="flex-1 flex flex-col">
                    <label className="text-xs text-neutral-500 font-mono mb-1">SECONDARY</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={secondaryColor.toUpperCase()}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-gray-200 font-mono outline-none focus:border-neutral-600"
                        />
                        <button onClick={() => setSecondaryColor(DEFAULT_THEME.secondary)} className="p-2 text-neutral-600 hover:text-white rounded-lg cursor-pointer">
                            <RotateCcw size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* HIGHLIGHT */}
            <div className="flex items-center gap-3 relative">
                <button
                    className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner transition-colors duration-200 cursor-pointer"
                    style={{ backgroundColor: highlightColor }}
                    onClick={() => setActivePicker("highlight")}
                />
                {activePicker === "highlight" && (
                    <div className="absolute top-10 left-0 z-50">
                        <ColorPickerPopup
                            color={highlightColor}
                            onChange={(c) => setHighlightColor(c)}
                            onClose={() => setActivePicker(null)}
                        />
                    </div>
                )}
                <div className="flex-1 flex flex-col">
                    <label className="text-xs text-neutral-500 font-mono mb-1">HIGHLIGHT (BG)</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={highlightColor.toUpperCase()}
                            onChange={(e) => setHighlightColor(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-gray-200 font-mono outline-none focus:border-neutral-600"
                        />
                        <button onClick={() => setHighlightColor(DEFAULT_THEME.highlight)} className="p-2 text-neutral-600 hover:text-white rounded-lg cursor-pointer">
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
                            onChange={(c) => setAccentColor(c)}
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
                            onChange={(e) => setAccentColor(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-gray-200 font-mono outline-none focus:border-neutral-600"
                        />
                        <button onClick={() => setAccentColor(DEFAULT_THEME.accent)} className="p-2 text-neutral-600 hover:text-white rounded-lg cursor-pointer">
                            <RotateCcw size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* BROADCAST GREEN SCREEN */}
            <div className="flex items-center gap-3 relative">
                <button
                    className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner transition-colors duration-200 cursor-pointer"
                    style={{ backgroundColor: greenScreenColor }}
                    onClick={() => setActivePicker("greenScreen")}
                />
                {activePicker === "greenScreen" && (
                    <div className="absolute top-10 left-0 z-50">
                        <ColorPickerPopup
                            color={greenScreenColor}
                            onChange={(c) => setGreenScreenColor(c)}
                            onClose={() => setActivePicker(null)}
                        />
                    </div>
                )}
                <div className="flex-1 flex flex-col">
                    <label className="text-xs text-neutral-500 font-mono mb-1">GREEN SCREEN (BROADCAST ONLY)</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={greenScreenColor.toUpperCase()}
                            onChange={(e) => setGreenScreenColor(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-gray-200 font-mono outline-none focus:border-neutral-600"
                        />
                        <button onClick={() => setGreenScreenColor(DEFAULT_THEME.greenScreen)} className="p-2 text-neutral-600 hover:text-white rounded-lg cursor-pointer">
                            <RotateCcw size={14} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}