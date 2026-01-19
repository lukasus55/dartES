"use client";

import ScoreInputDesktop from "./ScoreInputDesktop";
import ScoreInputMobile from "./ScoreInputMobile";
import { useIsMobile } from "../utils/useIsMobile";

interface ScoreInputProps {
  onSubmit: (score: number) => void;
  onUndo: () => void;
  currentPlayerName: string;
}

export default function ScoreInput({
  onSubmit,
  onUndo,
  currentPlayerName,
}: ScoreInputProps) {
  
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <ScoreInputMobile 
          onSubmit={onSubmit} 
          onUndo={onUndo} 
          currentPlayerName={currentPlayerName}
        />
      ) : (
        <ScoreInputDesktop 
          onSubmit={onSubmit} 
          currentPlayerName={currentPlayerName}
        />
      )}
    </>
  );
}