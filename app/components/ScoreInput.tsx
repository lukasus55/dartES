"use client";

import ScoreInputDesktop from "./ScoreInputDesktop";
import { isMobile } from "../utils/helpers";
import ScoreInputMobile from "./ScoreInputMobile";

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

  return (
    <>
      { 
        isMobile() ? 
        <ScoreInputMobile onSubmit={onSubmit} onUndo={onUndo} currentPlayerName={currentPlayerName}/> : <ScoreInputDesktop onSubmit={onSubmit} currentPlayerName={currentPlayerName}/>
      }
    </>
  );
}