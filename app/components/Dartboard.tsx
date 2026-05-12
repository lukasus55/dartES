export default function Dartboard() {
    const SLICES = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

    const RINGS = {
        DBULL: 6.35,
        BULL: 15.9,
        INNER_SINGLE_MAX: 99,
        TREBLE_MAX: 107,
        OUTER_SINGLE_MAX: 162,
        DOUBLE_MAX: 170,
    };

    const getWedgePath = (radius: number, startAngle: number, endAngle: number) => {
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = radius * Math.sin(startRad);
        const y1 = -radius * Math.cos(startRad);
        const x2 = radius * Math.sin(endRad);
        const y2 = -radius * Math.cos(endRad);

        return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
    };

    return (
        <>
            <circle cx="0" cy="0" r="195" fill="#111111" />

            {SLICES.map((number, i) => {
                const startAngle = i * 18 - 9;
                const endAngle = i * 18 + 9;

                const isEvenIndex = i % 2 === 0;
                const singleColor = isEvenIndex ? "var(--boardSingleEven)" : "var(--boardSingleOdd)";
                const doubleTrebleColor = isEvenIndex ? "var(--boardDoubleTrebleEven)" : "var(--boardDoubleTrebleOdd)";

                const wireStyle = { stroke: "#000000", strokeWidth: 1.75, strokeLinejoin: "round" as const };

                return (
                    <g key={`slice-${number}`}>
                        <path d={getWedgePath(RINGS.DOUBLE_MAX, startAngle, endAngle)} fill={doubleTrebleColor} {...wireStyle} />
                        <path d={getWedgePath(RINGS.OUTER_SINGLE_MAX, startAngle, endAngle)} fill={singleColor} {...wireStyle} />
                        <path d={getWedgePath(RINGS.TREBLE_MAX, startAngle, endAngle)} fill={doubleTrebleColor} {...wireStyle} />
                        <path d={getWedgePath(RINGS.INNER_SINGLE_MAX, startAngle, endAngle)} fill={singleColor} {...wireStyle} />
                    </g>
                );
            })}

            <circle cx="0" cy="0" r={RINGS.BULL} fill="var(--boardDoubleTrebleEven)" stroke="#000000" strokeWidth="1.75" />
            <circle cx="0" cy="0" r={RINGS.DBULL} fill="var(--boardDoubleTrebleOdd)" stroke="#000000" strokeWidth="1.75" />

            {SLICES.map((number, i) => {
                const angleRad = (i * 18 * Math.PI) / 180;
                const x = 182 * Math.sin(angleRad);
                const y = -182 * Math.cos(angleRad);

                return (
                    <text
                        key={`number-${number}`}
                        x={x}
                        y={y}
                        fill="#ffffff"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${i * 18}, ${x}, ${y})`}
                    >
                        {number}
                    </text>
                );
            })}
        </>
    );
}