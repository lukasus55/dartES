import { RotateCcw } from "lucide-react"
import ColorPickerPopup from "./ColorPickerPopup"
import { ColorKeyType, DEFAULT_THEME, saveThemeColor, UserConfig } from "@/app/utils/configStorage"
import { useState } from "react";

interface ThemeColorProp {
    config: UserConfig,
    colorKey: ColorKeyType,
    updateActivePicker: (colorKey: ColorKeyType | null) => void,
    activePicker: string | null
}

export default function ThemeColor({config, colorKey, updateActivePicker, activePicker}: ThemeColorProp) {

    const [colorValue, setColorValue] = useState(config.theme[colorKey] ?? DEFAULT_THEME[colorKey]);

    function updateThemeColor(value: string) {
        saveThemeColor(colorKey, value)
        setColorValue(value)
    }

    return (
        <div className="flex items-center gap-3 relative">
            <button
                className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner transition-colors duration-200 cursor-pointer"
                style={{ backgroundColor: colorValue }}
                onClick={() => updateActivePicker(colorKey)}
            />
            {activePicker === colorKey && (
                <div className="absolute top-10 left-0 z-50">
                    <ColorPickerPopup
                        color={colorValue}
                        onChange={(c) => updateThemeColor(c)}
                        onClose={() => updateActivePicker(null)}
                    />
                </div>
            )}
            <div className="flex-1 flex flex-col">
                <label className="text-xs text-neutral-500 font-mono mb-1">PRIMARY (TEXT)</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={colorValue.toUpperCase()}
                        onChange={(e) => updateThemeColor(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-gray-200 font-mono outline-none focus:border-neutral-600"
                    />
                    <button onClick={() => updateThemeColor(DEFAULT_THEME[colorKey])} className="p-2 text-neutral-600 hover:text-white rounded-lg cursor-pointer">
                        <RotateCcw size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}