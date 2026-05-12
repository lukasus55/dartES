import Dart from "../utils/Dart"; // Adjust path as needed

interface ThrownDartProps {
    dart: Dart;
}

export default function ThrownDart({ dart }: ThrownDartProps) {
    const svgX = dart.x;
    const svgY = -dart.y;

    return (
        <g className="transition-all duration-300 ease-out animate-in fade-in zoom-in">
            {/* Border */}
            <circle cx={svgX} cy={svgY} r="10" fill="#000000" />

            {/* Outer */}
            <circle cx={svgX} cy={svgY} r="8" fill="var(--boardHit)" />

            <title>
                Hit: {dart.hitResult}
            </title>
        </g>
    );
}