"use client";

import { ExternalLink, Copy, Monitor, AppWindow } from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

export default function SetupPage() {

    const handleLaunch = () => {
        window.open(
            "./broadcast?g",
            "_blank",
            "width=1280,height=720,menubar=no,toolbar=no",
        );
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        
        <div className="flex min-h-screen items-center text-primary justify-center font-sans bg-background flex-wrap">
            <main className="min-h-screen bg-neutral-950 text-white p-8 max-w-5xl mx-auto font-sans w-full my-6">
                {/* HEADER */}
                <header className="mb-12 border-b border-neutral-800 pb-8">
                    <div className="mb-4"><BackButton /></div>
                    <div className="flex justify-between items-center mb-6 flex-wrap">
                        <div>
                            <h1 className="text-4xl font-bold text-primary mb-2">
                                Broadcasting Setup
                            </h1>
                            <p className="text-neutral-400">
                                How to add the scoreboard overlay to OBS, Streamlabs, or vMix.
                            </p>
                        </div>
                    </div>
                </header>

                {/* METHODS GRID */}
                <div className="grid md:grid-cols-1 gap-12">
                    {/* OBS ONLY */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-neutral-800 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full">
                                1
                            </span>
                            <h2 className="text-2xl font-bold">OBS Only Method</h2>
                        </div>
                        <p className="text-neutral-400 text-sm">
                            Best for single-monitor setups. Allows you to control the game{" "}
                            <strong>inside</strong> OBS.
                        </p>

                        {/* STEP 1 */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-primary">
                                1. Add the Controller Dock
                            </h3>
                            <p className="text-sm text-neutral-300">
                                In OBS, go to{" "}
                                <span className="bg-neutral-800 px-1 rounded font-mono text-xs">
                                    Docks
                                </span>{" "}
                                →{" "}
                                <span className="bg-neutral-800 px-1 rounded font-mono text-xs">
                                    Custom Browser Docks...
                                </span>
                            </p>

                            <div className="flex flex-col items-center justify-center text-center">
                                <img src={"./Setup_Method1_Step1.webp"} className="rounded-md" />
                            </div>

                            <div className="bg-black/30 p-3 rounded border border-neutral-800 flex justify-between items-center text-sm">
                                <span className="text-neutral-400">Dock Name:</span>
                                <span className="font-mono">Darts Control</span>
                            </div>
                            <div className="bg-black/30 p-3 rounded border border-neutral-800 flex justify-between items-center text-sm max-[30rem]:text-[0.5rem]">
                                <span className="text-neutral-400">URL:</span>
                                <div className="flex items-center gap-2">
                                    <code className="text-primary">https://lukasus55.github.io/dartES/</code>
                                    <button
                                        onClick={() => copyToClipboard(`https://lukasus55.github.io/dartES/`)}
                                        className="hover:text-white hover:scale-95 active:scale-95 active:text-lime-600"
                                    >
                                        <Copy size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className="space-y-3 mt-8">
                            <h3 className="font-bold text-primary">
                                2. Add the Overlay Source
                            </h3>
                            <p className="text-sm text-neutral-300">
                                Add a new{" "}
                                <span className="font-bold text-white">Browser Source</span> to
                                your scene.
                            </p>

                            <div className="w-full flex flex-col items-center justify-center text-center">
                                <img src={"./Setup_Method1_Step2.webp"} className="rounded-md" />
                            </div>

                            <div className="bg-black/30 p-3 rounded border border-neutral-800 flex justify-between items-center text-sm max-[30rem]:text-[0.5rem]">
                                <span className="text-neutral-400">URL:</span>
                                <div className="flex items-center gap-2">
                                    <code className="text-primary">https://lukasus55.github.io/dartES/broadcast</code>
                                    <button
                                        onClick={() => copyToClipboard(`https://lukasus55.github.io/dartES/broadcast`)}
                                        className="hover:text-white hover:scale-95 active:scale-95 active:text-lime-600"
                                    >
                                        <Copy size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2 text-xs font-mono text-neutral-400">
                                <div className="bg-neutral-900 p-2 rounded text-center">
                                    Width: 1920
                                </div>
                                <div className="bg-neutral-900 p-2 rounded text-center">
                                    Height: 1080
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* WINDOW CAPTURE*/}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-neutral-800 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full">2</span>
                            <h2 className="text-2xl font-bold">Window Capture Method</h2>
                        </div>
                        <p className="text-neutral-400 text-sm">
                            Best for vMix, XSplit, or if you prefer keeping the controller in your browser.
                        </p>

                        {/* STEP 1 */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-primary">1. Launch & Separate</h3>
                            <p className="text-sm text-neutral-300">
                                Click the <span className="text-white font-bold">Launch Window</span> button below. Drag that new window to a separate screen if possible.
                            </p>
                        </div>

                        {/* LAUNCHER */}
                        <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl flex items-center justify-between gap-6 flex-wrap">
                            <div className="flex gap-4 items-center">
                                <div className="bg-primary/20 p-3 rounded-full text-primary max-sm:hidden">
                                    <Monitor size={32} />
                                </div>
                                <div className="flex flex-wrap w-full">
                                    <h3 className="flex w-full font-bold text-lg">Quick Launch Overlay</h3>
                                    <p className="flex w-full text-sm text-neutral-500">
                                        Opens the broadcast view in a clean popup window.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleLaunch}
                                className="flex items-center gap-2 bg-primary hover:bg-lime-600 text-black font-bold py-3 px-6 rounded-lg transition-all active:scale-95 cursor-pointer"
                            >
                                <ExternalLink size={20} />
                                Launch Window
                            </button>
                        </div>

                        {/* STEP 2 */}
                        <div className="space-y-3 mt-4">
                            <h3 className="font-bold text-primary">2. Capture the Window</h3>
                            <p className="text-sm text-neutral-300">
                                In your streaming software, add a <span className="font-bold text-white">Window Capture</span> source and select the broadcast window.
                            </p>
                        </div>

                        <div className="space-y-3 mt-4">
                            <h3 className="font-bold text-primary">3. Green Screen</h3>
                            <p className="text-sm text-neutral-300">
                                Add a <span className="font-bold text-white">Chroma Key</span> filter to remove the background color.
                            </p>
                        </div>


                        <div className="space-y-3 mt-4">
                            <h3 className="font-bold text-primary">4. Control</h3>
                            <p className="text-sm text-neutral-300">
                                Control the game from the <span className="font-bold text-white">Home Page</span> in the same browser as overlay.
                            </p>
                        </div>

                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
