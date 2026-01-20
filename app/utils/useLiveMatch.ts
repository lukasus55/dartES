"use client";

import { useState, useEffect } from "react";
import { getStoredMatch, StoredMatchData, MATCH_STORAGE_KEY } from "./storage";

export function useLiveMatch() {
    const [matchData, setMatchData] = useState<StoredMatchData | null>(null);

    useEffect(() => {
        setMatchData(getStoredMatch());

        // Listen for changes from other tabs (The Main Scoreboard)
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === MATCH_STORAGE_KEY) {
            setMatchData(getStoredMatch());
            }
        };

        window.addEventListener("storage", handleStorageChange);

        //when closed tab that is "listening" remove the listener
        return () => window.removeEventListener("storage", handleStorageChange);
        }, []);

    return matchData;
}