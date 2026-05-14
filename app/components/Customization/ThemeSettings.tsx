"use client"

import { useState } from "react";
import { Palette } from "lucide-react";
import type { ColorKeyType, UserConfig } from "@/app/utils/configStorage";
import ThemeColor from "./ThemeColor";

export default function ThemeSettings({config} : {config: UserConfig}) {

    const updateActivePicker = (colorKey: ColorKeyType | null) => {
        setActivePicker(colorKey);
    };

    const [activePicker, setActivePicker] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-4 pt-4 border-t border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <Palette size={14} /> Theme Colors
            </h3>

            <ThemeColor config={config} updateActivePicker={updateActivePicker} activePicker={activePicker} colorKey="primary"/>
            <ThemeColor config={config} updateActivePicker={updateActivePicker} activePicker={activePicker} colorKey="secondary"/>
            <ThemeColor config={config} updateActivePicker={updateActivePicker} activePicker={activePicker} colorKey="highlight"/>
            <ThemeColor config={config} updateActivePicker={updateActivePicker} activePicker={activePicker} colorKey="accent"/>
            <ThemeColor config={config} updateActivePicker={updateActivePicker} activePicker={activePicker} colorKey="greenScreen"/>

        </div>
    )
}