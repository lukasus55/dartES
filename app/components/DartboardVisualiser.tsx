import Dart from "../utils/Dart";
import Dartboard from "./Dartboard";

export default function DartboardVisualiser({darts}: {darts: Dart[]}) {

    console.log(darts)
    
    return (
        <>
            <Dartboard scale={0.5}/>
            {darts.map((d) => 
                console.log(d)
            )}
        </>
    )
}