'use client';
import Image from "next/image";
import Topbar from "./components/Topbar";
import Scoreboard from "./components/Scoreboard";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center text-primary justify-center font-sans bg-background">

      <Topbar />

      <main className="flex min-h-screen w-full flex-col items-center justify-between py-30 px-16 bg-background sm:items-start">

      <Scoreboard />

      </main>

    </div>
  );
}