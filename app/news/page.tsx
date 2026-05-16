"use client"

import BackButton from "../components/BackButton";
import UpdatesContainer from "./components/UpdatesContainer";

export default function NewsPreviews() {
    return (
        <div className="flex min-h-screen py-15 text-primary justify-center font-sans bg-background flex-wrap px-8">

        <div className="w-1/2 max-lg:w-full">
            <header>
                <BackButton/>
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