"use client";

export const isMobile = () => {
    if (typeof window !== "undefined")
    {
        if(window.matchMedia("(any-hover:none)").matches) {
            return true;
        } else {
            return false;
        }
    }
};