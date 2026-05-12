"use client";

import { useEffect, type RefObject } from "react";

export function useClosePopup<T extends HTMLElement>(popupRef: RefObject<T | null>, onClose: () => void) {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("mouseup", handleOutsideClick);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mouseup", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [popupRef, onClose]);
}
