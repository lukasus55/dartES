"use client";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Undo2 } from "lucide-react";
import ScoreInput from "./ScoreInput";
import IconButton from "./IconButton";
import ConfirmationPopup from "./ConfirmationPopup";
import ScoreboardPlayer from "./ScoreboardPlayer";
import { DEFAULT_PLAYERS, getUserConfig } from "../utils/configStorage";
import { Player } from "../utils/configStorage";
import { Scoreboard } from "./Scoreboard";

export interface ScoreboardHandle {
  resetMatch: () => void;
}

export type PlayerWithResults = Player & {
  throws: number[]; // 'throws' is every turn (3 throws). When user type [20, 60, 19] in single mode, and [120, 140] in triple mode the 'throws' is gonna look like this: [99, 120, 140]
  previewThrows: number[];
  sets: number;
  legs: number;
  matchHistory: number[]; // 'matchHistory' is every single action. When user type [20, 60, 19] in single mode, and [120, 140] in triple mode the 'matchHistory' is gonna look like this: [20, 60, 19, 120, 140]
  checkoutHistory: number[];
}

export type GameSettingsType = {
  startingScore: number;
  legsToWinSet: number;
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

const ScoreboardContainer = forwardRef<ScoreboardHandle>((props, ref) => {
  const [gameSettings, setGameSettings] = useState<GameSettingsType>({
    startingScore: 501,
    legsToWinSet: 3
  });

  const [players, setPlayers] = useState<PlayerWithResults[]>(
    DEFAULT_PLAYERS_CONFIG.map(p => ({
        ...p,
        throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, previewThrows: [],
    }))
  );

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [historyStack, setHistoryStack] = useState<GameStateSnapshot[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [inputSingleMode, setInputSingleMode] = useState(false);

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

  const handleResetRequest = () => {
    setShowResetConfirm(true);
  };

  const toggleInputMode = () => {
    setInputSingleMode(!inputSingleMode);
  }

  const executeReset = () => {
    if(localStorage.getItem(MATCH_STORAGE_KEY)) {
      localStorage.removeItem(MATCH_STORAGE_KEY);
    }
    
    setPlayers(
      DEFAULT_PLAYERS_CONFIG.map(p => ({
          ...p,
          throws: [], matchHistory: [], checkoutHistory: [], sets: 0, legs: 0, previewThrows: [],
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
    const currentDartsLeft = 3 - currentPlayer.previewThrows.length;
    const newTotal = currentTotal + inputScore;

    if (newTotal >= gameSettings.startingScore) {
      handleLegWin(currentPlayer, inputScore);
      return;
    }

    let scoreToRecord = inputScore;

    const busted = newTotal > gameSettings.startingScore || newTotal == gameSettings.startingScore-1;
    let previewMode = inputSingleMode && !busted;

    if (previewMode && currentDartsLeft <= 1) {
      scoreToRecord = sum(currentPlayer.previewThrows) + inputScore;
      previewMode = false;
    }

    // Bust when more than starting score or impossible checkout
    if (busted) {
      scoreToRecord = 0;
      previewMode = false;
    } 

    setPlayers((prevPlayers) => {
        return prevPlayers.map((player, index) => {
            if (index === activePlayerIndex) {
                return {
                    ...player,
                    throws: previewMode ? [...player.throws] : [...player.throws, scoreToRecord],
                    previewThrows: previewMode ? [...player.previewThrows, scoreToRecord] : [], // Empty preview throws to prevent from counting them twice.
                    matchHistory: [...player.matchHistory, scoreToRecord]
                };
            }
            return player;
        });
    });

    if (!previewMode) {
      let nextIndex = (activePlayerIndex + 1) % players.length;
      while (!players[nextIndex].isEnabled) {
        nextIndex = (nextIndex + 1) % players.length;
      }
      setActivePlayerIndex(nextIndex);
    }

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

      <Scoreboard activePlayerIndex={activePlayerIndex} players={players} gameSettings={gameSettings} />

      <ScoreInput
        player={players[activePlayerIndex]}
        handleScoreSubmit={handleScoreSubmit}
        handleUndo={handleUndo}
        toggleInputMode={toggleInputMode}
        inputSingleMode={inputSingleMode}
      />

    </div>
  );
});

ScoreboardContainer.displayName = "ScoreboardContainer";

export default ScoreboardContainer;