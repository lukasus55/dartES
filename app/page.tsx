"use client";
import { useRef, useEffect } from "react";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import applyTheme from "./utils/applyTheme";
import ScoreboardContainer, { ScoreboardHandle } from "./components/ScoreboardContainer";

export default function Home() {

  useEffect(() => {
    applyTheme();
  }, []);

  const scoreboardRef = useRef<ScoreboardHandle>(null);

  return (
    <div className="flex min-h-screen items-center text-primary justify-center font-sans bg-background flex-wrap">

      <Topbar onReset={() => scoreboardRef.current?.resetMatch()} />

      <main className="flex min-h-screen w-full flex-col items-center justify-between py-30 px-4 bg-background sm:items-start">

      <ScoreboardContainer ref={scoreboardRef} />

      </main>

      <Footer />

    </div>
  );
}