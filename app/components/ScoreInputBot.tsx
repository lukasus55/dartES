"use client"

import { useState, useEffect } from "react";
import simulateBotAction, { BotAction } from "@/app/utils/simulateBotAction";
import { PlayerWithResults } from "./Scoreboard";

interface BotPlayerProps {
    player: PlayerWithResults;
    handleScoreSubmit: (score: number) => void;
}

export default function BotPlayer({ player, handleScoreSubmit }: BotPlayerProps) {
    const [target, setTarget] = useState<string>("...");
    const [shots, setShots] = useState<number[]>([]);

    useEffect(() => {
        let isActive = true;
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const playBotTurn = async () => {

            // This local array tracks the shots instantly for the loop logic
            let currentTurnShots: number[] = [];

            // 7 Steps: Tgt1 -> Shot1 -> Tgt2 -> Shot2 -> Tgt3 -> Shot3 -> Result
            for (let step = 1; step <= 7; step++) {
                if (!isActive) break;

                const action: BotAction = simulateBotAction(step, player, currentTurnShots);

                if (step > 1) {
                    await delay(1000);
                }

                if (!isActive) break;

                if (action.type === "target") {
                    setTarget(action.value);
                }
                else if (action.type === "shot") {
                    currentTurnShots.push(action.value);
                    // Update React state so the user can see the shots hit
                    setShots([...currentTurnShots]);
                }
                else if (action.type === "result") {
                    handleScoreSubmit(action.value);
                    break;
                }
            }
        };

        playBotTurn();

        return () => {
            isActive = false;
        };
    }, [player, handleScoreSubmit]);

    return (
        <div className="fixed bottom-0 left-0 bg-neutral-950 border-t border-neutral-900 max-w-screen flex flex-col w-full justify-center p-5 gap-4">
            <div className="flex justify-center w-full">Targeting:&nbsp;<strong>{target}</strong></div>
            <div className="flex justify-center w-full gap-4 min-h-60">
                {shots.map((shot, index) => (
                    <div key={index} className="px-4 py-2 bg-neutral-800 text-white rounded h-min">
                        Dart {index + 1}: {shot}
                    </div>
                ))}
            </div>
        </div>
    );
}