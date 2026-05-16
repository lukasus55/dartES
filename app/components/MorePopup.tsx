"use client";

import { useRef } from "react";
import { TvMinimal, FileSpreadsheet, Megaphone } from "lucide-react";
import Link from "next/link";
import { useClosePopup } from "@/app/utils/useClosePopup";
import { exportMatchToExcel } from "../utils/exportMatchToExcel";
import { useKeepInView } from "../utils/useKeepInView";

export default function MorePopup({ onClose }: { onClose: () => void; }) {
    const popupRef = useRef<HTMLDivElement>(null);
    useClosePopup(popupRef, onClose);
    useKeepInView(popupRef)

    return (
        <div
        ref={popupRef}
        className="absolute z-60 left-3/4 flex flex-col gap-1 p-3 min-w-55 mt-2
        bg-neutral-950 border-2 border-neutral-800 rounded-2xl shadow-2xl shadow-neutral-900/50
        max-h-[80vh] overflow-y-auto no-scrollbar"
        >

            <button className="flex items-center gap-2 hover:bg-neutral-800 rounded-sm px-2 py-1 cursor-pointer w-full" onClick={exportMatchToExcel}>
                <FileSpreadsheet size={14} strokeWidth={2.5} /> Export to .xlsx
            </button>

            <div className="mt-1 mb-0.75 pb-px bg-neutral-700"></div>

            <Link href={"/news"}>
                <button className="flex items-center gap-2 hover:bg-neutral-800 rounded-sm px-2 py-1 cursor-pointer w-full">
                    <Megaphone size={14} strokeWidth={2.5} /> What's New
                </button>
            </Link>

            <Link href={"/setup"}>
                <button className="flex items-center gap-2 hover:bg-neutral-800 rounded-sm px-2 py-1 cursor-pointer w-full">
                    <TvMinimal size={14} strokeWidth={2.5} /> Broadcast
                </button>
            </Link>
            
        </div>
    );
}