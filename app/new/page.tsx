"use client"

import Link from "next/link";
import IconButton from "../components/IconButton";
import { ArrowLeft } from "lucide-react";
import UpdatesContainer from "./components/UpdatesContainer";

export default function New() {
    return (
        <div className="flex min-h-screen py-15 text-primary justify-center font-sans bg-background flex-wrap px-8">

        <div className="w-1/2 max-lg:w-full">
            <header>
                <Link
                    href="/"
                    className="text-sm text-neutral-500 hover:text-white transition-colors"
                >
                    <IconButton
                        icon={ArrowLeft}
                        label="Back"
                    />
                </Link>
                <div className="flex justify-between items-center mt-6 flex-wrap">
                    <div>
                        <h1 className="text-4xl font-bold text-primary mb-2 ">
                            What's New?
                        </h1>
                        <p className="text-neutral-400">
                            Here you can see list of last few updates.
                        </p>
                    </div>
                </div>
            </header>

            <main>
                <UpdatesContainer />
            </main>
        </div>

        </div>
    );
}