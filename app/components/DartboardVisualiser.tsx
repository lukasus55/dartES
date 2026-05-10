import Dart from "../utils/Dart";

export default function DartboardVisualiser({darts}: {darts: Dart[]}) {

    console.log(darts)
    
    return (
        darts.map((dart: Dart, index: number) => (
            <div key={index} className="px-4 py-2 bg-neutral-800 text-white rounded h-min">
                Dart {index + 1}: {dart.hitResult}
            </div>
        ))
    )
}