import { Circle } from "lucide-react";
import { useState } from "react";

interface PlayerStatsProps {
  throws: number[];
}

// Helper to sum up an array
const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

export default function PlayerStats({ throws = [] }: PlayerStatsProps) {
  const avg = throws.length
  ? (sum(throws) / throws.length).toFixed(1)
  : "0.0";

  return (
    <div className="flex min-w-80 mx-5 p-6 rounded-2xl flex-wrap flex-col">
      <div>
        AVG: <span className="text-primary">{avg}</span>
      </div>
    </div>
  );
}
