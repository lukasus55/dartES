"use client";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Undo2 } from "lucide-react";
import PlayerScore from "./PlayerScore";
import ScoreInput from "./ScoreInput";
import PlayerStats from "./PlayerStats";
import CheckoutGuide from "./CheckoutGuide";
import IconButton from "./IconButton";
import ConfirmationPopup from "./ConfirmationPopup";

export interface ScoreboardHandle {
  resetMatch: () => void;
}

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

const MATCH_STORAGE_KEY = "darts_match_snapshot";
const THEME_STORAGE_KEY = "darts_app_theme_config";

const DEFAULT_PLAYERS_CONFIG = [
  { id: 1, name: "PLAYER 1", isEnabled: true },
  { id: 2, name: "PLAYER 2", isEnabled: true },
  { id: 3, name: "PLAYER 3", isEnabled: false },
  { id: 4, name: "PLAYER 4", isEnabled: false },
  { id: 5, name: "PLAYER 5", isEnabled: false },
];

const Scoreboard = forwardRef<ScoreboardHandle>((props, ref) => {
  const [gameSettings, setGameSettings] = useState({
    startingScore: 501,
    legsToWinSet: 3
  });

  const [players, setPlayers] = useState<Player[]>(
    DEFAULT_PLAYERS_CONFIG.map(p => ({
        ...p,
        throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0
    }))
  );

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [historyStack, setHistoryStack] = useState<GameStateSnapshot[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [hideInput, setHideInput] = useState(false);

  // LOAD CONFIG & RESTORE GAME
  useEffect(() => {
    const loadData = () => {
      const themeStr = localStorage.getItem(THEME_STORAGE_KEY);
      let themeConfig: any = null;
      
      if (themeStr) {
        themeConfig = JSON.parse(themeStr);
        setGameSettings({
          startingScore: themeConfig.startingScore || 501,
          legsToWinSet: themeConfig.legsToWinSet || 3
        });
      }

      // Get saved match
      const matchStr = localStorage.getItem(MATCH_STORAGE_KEY);

      if (matchStr) {
        const savedMatch = JSON.parse(matchStr);
        console.log(savedMatch)
        let restoredPlayers: Player[] = savedMatch.players;

        // live update of Names/Enabled status from Settings
        // if you rename "Player 1" to "Mike", it updates the live game.
        if (themeConfig && Array.isArray(themeConfig.players)) {
          restoredPlayers = restoredPlayers.map(p => {
              const configP = themeConfig.players.find((cp: any) => cp.id === p.id);
              return configP ? { ...p, name: configP.name, isEnabled: configP.isEnabled } : p;
          });
        }

        setPlayers(restoredPlayers);
        setActivePlayerIndex(savedMatch.activePlayerIndex || 0);
      } 
      else {
        // --- NEW GAME (From Config) ---
        if (themeConfig && Array.isArray(themeConfig.players)) {
            setPlayers(prev => prev.map(p => {
              const configP = themeConfig.players.find((cp: any) => cp.id === p.id);
              return configP ? { ...p, name: configP.name, isEnabled: configP.isEnabled } : p;
            }));
        }
      }
    };

    loadData();
    window.addEventListener("storage", loadData); // Listen for changes from other tabs/popups
    return () => window.removeEventListener("storage", loadData);
  }, []);

  // Saves game state every time players or active turn changes
  useEffect(() => {
    if (players.length > 0) {
      const snapshot = {
        players,
        activePlayerIndex,
        timestamp: Date.now()
      };
          console.log(snapshot)
      localStorage.setItem(MATCH_STORAGE_KEY, JSON.stringify(snapshot));
    }
  }, [players, activePlayerIndex]);

  // hide input on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const distanceToBottom = totalHeight - scrolledTo;
      if (distanceToBottom < 100) {
        setHideInput(true);
      } else {
        setHideInput(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResetRequest = () => {
    setShowResetConfirm(true);
  };

  const executeReset = () => {
    localStorage.removeItem(MATCH_STORAGE_KEY);

    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        throws: [],
        matchHistory: [],
        checkoutHistory: [],
        sets: 0,
        legs: 0,
      }))
    );
    setActivePlayerIndex(0);
    setHistoryStack([]); 
    setShowResetConfirm(false); 
  };

  const saveHistory = () => {
    const snapshot: GameStateSnapshot = {
      players: JSON.parse(JSON.stringify(players)), 
      activePlayerIndex: activePlayerIndex,
    };
    setHistoryStack((prev) => [...prev, snapshot]);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const lastState = historyStack[historyStack.length - 1];
    setPlayers(lastState.players);
    setActivePlayerIndex(lastState.activePlayerIndex);
    setHistoryStack((prev) => prev.slice(0, -1));
  };

  const handleLegWin = (winner: Player, winningThrowScore: number) => {
    const enabledPlayers = players.filter(p => p.isEnabled);
    const activeCount = enabledPlayers.length;
    const totalSets = enabledPlayers.reduce((sum, p) => sum + p.sets, 0);
    const totalLegsCurrentSet = enabledPlayers.reduce((sum, p) => sum + p.legs, 0);
    
    const isSetWin = winner.legs + 1 >= gameSettings.legsToWinSet;

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

  const handleScoreSubmit = (inputScore: number) => {
    saveHistory();

    const currentPlayer = players[activePlayerIndex];
    const currentTotal = sum(currentPlayer.throws);
    const newTotal = currentTotal + inputScore;

    if (newTotal === gameSettings.startingScore) {
      handleLegWin(currentPlayer, inputScore);
      return;
    }

    let scoreToRecord = inputScore;
    if (newTotal > gameSettings.startingScore) {
       scoreToRecord = 0; // Bust
    } 

    setPlayers((prevPlayers) => {
        return prevPlayers.map((player, index) => {
            if (index === activePlayerIndex) {
                return {
                    ...player,
                    throws: [...player.throws, scoreToRecord],
                    matchHistory: [...player.matchHistory, scoreToRecord]
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

  useImperativeHandle(ref, () => ({
    resetMatch: handleResetRequest 
  }));

  return (
    <div className="flex items-center w-full">
      
      <ConfirmationPopup 
        isOpen={showResetConfirm}
        title="Reset Match?"
        message="This will clear all scores, stats, and history. This action cannot be undone."
        onConfirm={executeReset}
        onCancel={() => setShowResetConfirm(false)}
      />

      <div className="flex flex-wrap justify-center gap-4 mb-32 w-full"> {/* Increased margin bottom to ensure content isn't hidden behind input initially */}
        {players.map((player, index) => {
          if (!player.isEnabled) return null;
          
          const currentScore = gameSettings.startingScore - sum(player.throws);

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

      {/* --- INPUT CONTAINER --- */}
      <div 
        className={`
          fixed bottom-0 w-full flex flex-col items-center justify-center pb-8 pt-14 
          max-lg:scale-75 max-lg:pb-2 z-50 
          transition-all duration-500 ease-in-out
          ${hideInput ? 'translate-y-[120%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
        `}
      >
        <div className="relative flex items-end justify-center gap-4">
          <div className="mb">
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
});

Scoreboard.displayName = "Scoreboard";

export default Scoreboard;