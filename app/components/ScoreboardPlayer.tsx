"use client"
import PlayerScore from "./PlayerScore";
import CheckoutGuide from "./CheckoutGuide";
import PlayerStats from "./PlayerStats";
import { PlayerWithResults } from "./ScoreboardContainer";
import { sum } from "../utils/helpers";
interface ScoreboardPlayerProps {
  player: PlayerWithResults;
  currentScore: number;
  isActive: boolean;
}
export default function ScoreboardPlayer({ player, currentScore, isActive }: ScoreboardPlayerProps) {
  
  const displayedScore = currentScore - sum(player.previewThrows);

  return (
          <div key={player.id} className="flex flex-col items-center w-80">
            <PlayerScore
              name={player.name}
              score={displayedScore}
              sets={player.sets}
              legs={player.legs}
              isActive={isActive}
              isBot={player.isBot}
            />    

            <div className="flex h-15 mb-5 w-full justify-center">
              {currentScore <= 170 && (
                <CheckoutGuide score={displayedScore} />
              )} 
            </div>

            <div className="flex gap-20 text-gray-500 font-mono text-sm mb-5">
              <PlayerStats 
                player={player} 
              />
            </div>
          </div>
  );

}