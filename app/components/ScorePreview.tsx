import { PlayerWithResults } from "./ScoreboardContainer";

export default function ScorePreview({player} : {player: PlayerWithResults}) {
    return (
        <> {player.previewThrows.map((t) => {
            return t;
        })} </>
    )
}