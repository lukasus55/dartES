"use client";
import { useState } from "react";
import PlayerScore from "./PlayerScore";
import ScoreInput from "./ScoreInput";
import PlayerStats from "./PlayerStats";
import CheckoutGuide from "./CheckoutGuide";

interface Player {
  id: number;
  name: string;
  throws: number[];
  sets: number;
  legs: number;
  isEnabled: boolean;
  country?: string;
  matchHistory: number[];
  checkoutHistory: number[];
}

// Helper to sum up an array
const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

export default function Scoreboard() {
  const STARTING_SCORE = 501;

  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "THE POWER", throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, isEnabled: true },
    { id: 2, name: "MIGHTY MIKE", throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, isEnabled: true },
    { id: 3, name: "SNAKEBITE", throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, isEnabled: true },
    { id: 4, name: "FOURTG", throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, isEnabled: false  },
  ]);

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);

  const resetThrows = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) => {
        return { ...p, throws: [] };
      })
    );
  };

const handleLegWin = (winner: Player, winningThrowScore: number) => {
  const LEGS_TO_WIN_SET = 3;
  
  const enabledPlayers = players.filter(p => p.isEnabled);
  const activeCount = enabledPlayers.length;
  const totalSets = enabledPlayers.reduce((sum, p) => sum + p.sets, 0);
  const totalLegsCurrentSet = enabledPlayers.reduce((sum, p) => sum + p.legs, 0);

  console.log(winner.legs + 1 >= LEGS_TO_WIN_SET);
  const isSetWin = winner.legs + 1 >= LEGS_TO_WIN_SET;

  let nextStarterRelativeIndex = 0;

  if (isSetWin) {
    // Start of Set
    nextStarterRelativeIndex = (totalSets + 1) % activeCount;
  } else {
    // Start of Leg
    const setStarterRelativeIndex = totalSets % activeCount;
    const legsPlayedIncludingThisOne = totalLegsCurrentSet + 1;
    nextStarterRelativeIndex = (setStarterRelativeIndex + legsPlayedIncludingThisOne) % activeCount;
  }

  // Convert "2nd active player" -> "Real Index in main array"
  const nextStarterPlayer = enabledPlayers[nextStarterRelativeIndex];
  const nextStarterRealIndex = players.findIndex(p => p.id === nextStarterPlayer.id);

  // Update State
  setPlayers((prevPlayers) =>
    prevPlayers.map((p) => {
      if (p.id === winner.id) {
          if (isSetWin)
            return { 
              ...p, 
              legs: 0,
              sets: p.sets + 1, 
              throws: [],
              matchHistory: [...p.matchHistory, winningThrowScore],
              checkoutHistory: [...p.checkoutHistory, winningThrowScore] 
            }; 
          return { 
            ...p, 
            legs: p.legs + 1, 
            throws: [],
            matchHistory: [...p.matchHistory, winningThrowScore],
            checkoutHistory: [...p.checkoutHistory, winningThrowScore] 
          };
      }
      if (isSetWin) return { ...p, legs: 0, throws: [] };
      return { ...p, throws: [] };
    })
  );

  setActivePlayerIndex(nextStarterRealIndex);
};

  const handleScoreSubmit = (score: number) => {
    const currentPlayer = players[activePlayerIndex];
    const currentTotal = sum(currentPlayer.throws);
    const newTotal = currentTotal + score;

    // WIN
    if (newTotal === STARTING_SCORE) {
      handleLegWin(currentPlayer, score);
      return;
    }

    // BUST
    if (newTotal > STARTING_SCORE) {
      // Switch turns immediately without adding the score
      setActivePlayerIndex(activePlayerIndex === 0 ? 1 : 0);
      return;
    }

    // Normal Throw
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player, index) => {
        if (index === activePlayerIndex) {
          return {
            ...player,
            throws: [...player.throws, score], // For calculating 501
            matchHistory: [...player.matchHistory, score] // For Stats (Never deleted)
          };
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
    // TODO
    console.log("Undo logic placeholder");
  };

  return (
    <div className="flex items-center w-full">
      {/* PLAYERS GRID */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 w-full">
        {players.map((player, index) => {
          if (!player.isEnabled) return null;

          const currentScore = STARTING_SCORE - sum(player.throws);

          return (
            <div key={player.id} className="flex flex-col items-center w-80">
              <PlayerScore
                name={player.name}
                score={currentScore}
                sets={player.sets}
                legs={player.legs}
                isActive={index === activePlayerIndex}
              />    

              <div className="flex h-15 mb-5 w-full justify-center">
                {currentScore <= 170 && (
                  <CheckoutGuide score={currentScore} />
                )} 
              </div>

              {/* deatiled stats below the card */}
              <div className="flex gap-20 text-gray-500 font-mono text-sm mb-5">
                <PlayerStats 
                  history={player.matchHistory} 
                  checkouts={player.checkoutHistory} 
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* input section */}
      <div className="fixed bottom-0 w-full flex flex-col items-center justify-center pb-8 pt-14 max-lg:scale-75 max-lg:pb-2">
        <ScoreInput
          currentPlayerName={players[activePlayerIndex].name}
          onSubmit={handleScoreSubmit}
        />
      </div>
    </div>
  );
}
