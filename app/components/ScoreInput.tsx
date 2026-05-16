"use client";

import ScoreInputDesktop from "./ScoreInputDesktop";
import ScoreInputMobile from "./ScoreInputMobile";
import { useIsMobile } from "../utils/useIsMobile";
import ScoreInputBot from "./ScoreInputBot";
import { PlayerWithResults } from "./Scoreboard";

interface ScoreInputProps {
  handleScoreSubmit: (score: number) => void;
  handleUndo: () => void;
  player: PlayerWithResults;
}

export default function ScoreInput({
  handleScoreSubmit,
  handleUndo,
  player,
}: ScoreInputProps) {
  
  const isMobile = useIsMobile();

  if(!player.isEnabled) return;

  return (
    <>
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
              currentPlayerName={player.name}
            />
          ) : (
            <ScoreInputDesktop 
              onSubmit={handleScoreSubmit} 
              currentPlayerName={player.name}
            />
          )
        )
      }
    </>
  );
}