"use client";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Undo2 } from "lucide-react";
import ScoreInput from "./ScoreInput";
import IconButton from "./IconButton";
import ConfirmationPopup from "./ConfirmationPopup";
import { useIsMobile } from "../utils/useIsMobile";
import ScoreboardDesktop from "./ScoreboardDesktop";
import { DEFAULT_PLAYERS, getUserConfig } from "../utils/configStorage";
import { Player } from "../utils/configStorage";

export interface ScoreboardHandle {
  resetMatch: () => void;
}

export type PlayerWithResults = Player & {
  throws: number[];
  sets: number;
  legs: number;
  matchHistory: number[];
  checkoutHistory: number[];
}

type PlayerIndex = 0 | 1 | 2 | 3 | 4;

export type MatchType = {
  activePlayerIndex: PlayerIndex;
  timeStamp: number;
  players: PlayerWithResults[];
}

interface GameStateSnapshot {
  players: PlayerWithResults[];
  activePlayerIndex: number;
}

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

const MATCH_STORAGE_KEY = "dartES_match_snapshot";

const DEFAULT_PLAYERS_CONFIG = DEFAULT_PLAYERS;

const Scoreboard = forwardRef<ScoreboardHandle>((props, ref) => {
  const [gameSettings, setGameSettings] = useState({
    startingScore: 501,
    legsToWinSet: 3
  });

  const [players, setPlayers] = useState<PlayerWithResults[]>(
    DEFAULT_PLAYERS_CONFIG.map(p => ({
        ...p,
        throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0
    }))
  );

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [historyStack, setHistoryStack] = useState<GameStateSnapshot[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [hideInput, setHideInput] = useState(false);
  const [inputSingleMode, setInputSingleMode] = useState(false);
  
  const isMobile = useIsMobile();

  const [isLoaded, setIsLoaded] = useState(false);

  function updateActivePlayerIndex(newIndex: PlayerIndex, players: PlayerWithResults[]) { 
        let i = 0;
        
        while (i < 5){
          if (players[newIndex].isEnabled === true) {
            setActivePlayerIndex(newIndex);
            return;
          }
          i++;
          newIndex = (newIndex+1)%5;
        }

        console.warn("Can't change active player index because there is no enabled player.");
  }

  // LOAD CONFIG & RESTORE GAME
  useEffect(() => {
    const loadData = () => {
      const config = getUserConfig();

      setGameSettings({
        startingScore: config.startingScore,
        legsToWinSet: config.legsToWinSet
      })

      // Get saved match
      const matchStr = localStorage.getItem(MATCH_STORAGE_KEY);

      if (matchStr) {
        const savedMatch: MatchType = JSON.parse(matchStr);
        let restoredPlayers: PlayerWithResults[] = savedMatch.players;

        // live update of Names/Enabled status from Settings
        restoredPlayers = restoredPlayers.map(p => {
            const configP = config.players.find((cp: Player) => cp.id === p.id);
            const restoredPlayer: PlayerWithResults = {...p, ...configP};
            return restoredPlayer;
        });

        setPlayers(restoredPlayers);
        updateActivePlayerIndex(savedMatch.activePlayerIndex, restoredPlayers);
      } 
      else {
        // --- NEW GAME (From Config) ---
        setPlayers(prev => prev.map(p => {
            const configP = config.players.find((cp: Player) => cp.id === p.id);
            const restoredPlayer: PlayerWithResults = configP ? {...p, ...configP} : {...p, ...DEFAULT_PLAYERS_CONFIG};
            return restoredPlayer;
        }));
      }

      setIsLoaded(true);
    };

    loadData();
    window.addEventListener("storage", loadData); 
    return () => window.removeEventListener("storage", loadData);
  }, []);

  // Saves game state
  useEffect(() => {
    if (players.length > 0 && isLoaded === true) {
      const snapshot = {
        players,
        activePlayerIndex,
        timestamp: Date.now()
      };
      localStorage.setItem(MATCH_STORAGE_KEY, JSON.stringify(snapshot));
    }
  }, [players, activePlayerIndex]);

  // hide input on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (players[activePlayerIndex].isBot) return;

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
  }, [gameSettings, isLoaded]);

  const handleResetRequest = () => {
    setShowResetConfirm(true);
  };

  const toggleInputMode = () => {
    setInputSingleMode(!inputSingleMode);
  }

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
    if (historyStack.length < 1) return;

    let lastState = historyStack[historyStack.length - 1];
    console.log(lastState.activePlayerIndex)
    let i: number = 1

    while (players[lastState.activePlayerIndex].isBot === true) {
      i++;
      lastState = historyStack[historyStack.length - i];
      if (lastState === undefined) return; 
    }

    setPlayers(lastState.players);
    setActivePlayerIndex(lastState.activePlayerIndex);
    setHistoryStack((prev) => prev.slice(0, -1));
  };

  const handleLegWin = (winner: PlayerWithResults, winningThrowScore: number) => {
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

    if (newTotal >= gameSettings.startingScore) {
      handleLegWin(currentPlayer, inputScore);
      return;
    }

    let scoreToRecord = inputScore;
    
    // Bust when more than starting score or impossible checkout
    if (newTotal > gameSettings.startingScore || newTotal == gameSettings.startingScore-1) {
      scoreToRecord = 0;
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

  // DISPLAY ORDER
  let displayPlayers = players;

  if (isMobile) {
    const activePlayer = players[activePlayerIndex];
    const otherPlayers = players.filter((_, index) => index !== activePlayerIndex);
    displayPlayers = [activePlayer, ...otherPlayers];
  }

  return (
    <div className="flex items-center w-full">
      
      <ConfirmationPopup 
        isOpen={showResetConfirm}
        title="Reset Match?"
        message="This will clear all scores, stats, and history. This action cannot be undone."
        onConfirm={executeReset}
        onCancel={() => setShowResetConfirm(false)}
      />

      <div className="flex flex-wrap justify-center gap-4 mb-32 w-full">
        {displayPlayers.map((player) => {
          if (!player.isEnabled) return null;
          
          const originalIndex = players.findIndex(p => p.id === player.id);
          const isActive = originalIndex === activePlayerIndex;
          
          const currentScore = gameSettings.startingScore - sum(player.throws);

          return (
            <div key={'ScoreboardDesktop ' + player.id}>
              <ScoreboardDesktop 
                player={player}
                currentScore={currentScore}
                isActive={isActive} 
              />
            </div>
          );
        })}
      </div>

      <div 
        className={`
          fixed bottom-0 left-0 w-full flex flex-col items-center justify-center pb-8 pt-14
          transition-all duration-500 ease-in-out z-50
          ${hideInput ? 'translate-y-[120%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
        `}
      >
        <ScoreInput
          player={players[activePlayerIndex]}
          handleScoreSubmit={handleScoreSubmit}
          handleUndo={handleUndo}
          toggleInputMode={toggleInputMode}
          inputSingleMode={inputSingleMode}
        />
      </div>

    </div>
  );
});

Scoreboard.displayName = "Scoreboard";

export default Scoreboard;