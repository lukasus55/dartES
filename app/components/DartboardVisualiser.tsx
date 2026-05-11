import Dart from "../utils/Dart"; // Adjust path as needed
import Dartboard from "./Dartboard";
import ThrownDart from "./ThrownDart";
interface DartboardVisualiserProps {
    darts: Dart[];
}

export default function DartboardVisualiser({ darts }: DartboardVisualiserProps) {

    return (
        <div className="flex w-full flex-wrap justify-center gap-4 relative">
            <div className="aspect-square flex justify-center items-center h-full max-h-84">
                <svg
                    viewBox="-200 -200 400 400"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-2xl"
                >
                    <Dartboard />

                    {darts.map((dart, index) => (
                        <ThrownDart key={index} dart={dart} />
                    ))}
                </svg>
            </div>
            <div className="flex h-full justify-center gap-2 flex-col items-center absolute inset-y-0 ml-125 w-16">
            {darts.map((dart: Dart, index: number) => (
                <div key={index} className="px-4 py-2 bg-neutral-800 text-white rounded h-min w-14 flex justify-center items-center ">
                    {dart.hitResult}
                </div>
            ))}
            </div>
        </div>
    );
}