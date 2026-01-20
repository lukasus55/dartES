"use client";

import { useLiveMatch } from "../utils/useLiveMatch";

export default function BroadcastPage() {
    const matchData = useLiveMatch();

    if (!matchData) return null;

    const { players, activePlayerIndex } = matchData;
    const activePlayer = players[activePlayerIndex];

    const getScore = (p: any) =>
    501 - p.throws.reduce((a: number, b: number) => a + b, 0);

    return (
    <div className="min-h-screen w-full flex items-end justify-center pb-10 font-sans">
        <div className="flex bg-customizableHighlit border-t-4 border-customizableAccent shadow-2xl rounded-xl overflow-hidden min-w-200">
        {players
            .filter((p) => p.isEnabled)
            .map((player, index) => {
            const isActive = player.id === activePlayer.id;
            const score = getScore(player);

            return (
                <div
                key={player.id}
                className={`flex-1 flex items-center p-4 gap-4 ${index === 0 ? "border-r border-white/10" : ""}`}
                >
                <div
                    className={`w-2 h-16 rounded-full transition-all duration-300 ${isActive ? "bg-customizableAccent" : "bg-transparent"}`}
                />

                <div className="flex flex-col">
                    <span
                    className={`text-2xl font-bold uppercase tracking-wider ${isActive ? "text-customizablePrimary" : "text-customizableSecondary"}`}
                    >
                    {player.name}
                    </span>
                    <div className="flex gap-3 text-sm font-mono text-customizableSecondary">
                    <span>
                        SETS: <span className="text-customizableAccent">{player.sets}</span>
                    </span>
                    <span>
                        LEGS: <span className="text-customizableAccent">{player.legs}</span>
                    </span>
                    </div>
                </div>

                <div
                    className={`ml-auto text-6xl font-black tracking-tighter ${isActive ? "text-customizablePrimary" : "text-customizableSecondary"}`}
                >
                    {score}
                </div>
                </div>
            );
            })}
        </div>
    </div>
    );
}
