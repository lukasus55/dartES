"use client";
import { useRef, useEffect } from "react";
import Scoreboard, { ScoreboardHandle } from "./components/Scoreboard"; // Import the type too
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import applyTheme from "./utils/applyTheme";

export default function Home() {

  useEffect(() => {
    applyTheme();
  }, []);

  const scoreboardRef = useRef<ScoreboardHandle>(null);

  return (
    <div className="flex min-h-screen items-center text-primary justify-center font-sans bg-background flex-wrap">

      <Topbar onReset={() => scoreboardRef.current?.resetMatch()} />

      <main className="flex min-h-screen w-full flex-col items-center justify-between py-30 px-4 bg-background sm:items-start">

      <Scoreboard ref={scoreboardRef} />

      </main>

      <Footer />

    </div>
  );
}