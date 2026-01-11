"use client";
import { useState } from "react";
import { Undo2 } from "lucide-react";
import PlayerScore from "./PlayerScore";
import ScoreInput from "./ScoreInput";
import PlayerStats from "./PlayerStats";
import CheckoutGuide from "./CheckoutGuide";
import IconButton from "./IconButton";

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

interface GameStateSnapshot {
  players: Player[];
  activePlayerIndex: number;
}

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

export default function Scoreboard() {
  const STARTING_SCORE = 501;

  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "PLAYER 1", throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, isEnabled: true },
    { id: 2, name: "PLAYER 2", throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, isEnabled: true },
    { id: 3, name: "PLAYER 3", throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, isEnabled: true },
    { id: 4, name: "PLAYER 4", throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, isEnabled: false  },
  ]);

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  
  const [historyStack, setHistoryStack] = useState<GameStateSnapshot[]>([]);

  // UNDO LOGIC
  const saveHistory = () => {
    // Create a deep copy of the current state
    const snapshot: GameStateSnapshot = {
      players: JSON.parse(JSON.stringify(players)), 
      activePlayerIndex: activePlayerIndex,
    };
    setHistoryStack((prev) => [...prev, snapshot]);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;

    const lastState = historyStack[historyStack.length - 1];
    
    // Restore state
    setPlayers(lastState.players);
    setActivePlayerIndex(lastState.activePlayerIndex);
    
    setHistoryStack((prev) => prev.slice(0, -1));
  };

  const handleLegWin = (winner: Player, winningThrowScore: number) => {
    const LEGS_TO_WIN_SET = 3;
    const enabledPlayers = players.filter(p => p.isEnabled);
    const activeCount = enabledPlayers.length;
    const totalSets = enabledPlayers.reduce((sum, p) => sum + p.sets, 0);
    const totalLegsCurrentSet = enabledPlayers.reduce((sum, p) => sum + p.legs, 0);
    const isSetWin = winner.legs + 1 >= LEGS_TO_WIN_SET;

    let nextStarterRelativeIndex = 0;
    if (isSetWin) {
      nextStarterRelativeIndex = (totalSets + 1) % activeCount;
    } else {
      const setStarterRelativeIndex = totalSets % activeCount;
      const legsPlayedIncludingThisOne = totalLegsCurrentSet + 1;
      nextStarterRelativeIndex = (setStarterRelativeIndex + legsPlayedIncludingThisOne) % activeCount;
    }

    const nextStarterPlayer = enabledPlayers[nextStarterRelativeIndex];
    const nextStarterRealIndex = players.findIndex(p => p.id === nextStarterPlayer.id);

    setPlayers((prevPlayers) =>
      prevPlayers.map((p) => {
        if (p.id === winner.id) {
          if (isSetWin)
            return { 
              ...p, legs: 0, sets: p.sets + 1, throws: [],
              matchHistory: [...p.matchHistory, winningThrowScore],
              checkoutHistory: [...p.checkoutHistory, winningThrowScore] 
            }; 
          return { 
            ...p, legs: p.legs + 1, throws: [],
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
    saveHistory();

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
      let nextIndex = (activePlayerIndex + 1) % players.length;
      while (!players[nextIndex].isEnabled) {
        nextIndex = (nextIndex + 1) % players.length;
      }
      setActivePlayerIndex(nextIndex);
      return;
    }

    setPlayers((prevPlayers) => {
      return prevPlayers.map((player, index) => {
        if (index === activePlayerIndex) {
          return {
            ...player,
            throws: [...player.throws, score],
            matchHistory: [...player.matchHistory, score]
          };
        }
        return player;
      });
    });

    let nextIndex = (activePlayerIndex + 1) % players.length;
    while (!players[nextIndex].isEnabled) {
      nextIndex = (nextIndex + 1) % players.length;
    }
    setActivePlayerIndex(nextIndex);
  };

  return (
    <div className="flex items-center w-full">
      
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

      {/* INPUT SECTION */}
      <div className="fixed bottom-0 w-full flex flex-col items-center justify-center pb-8 pt-14 max-lg:scale-75 max-lg:pb-2 z-50">
        
        <div className="relative flex items-end justify-center gap-4">
          
          {/* UNDO BUTTON */}

          <div className="mb-3">
            <IconButton icon={Undo2} label="Undo" onClick={handleUndo}/>
          </div>
          
          <ScoreInput
            currentPlayerName={players[activePlayerIndex].name}
            onSubmit={handleScoreSubmit}
          />
        </div>
      </div>
    </div>
  );
}