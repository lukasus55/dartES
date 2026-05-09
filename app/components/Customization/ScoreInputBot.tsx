"use client"

import { useState, useEffect } from "react";
import simulateBotAction, { BotAction } from "@/app/utils/simulateBotAction";
import { PlayerWithResults } from "../Scoreboard";

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
            await delay(1000);

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
        <div className="flex flex-col w-full items-center justify-center p-5 gap-2">
            <div>I am a bot targeting: <strong>{target}</strong></div>
            <div className="flex gap-4">
                {shots.map((shot, index) => (
                    <div key={index} className="px-4 py-2 bg-neutral-800 text-white rounded">
                        Dart {index + 1}: {shot}
                    </div>
                ))}
            </div>
        </div>
    );
}