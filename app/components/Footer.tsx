"use client";

import Image from "next/image";
import { Github, Mail } from "lucide-react";
import IconButton from "./IconButton";

export default function Footer() {
return (
<footer className="w-full bg-neutral-950 border-t border-neutral-900 py-8 mt-auto">
    <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
    {/* LEFT: Logo & Author */}
    <div className="flex items-center gap-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
        <Image src="./icon.png" alt="Logo" fill className="object-cover" />
        </div>

        <div className="flex flex-col">
        <span className="text-sm font-bold text-neutral-300 tracking-wide">
            DartES
        </span>
        <span className="text-xs text-neutral-500">
            Created by <span className="text-neutral-400">Łukasz Kostyk</span>
        </span>
        </div>
    </div>

    {/* RIGHT: Contact & Socials */}
    <div className="flex items-center gap-6">

        <div className="flex gap-3">
        <a
            href="https://github.com/lukasus55/dartES"
            target="_blank"
            rel="noopener noreferrer"
        >
            <IconButton icon={Github} label="GitHub" />
        </a>
        <a href="mailto:lukas.kostyk@gmail.com">
            <IconButton icon={Mail} label="Contact" />
        </a>
        </div>
    </div>
    </div>
</footer>
);
}
