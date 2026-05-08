"use client"

import { getConfig } from "./configStorage";
import { capitalizeFirstLetter } from "./helpers";

export default function applyTheme() {
    const config = getConfig();
    const theme = config.theme;

    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--customizable${capitalizeFirstLetter(key)}`, value);
    });
}