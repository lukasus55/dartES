import { PlayerWithResults } from "../components/Scoreboard"; // Adjust path if needed
import { getUserConfig } from "./configStorage";
import { sum } from "./helpers";
import { getDartValue, getTarget } from "./targets";

export type BotAction = 
    | { type: "target", value: string }
    | { type: "shot", value: number }
    | { type: "result", value: number };

const levelsAverageValues: Record<number, number> = {
    1: 23, 2: 28, 3: 33, 4: 38, 5: 45.5, 
    6: 55.5, 7: 65.5, 8: 75.5, 9: 90.5,
};

export default function simulateBotAction(step: number, player: PlayerWithResults, currentTurnShots: number[]): BotAction {
    let botLevel = player.botLevel || 2;
    if (botLevel < 1 || botLevel > 9) botLevel = 2;

    const gameSettings = getUserConfig();
    
    const startOfTurnScore = gameSettings.startingScore - sum(player.throws);
    const liveScore = startOfTurnScore - sum(currentTurnShots);

    const target = getTarget(liveScore);

    if (step === 1 || step === 3 || step === 5) {
        return { 
            type: "target", 
            value: target,
        };
    }

    if (step === 2 || step === 4 || step === 6) {
        // Placeholder value for the actual thrown dart
        return { 
            type: "shot", 
            value: getDartValue(target), 
        };
    }

    return { 
        type: "result", 
        value: sum(currentTurnShots) 
    }; 
}