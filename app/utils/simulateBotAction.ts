import { PlayerWithResults } from "../components/Scoreboard"; // Adjust path if needed
import { getUserConfig } from "./configStorage";
import { sum } from "./helpers";
import Dart from "./Dart";
import { getDartValue, getTarget } from "./targets";

export type BotAction = 
    | { type: "target", value: string }
    | { type: "shot", value: number }
    | { type: "result", value: number };

export default function simulateBotAction(step: number, player: PlayerWithResults, currentTurnShots: number[]): BotAction {
    let botLevel = player.botLevel || 2;
    if (botLevel < 1 || botLevel > 9) botLevel = 2;

    const gameSettings = getUserConfig();
    
    const startOfTurnScore = gameSettings.startingScore - sum(player.throws);
    const liveScore = startOfTurnScore - sum(currentTurnShots);

    if (liveScore <= 1) {
        return { 
            type: "result", 
            value: sum(currentTurnShots) 
        }; 
    }

    const target = getTarget(liveScore);

    const shootedDart = new Dart(target, botLevel);

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
            value: getDartValue(shootedDart.hitResult), 
        };
    }

    return { 
        type: "result", 
        value: sum(currentTurnShots) 
    }; 
}