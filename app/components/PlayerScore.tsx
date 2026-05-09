import { Bot, Circle } from "lucide-react";

interface PlayerScoreProps {
  name: string;
  score: number;
  sets: number;
  legs: number;
  isActive: boolean;
  isBot: boolean;
}

export default function PlayerScore({
  name = "Player",
  score = 501,
  sets = 0,
  legs = 0,
  isActive = false,
  isBot = false,
}: PlayerScoreProps) {
  return (
    <div
      className={`
        flex w-full rounded-2xl flex-wrap flex-col py-6
        transition-all duration-300 border-2
        ${
          isActive
            ? "border-customizableAccent bg-customizableHighlight"
            : "border-transparent bg-transparent"
        }
      `}
    >
      <div className="flex w-full items-center justify-center text-3xl font-bold text-customizableAccent gap-2">
        {isBot && <Bot/>} {name}
        {isActive && (
          <span className="text-customizableAccent">
            {" "}
            <Circle fill="var(--customizableAccent)" size={16} />{" "}
          </span>
        )}
      </div>

      <div className="flex w-full justify-center text-8xl font-black text-customizablePrimary">
        {score}
      </div>

      {/* stats section */}
      <div className="flex w-full mt-10">
        <div className="flex w-1/2 justify-end text-2xl font-bold text-customizableAccent">
          SETS
        </div>
        <div className="flex w-1/2 justify-start px-5 text-2xl font-bold text-customizablePrimary">
          {sets}
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex w-1/2 justify-end text-2xl font-bold text-customizableAccent">
          LEGS
        </div>
        <div className="flex w-1/2 justify-start px-5 text-2xl font-bold text-customizablePrimary">
          {legs}
        </div>
      </div>
    </div>
  );
}
