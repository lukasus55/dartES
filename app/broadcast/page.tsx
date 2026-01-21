"use client";

import { getCheckoutGuide } from "../utils/checkout";
import { useLiveMatch } from "../utils/useLiveMatch";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 1. Import Framer Motion

export default function BroadcastPage() {

    const getParams = () => {
        if (typeof window === "undefined") { return null; }
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        return params
    }

    const params = getParams();
    const [isGreenMode, setGreenMode] = useState<boolean>(params?.has('g') || false);

    const matchData = useLiveMatch();

    const THEME_STORAGE_KEY = "darts_app_theme_config";

    useEffect(() => {
        const applyTheme = () => {
            try {
                const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
                if (storedTheme) {
                    const config = JSON.parse(storedTheme);
                    const root = document.documentElement;

                    if (config.primary) root.style.setProperty("--customizablePrimary", config.primary);
                    if (config.secondary) root.style.setProperty("--customizableSecondary", config.secondary);
                    if (config.accent) root.style.setProperty("--customizableAccent", config.accent);
                    if (config.highlight) root.style.setProperty("--customizableHighlit", config.highlight);
                    if (config.greenScreen) root.style.setProperty("--customizableGreenScreen", config.greenScreen);
                }
            } catch (e) {
                console.error("Failed to apply theme live update", e);
            }
        };

        applyTheme();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === THEME_STORAGE_KEY) {
                applyTheme();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    if (!matchData) return null;

    const { players, activePlayerIndex } = matchData;
    const activePlayer = players[activePlayerIndex];

    const getScore = (p: any) =>
        501 - p.throws.reduce((a: number, b: number) => a + b, 0);

    return (
        <div className={`min-h-screen w-full ${isGreenMode ? "bg-customizableGreenScreen" : ""} flex items-end justify-end pr-10 pb-10 font-sans`}>
            <div className="flex flex-col overflow-hidden min-w-200 rounded-tr-md rounded-br-md bg-transparent">

                {/* HEADER ROW */}
                <div key={'header'} className={`flex items-center`}>
                    <div className={`w-3/10 text-2xl font-bold bg-transparent`}></div>
                    <div className="w-7/10 flex items-center h-full px-3 py-0.5 bg-customizableAccent rounded-tl-md">
                        <div className={`w-3 h-3 mr-1 rounded-full transition-all duration-300 bg-transparent`} />
                        <div className={`w-10/20 text-2xl font-bold tracking-wider `}></div>
                        <div className={`w-3/20 text-md font-bold tracking-tighter text-customizableSecondary text-center`}>SETS</div>
                        <div className={`w-3/20 text-md font-bold tracking-tighter text-customizableSecondary text-center`}>LEGS</div>
                        <div className={`w-3/20 text-md font-black tracking-tighter text-customizableAccent text-center`}></div>
                    </div>
                </div>

                {players
                    .filter((p) => p.isEnabled)
                    .map((player, index) => {
                        const isActive = player.id === activePlayer.id;
                        const score = getScore(player);
                        const guide = getCheckoutGuide(score);

                        return (
                            <div
                                key={player.id}
                                className={`flex items-center`}
                            >
                                {/* --- CHECKOUT GUIDE SECTION --- */}
                                <div className={`w-3/10 text-2xl font-bold bg-transparent flex flex-row justify-end overflow-hidden`}>
                                    <AnimatePresence mode="popLayout">
                                        {guide?.map((dart, i) => (
                                            <motion.div
                                                // Key must be unique per dart/score to trigger animation when score changes
                                                key={`${player.id}-${player.legs}-${score}-${i}`} 
                                                
                                                initial={{ opacity: 0, x: 50 }} // Start hidden to the right (near player name)
                                                animate={{ opacity: 1, x: 0 }}  // Slide to normal position
                                                exit={{ opacity: 0, x: 50 }}    // Slide back right when disappearing
                                                
                                                // Physics
                                                transition={{ 
                                                    type: "spring", 
                                                    stiffness: 300, 
                                                    damping: 25,
                                                    delay: i * 0.05 
                                                }}
                                                
                                                className={`w-1/5 text-2xl font-bold bg-customizableHighlit text-customizableSecondary py-1 px-8 flex justify-center items-center ${i===0 ? `rounded-l-sm` : ``}`}
                                            >
                                                {dart}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* --- PLAYER STATS BAR --- */}
                                <div className={`w-7/10 flex items-center h-full p-3 bg-customizableHighlit z-10 relative`}>
                                    <div className={`w-3 h-3 mr-1 rounded-full transition-all duration-300 ${isActive ? "bg-customizableAccent" : "bg-transparent"}`} />
                                    <div className={`w-10/20 text-2xl font-bold tracking-wider ${isActive ? "text-customizablePrimary" : "text-customizableSecondary"}`}>
                                        {player.name}
                                    </div>
                                    <div className={`w-3/20 text-2xl font-bold tracking-tighter text-customizableSecondary text-center`}>
                                        {player.sets}
                                    </div>
                                    <div className={`w-3/20 text-2xl font-bold tracking-tighter text-customizableSecondary text-center`}>
                                        {player.legs}
                                    </div>
                                    <div className={`w-3/20 text-2xl font-black tracking-tighter text-customizableAccent text-center`}>
                                        {score}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}