'use client';
import { useState } from 'react';
import PlayerScore from './PlayerScore';

export default function Scoreboard() {
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);

  return (
    <div className="flex w-full flex-row justify-center items-center">
      
      {/* Click to test switching */}
      <div onClick={() => setActivePlayerIndex(0)} className="cursor-pointer">
        <PlayerScore 
          name="PLAYER 1" 
          score={501} 
          sets={1} 
          legs={2} 
          isActive={activePlayerIndex === 0} 
        />
      </div>

      <div className="text-gray-600 font-bold text-2xl">VS</div>

      <div onClick={() => setActivePlayerIndex(1)} className="cursor-pointer">
        <PlayerScore 
          name="PLAYER 2" 
          score={342} 
          sets={0} 
          legs={1} 
          isActive={activePlayerIndex === 1} 
        />
      </div>

    </div>
  );
}