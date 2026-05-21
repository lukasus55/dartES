import { sum } from "../utils/helpers";
import { useIsMobile } from "../utils/useIsMobile";
import { GameSettingsType, PlayerWithResults } from "./ScoreboardContainer";
import ScoreboardPlayer from "./ScoreboardPlayer";

interface ScoreboardProp {
    players: PlayerWithResults[];
    activePlayerIndex: number;
    gameSettings: GameSettingsType;
}

export function Scoreboard({players, activePlayerIndex, gameSettings}: ScoreboardProp) {

    const isMobile = useIsMobile();
    let displayPlayers = players;

    if (isMobile) {
        const activePlayer = players[activePlayerIndex];
        const otherPlayers = players.filter((_, index) => index !== activePlayerIndex);
        displayPlayers = [activePlayer, ...otherPlayers];
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-32 w-full">
            {displayPlayers.map((player) => {
                if (!player.isEnabled) return null;

                const originalIndex = players.findIndex(p => p.id === player.id);
                const isActive = originalIndex === activePlayerIndex;

                const currentScore = gameSettings.startingScore - sum(player.throws);

                return (
                    <div key={'ScoreboardPlayer ' + player.id}>
                        <ScoreboardPlayer
                            player={player}
                            currentScore={currentScore}
                            isActive={isActive}
                        />
                    </div>
                );
            })}
        </div>
    )
}