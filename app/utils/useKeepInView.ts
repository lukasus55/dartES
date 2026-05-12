// app/utils/useKeepInView.ts
"use client";

import { useEffect, type RefObject } from "react";

export function useKeepInView<T extends HTMLElement>(popupRef: RefObject<T | null>) {
    useEffect(() => {
        const element = popupRef.current;
        if (!element) return;

        const adjustPosition = () => {
            // Reset any previous transforms to get accurate measurements
            element.style.transform = "none";
            
            const rect = element.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let shiftX = 0;
            let shiftY = 0;

            const padding = 12;

            // Check Right edge
            if (rect.right > viewportWidth) {
                shiftX = viewportWidth - rect.right - padding;
            }
            // Check Left edge
            else if (rect.left < 0) {
                shiftX = -rect.left + padding;
            }

            // Check Bottom edge
            if (rect.bottom > viewportHeight) {
                shiftY = viewportHeight - rect.bottom - padding;
            }
            // Check Top edge
            else if (rect.top < 0) {
                shiftY = -rect.top + padding;
            }

            if (shiftX !== 0 || shiftY !== 0) {
                element.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
            }
        };

        adjustPosition();

        window.addEventListener("resize", adjustPosition);
        return () => window.removeEventListener("resize", adjustPosition);
    }, [popupRef]);
}