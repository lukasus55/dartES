"use client"

import { useState, useEffect } from "react";
import simulateBotAction, { BotAction } from "@/app/utils/simulateBotAction";
import { PlayerWithResults } from "./Scoreboard";
import { getDartValue } from "../utils/targets";
import DartboardVisualiser from "./DartboardVisualiser";
import Dart from "../utils/Dart";

interface BotPlayerProps {
    player: PlayerWithResults;
    handleScoreSubmit: (score: number) => void;
}

export default function BotPlayer({ player, handleScoreSubmit }: BotPlayerProps) {
    const [target, setTarget] = useState<string>("...");
    const [darts, setShots] = useState<Dart[]>([]);

    useEffect(() => {
        let isActive = true;
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const playBotTurn = async () => {

            // This local array tracks the shots instantly for the loop logic
            let currentTurnShots: Dart[] = [];

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
                    const dart: Dart = action.value
                    currentTurnShots.push(dart);
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
            <div className="flex justify-center w-full gap-4">
                <DartboardVisualiser darts={darts}/>
            </div>
        </div>
    );
}