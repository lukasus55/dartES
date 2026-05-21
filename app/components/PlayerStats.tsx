import { useMemo } from 'react';
import { PlayerWithResults } from './ScoreboardContainer';

interface PlayerStatsProps {
  player: PlayerWithResults;
}

export default function PlayerStats({ player }: PlayerStatsProps) {

  const throws = player.throws;
  const checkouts = player.checkoutHistory;
  
  // Get the last throw to determine which stat just updated
  const lastThrow = throws.length > 0 ? throws[throws.length - 1] : 0;

  // Helper function to conditionally apply the highlight class
  const getStyle = (condition: boolean) => {
    return condition 
      ? "text-customizableAccent font-bold scale-110 transition-all duration-300 inline-block" // Active Style
      : "text-customizablePrimary"; // Default Style
  };

  const sum = throws.reduce((a, b) => a + b, 0);
  const avg = throws.length ? (sum / throws.length).toFixed(1) : "0.0";
  const dartsThrown = throws.length * 3;

  const highestFinish = checkouts.length > 0 ? Math.max(...checkouts) : 0;
  
  // Highlight if the LAST throw set a new High Finish record
  const isNewHighFinish = lastThrow === highestFinish && checkouts.includes(lastThrow);

  const s180 = throws.filter(s => s === 180).length;
  const s170Plus = throws.filter(s => s >= 170 && s < 180).length;
  const s160Plus = throws.filter(s => s >= 160 && s < 170).length;
  const s140Plus = throws.filter(s => s >= 140 && s < 160).length;
  const s120Plus = throws.filter(s => s >= 120 && s < 140).length;
  const s100Plus = throws.filter(s => s >= 100 && s < 120).length;
  const s80Plus = throws.filter(s => s >= 80 && s < 100).length;
  const s60Plus = throws.filter(s => s >= 60 && s < 80).length;
  const s40Plus = throws.filter(s => s >= 40 && s < 60).length;

  return (
    <div className="flex flex-col gap-2 min-w-80 mx-5 p-4 text-xs font-mono text-customizableSecondary">
      
      <div className="flex justify-between border-b pb-2 mb-2">
        <div>Last: <span className="text-customizablePrimary text-sm">{lastThrow}</span></div>
        <div>AVG: <span className="text-customizablePrimary text-sm">{avg}</span></div>
        <div>Darts: <span className="text-customizablePrimary text-sm">{dartsThrown}</span></div>
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-1 border-b pb-4 mb-2">
        
        <div className="flex justify-between">
          <span>40+</span> 
          <span className={getStyle(lastThrow >= 40 && lastThrow < 60)}>{s40Plus}</span>
        </div>

        <div className="flex justify-between">
          <span>100+</span> 
          <span className={getStyle(lastThrow >= 100 && lastThrow < 120)}>{s100Plus}</span>
        </div>

        <div className="flex justify-between">
          <span>160+</span> 
          <span className={getStyle(lastThrow >= 160 && lastThrow < 170)}>{s160Plus}</span>
        </div>

        <div className="flex justify-between">
          <span>60+</span> 
          <span className={getStyle(lastThrow >= 60 && lastThrow < 80)}>{s60Plus}</span>
        </div>

        <div className="flex justify-between">
          <span>120+</span> 
          <span className={getStyle(lastThrow >= 120 && lastThrow < 140)}>{s120Plus}</span>
        </div>

        <div className="flex justify-between">
          <span>170+</span> 
          <span className={getStyle(lastThrow >= 170 && lastThrow < 180)}>{s170Plus}</span>
        </div>
        
        <div className="flex justify-between">
          <span>80+</span> 
          <span className={getStyle(lastThrow >= 80 && lastThrow < 100)}>{s80Plus}</span>
        </div>

        <div className="flex justify-between">
          <span>140+</span> 
          <span className={getStyle(lastThrow >= 140 && lastThrow < 160)}>{s140Plus}</span>
        </div>

        <div className="flex justify-between">
          <span>180</span> 
          <span className={getStyle(lastThrow === 180)}>{s180}</span>
        </div>

      </div>

      <div className="flex justify-between">
        <div>  </div>
        <div>
          Hi-Fin:{" "}
          <span className={isNewHighFinish ? "text-customizableAccent font-bold" : "text-customizablePrimary"}>
            {highestFinish > 0 ? highestFinish : "-"}
          </span>
        </div>
        <div> </div>
      </div>

    </div>
  );
}