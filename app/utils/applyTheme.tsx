"use client"

import { getUserConfig } from "./configStorage";
import { capitalizeFirstLetter } from "./helpers";

export default function applyTheme() {
    if (typeof document === "undefined") return;

    const config = getUserConfig();
    const theme = config.theme;

    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--customizable${capitalizeFirstLetter(key)}`, value);
    });
}