"use client";
import { useRef, useEffect } from "react";
import Scoreboard, { ScoreboardHandle } from "./components/Scoreboard"; // Import the type too
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

export default function Home() {

  useEffect(() => {
    const savedConfig = localStorage.getItem("darts_app_theme_config");
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      if (parsed.primary) document.documentElement.style.setProperty("--customizablePrimary", parsed.primary);
      if (parsed.secondary) document.documentElement.style.setProperty("--customizableSecondary", parsed.secondary);
      if (parsed.accent) document.documentElement.style.setProperty("--customizableAccent", parsed.accent);
    }
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