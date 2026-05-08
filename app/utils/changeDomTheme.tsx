"use client"

import { getConfig } from "./configStorage";
import { capitalizeFirstLetter } from "./helpers";

export default function changeDomTheme() {
    const config = getConfig();
    const theme = config.theme;

    Object.entries(theme).forEach(([key, value]) => {
        console.log(`The color for ${capitalizeFirstLetter(key)} is ${value}`);
        document.documentElement.style.setProperty(`--customizable${capitalizeFirstLetter(key)}`, value);
    });
}