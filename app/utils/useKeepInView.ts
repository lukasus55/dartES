import { useEffect, type RefObject } from "react";

export function useKeepInView<T extends HTMLElement>(popupRef: RefObject<T | null>, customContainerRef?: RefObject<T | null>) {

    useEffect(() => {
        const element = popupRef.current;
        const cElement = customContainerRef?.current;
        if (!element) return;

        const adjustPosition = () => {
            // Reset any previous transforms to get accurate measurements
            element.style.transform = "none";            

            const viewportWidth = cElement ? cElement.clientWidth : window.innerWidth;
            const viewportHeight = cElement ? cElement.clientHeight : window.innerWidth;
            
            const rect = element.getBoundingClientRect();

            const offsetWidth = cElement?.getBoundingClientRect().x || 0;
            const offsetHeight = cElement?.getBoundingClientRect().y || 0;

            let shiftX = 0;
            let shiftY = 0;

            const padding = 12;

            // Check Right edge
            if (rect.right-offsetWidth > viewportWidth) {
                shiftX = viewportWidth - rect.right - padding;
            }
            // Check Left edge
            else if (rect.left-offsetWidth < 0) {
                shiftX = -rect.left + padding;
            }

            // Check Bottom edge
            if (rect.bottom-offsetHeight > viewportHeight) {
                shiftY = viewportHeight - rect.bottom - padding;
            }
            // Check Top edge
            else if (rect.top-offsetHeight < 0) {
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