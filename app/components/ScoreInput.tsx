"use client";

import ScoreInputDesktop from "./ScoreInputDesktop";
import ScoreInputMobile from "./ScoreInputMobile";
import { useIsMobile } from "../utils/useIsMobile";
import ScoreInputBot from "./ScoreInputBot";
import { PlayerWithResults } from "./ScoreboardContainer";
import InputModeButton from "./InputModeButton";
import { useEffect, useState } from "react";

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
  const [hideInput, setHideInput] = useState<boolean>(false);

  // hide input on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (player.isBot) return;

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
  }, [player]);

  return (
    <div 
      className={`
        fixed bottom-0 left-0 w-full flex flex-col items-center justify-center pb-8 pt-14
        transition-all duration-500 ease-in-out z-50
        ${hideInput ? 'translate-y-[120%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
      `}
    >
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
    </div>
  );
}