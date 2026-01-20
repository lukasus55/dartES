export const MATCH_STORAGE_KEY = "darts_match_snapshot";

export interface StoredMatchData {
    players: any[]; 
    activePlayerIndex: number;
    timestamp: number;
}

export const getStoredMatch = (): StoredMatchData | null => {
    // If on server, return null immediately
    if (typeof window === "undefined") {
        return null;
    }

    try {

        const matchStr = localStorage.getItem(MATCH_STORAGE_KEY);

        if (!matchStr) return null;

        return JSON.parse(matchStr);

    } catch (error) {

        console.error("Failed to load match data", error);
        
        return null;
    }
};