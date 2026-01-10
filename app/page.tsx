'use client';
import Image from "next/image";
import Topbar from "./components/Topbar";
import NormalMode from "./components/NormalMode";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center text-primary justify-center font-sans bg-background">

      <Topbar />

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-40 px-16 bg-background sm:items-start">

      <NormalMode />

      </main>

    </div>
  );
}