"use client";

import { useRef } from "react";
import { TvMinimal, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { useClosePopup } from "@/app/utils/useClosePopup";
import { exportMatchToExcel } from "../utils/exportMatchToExcel";

export default function MorePopup({ onClose }: { onClose: () => void; }) {
    const popupRef = useRef<HTMLDivElement>(null);
    useClosePopup(popupRef, onClose);

    return (
        <div
        ref={popupRef}
        className="absolute left-3/4 flex flex-col gap-2 p-3 min-w-55
        bg-neutral-950 border-2 border-neutral-800 rounded-2xl shadow-2xl shadow-neutral-900/50
        backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200 z-50
        max-h-[80vh] overflow-y-auto no-scrollbar"
        >

            <Link href={"/setup"}>
                <button className="flex items-center gap-2 hover:bg-neutral-800 rounded-sm px-2 cursor-pointer w-full">
                    <TvMinimal width={14} /> Broadcast
                </button>
            </Link>

            <button className="flex items-center gap-2 hover:bg-neutral-800 rounded-sm px-2 cursor-pointer w-full" onClick={exportMatchToExcel}>
                <FileSpreadsheet width={14} /> Export to .xlsx
            </button>
            
        </div>
    );
}