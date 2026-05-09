"use client";

import ScoreInputDesktop from "./ScoreInputDesktop";
import ScoreInputMobile from "./ScoreInputMobile";
import { useIsMobile } from "../utils/useIsMobile";
import { Player } from "../utils/configStorage";
import ScoreInputBot from "./Customization/ScoreInputBot";
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