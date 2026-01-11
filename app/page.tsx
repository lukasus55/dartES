"use client";
import { useRef } from "react";
import Scoreboard, { ScoreboardHandle } from "./components/Scoreboard"; // Import the type too
import Topbar from "./components/Topbar";

export default function Home() {

  const scoreboardRef = useRef<ScoreboardHandle>(null);

  return (
    <div className="flex min-h-screen items-center text-primary justify-center font-sans bg-background">

      <Topbar onReset={() => scoreboardRef.current?.resetMatch()} />

      <main className="flex min-h-screen w-full flex-col items-center justify-between py-30 px-4 bg-background sm:items-start">

      <Scoreboard ref={scoreboardRef} />

      </main>

    </div>
  );
}