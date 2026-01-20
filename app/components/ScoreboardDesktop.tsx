"use client"
import PlayerScore from "./PlayerScore";
import CheckoutGuide from "./CheckoutGuide";
import PlayerStats from "./PlayerStats";

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

interface ScoreboardDesktopProps {
  player: Player;
  currentScore: number;
  isActive: boolean;
}
export default function ScoreboardDesktop({ player, currentScore, isActive }: ScoreboardDesktopProps) {

    return (
            <div key={player.id} className="flex flex-col items-center w-80">
              <PlayerScore
                name={player.name}
                score={currentScore}
                sets={player.sets}
                legs={player.legs}
                isActive={isActive}
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
}