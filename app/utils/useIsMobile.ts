import { useState, useEffect } from "react";

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const checkMobile = () => {
        const isTouch = window.matchMedia("(any-hover:none)").matches;
        setIsMobile(isTouch);
    };

    checkMobile();

    // listener to update if the user attaches a mouse to a device mid-session (rare, but can happen)
    const mediaQuery = window.matchMedia("(any-hover:none)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }
    }, []);

    return isMobile;
}