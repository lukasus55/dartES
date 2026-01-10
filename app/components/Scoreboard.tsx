"use client";
import { useState } from "react";
import PlayerScore from "./PlayerScore";
import ScoreInput from "./ScoreInput";
import PlayerStats from "./PlayerStats";

interface Player {
  id: number;
  name: string;
  throws: number[];
  sets: number;
  legs: number;
  isEnabled: boolean;
  country?: string;
}

// Helper to sum up an array
const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

export default function Scoreboard() {
  const STARTING_SCORE = 501;

  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "THE POWER", throws: [], sets: 0, legs: 0, isEnabled: true },
    {
      id: 2,
      name: "MIGHTY MIKE",
      throws: [],
      sets: 0,
      legs: 0,
      isEnabled: true,
    },
    { id: 3, name: "SNAKEBITE", throws: [], sets: 0, legs: 0, isEnabled: true },
    {
      id: 4,
      name: "SNAKEBITE",
      throws: [],
      sets: 0,
      legs: 0,
      isEnabled: false,
    },
  ]);

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);

  const handleScoreSubmit = (score: number) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player, index) => {
        if (index === activePlayerIndex) {
          return { ...player, throws: [...player.throws, score] };
        }
        return player;
      });
    });

    //skip players who have isEnabled: false
    let nextIndex = (activePlayerIndex + 1) % players.length;
    while (!players[nextIndex].isEnabled) {
      nextIndex = (nextIndex + 1) % players.length;
    }
    setActivePlayerIndex(nextIndex);
  };

  const handleUndo = () => {
    // Advanced: To undo, we usually need to go back to the PREVIOUS player
    // and pop their last throw. (We can implement this if you need it)
    console.log("Undo logic placeholder");
  };

  return (
    <div className="flex flex-col items-center w-full p-5">
      {/* PLAYERS GRID */}
      <div className="flex flex-wrap justify-center gap-6 mb-10 w-full">
        {players.map((player, index) => {
          if (!player.isEnabled) return null;

          const currentScore = STARTING_SCORE - sum(player.throws);

          return (
            <div key={player.id} className="flex flex-col items-center">
              <PlayerScore
                name={player.name}
                score={currentScore}
                sets={player.sets}
                legs={player.legs}
                isActive={index === activePlayerIndex}
              />

              {/* deatiled stats below the card */}
              <div className="flex gap-20 text-gray-500 font-mono text-sm mb-5">
                <PlayerStats throws={player.throws} />
              </div>
            </div>
          );
        })}
      </div>

      {/* input section */}
      <div className="fixed bottom-10 w-full flex justify-center pt-10 pb-5">
        <ScoreInput
          currentPlayerName={players[activePlayerIndex].name}
          onSubmit={handleScoreSubmit}
        />
      </div>
    </div>
  );
}
