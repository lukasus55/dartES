"use client";

import ScoreInputDesktop from "./ScoreInputDesktop";
import ScoreInputMobile from "./ScoreInputMobile";
import { useIsMobile } from "../utils/useIsMobile";
import ScoreInputBot from "./ScoreInputBot";
import { PlayerWithResults } from "./Scoreboard";
import InputModeButton from "./InputModeButton";

interface ScoreInputProps {
  handleScoreSubmit: (score: number) => void;
  handleUndo: () => void;
  toggleInputMode: () => void;
  inputSingleMode: boolean;
  player: PlayerWithResults;
}

export default function ScoreInput({handleScoreSubmit, handleUndo, toggleInputMode, inputSingleMode, player}: ScoreInputProps) {
  
  const isMobile = useIsMobile();

  if(!player.isEnabled) return;

  const ModeButton = () => <InputModeButton toggleInputMode={toggleInputMode} inputSingleMode={inputSingleMode} />

  return (
    <div className="relative flex items-end justify-center">
      {player.isBot ?
        (
          <ScoreInputBot
            handleScoreSubmit={handleScoreSubmit}
            player={player}
          />
        ) : (
          isMobile ? (
            <ScoreInputMobile 
              onSubmit={handleScoreSubmit} 
              onUndo={handleUndo} 
              currentPlayer={player}
              ModeButton={ModeButton}
            />
          ) : (
            <ScoreInputDesktop 
              onSubmit={handleScoreSubmit}
              onUndo={handleUndo}
              currentPlayer={player}
              ModeButton={ModeButton}
            />
          )
        )
      }
    </div>
  );
}