"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmationPopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationPopup({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationPopupProps) {
  if (!isOpen) return null;

return (
<div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div
    className="
    w-[90%] max-w-sm p-6 
    bg-neutral-950 border border-neutral-800 rounded-2xl 
    shadow-2xl shadow-neutral-900/50
    "
    >
    <div className="flex flex-col gap-4 text-center">
        <div className="mx-auto p-3 rounded-full bg-red-500/10 text-red-500">
        <AlertTriangle size={24} strokeWidth={2.5} />
        </div>

        <div className="space-y-1">
        <h3 className="text-lg font-bold text-white tracking-wide">
            {title}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
            {message}
        </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
        <button
            onClick={onCancel}
            className="
            px-4 py-2.5 rounded-xl font-medium text-sm cursor-pointer
            bg-neutral-900 text-neutral-300 border border-neutral-800
            hover:bg-neutral-800 hover:text-white transition-colors
        "
        >
            Cancel
        </button>
        <button
            onClick={onConfirm}
            className="
            px-4 py-2.5 rounded-xl font-bold text-sm cursor-pointer
            bg-red-500/10 text-red-500 border border-red-500/20
            hover:bg-red-500 hover:text-white transition-all
        "
        >
            Confirm
        </button>
        </div>
    </div>
    </div>
</div>
);
}
