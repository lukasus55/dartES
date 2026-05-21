import { PlayerWithResults } from "./Scoreboard";

export default function ScorePreview({player} : {player: PlayerWithResults}) {
    return (
        <> {player.previewThrows.map((t) => {
            return t;
        })} </>
    )
}