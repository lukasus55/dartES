import { checkoutTable } from "./checkout";

const BOGEY_NUMBERS = new Set([169, 168, 166, 165, 163, 162, 159]);

const SETUP_DARTS = [
    { target: "T20", value: 60 },
    { target: "T19", value: 57 },
    { target: "T18", value: 54 },
    { target: "T17", value: 51 },
    { target: "BULL", value: 50 },
    { target: "T16", value: 48 },
    { target: "T15", value: 45 }
];

export function getTarget(score: number): string {
    if (score <= 1) return "0";

    // MINDLESS SCORING PHASE (> 230)
    if (score > 230) {
        return "T20";
    }

    // THE 4-DART SETUP PHASE (171 - 230)
    if (score > 170) {
        // Find the highest scoring dart that drops score into a valid 3-dart finish
        for (const dart of SETUP_DARTS) {
            const remaining = score - dart.value;
            
            if (remaining <= 170 && !BOGEY_NUMBERS.has(remaining)) {
                return dart.target;
            }
        }

        return "T20";
    }

    if (checkoutTable[score]) {
        return checkoutTable[score][0];
    }

    // BOGEY FALLBACK If the bot somehow starts a turn exactly on 169, 168,
    return "T20";
}

export function getDartValue(dart: string): number {
    if (dart === "BULL") return 50;
    if (dart === "25") return 25; // Outer bullseye

    if (dart.startsWith("D")) {
        return parseInt(dart.slice(1)) * 2;
    }

    if (dart.startsWith("T")) {
        return parseInt(dart.slice(1)) * 3;
    }

    return parseInt(dart) || 0;
}