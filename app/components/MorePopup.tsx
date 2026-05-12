"use client";

import { useRef } from "react";
import { TvMinimal } from "lucide-react";
import Link from "next/link";
import { useClosePopup } from "@/app/utils/useClosePopup";

export default function MorePopup({ onClose }: { onClose: () => void; }) {
    const popupRef = useRef<HTMLDivElement>(null);
    useClosePopup(popupRef, onClose);

    return (
        <div
            ref={popupRef}
            className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col gap-6 p-3 min-w-55
        bg-neutral-950 border-2 border-neutral-800 rounded-2xl shadow-2xl shadow-neutral-900/50
        backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200 z-50
        max-h-[80vh] overflow-y-auto no-scrollbar"
        >
            <Link href={"/setup"}>
                <div className="flex items-center gap-2 hover:bg-neutral-800 rounded-sm px-2">
                    <TvMinimal width={14} /> Broadcast
                </div>
            </Link>
        </div>
    );
}