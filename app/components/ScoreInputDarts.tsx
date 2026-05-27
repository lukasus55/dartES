import Image from "next/image";
import { useIsMobile } from "../utils/useIsMobile";

export default function ScoreInputDarts({previewThrows} : {previewThrows: number[]}) {
    const dartsRemaining = Math.max(0, 3 - previewThrows.length);
    const isMobile = useIsMobile();

    const fontSize = isMobile ? 12 : 10;

    const icons = Array.from({ length: dartsRemaining }).map((_, i) => (
        <span key={i} className="ml-1"><Image src="/singleDart.svg" alt="Dart icon" width={fontSize} height={fontSize}/></span>
    ));

    return (
        <div className="font-bold text-neutral-500 uppercase tracking-wider flex" style={{ fontSize: fontSize }}>
            Remaining darts: {icons}
        </div>
    );
}