interface PlayerScoreProps {
  name: string;
  score: number;
  sets: number;
  legs: number;
  isActive: boolean;
}

export default function PlayerScore({ name="Player", score=501, sets=0, legs=0, isActive=false }: PlayerScoreProps) {
  return (
    <div 
      className={`
        flex min-w-80 mx-5 p-6 rounded-2xl flex-wrap flex-col
        transition-all duration-300 border-2
        ${isActive 
          ? 'border-accent bg-gray-800/50'
          : 'border-transparent bg-transparent'
        }
      `}
    >
      <div className="flex w-full justify-center text-3xl font-bold text-accent">
        {name}
        {/* visual indicator for color blind accessibility */}
        {isActive && <span className="ml-2 text-accent animate-pulse">●</span>}
      </div>
      
      <div className="flex w-full justify-center text-8xl font-black text-primary"> 
        {score} 
      </div>

      {/* stats section */}
      <div className="flex w-full mt-10">
        <div className="flex w-1/2 justify-end text-2xl font-bold text-accent">SETS</div>
        <div className="flex w-1/2 justify-start px-5 text-2xl font-bold text-primary">{sets}</div>
      </div>
      <div className="flex w-full">
        <div className="flex w-1/2 justify-end text-2xl font-bold text-accent">LEGS</div>
        <div className="flex w-1/2 justify-start px-5 text-2xl font-bold text-primary">{legs}</div>
      </div>
    </div>
  );
}