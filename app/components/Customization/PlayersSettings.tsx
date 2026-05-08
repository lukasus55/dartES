import { useState } from "react";
import { Users, Power } from "lucide-react";
import { DEFAULT_PLAYERS, savePlayers, UserConfig } from "@/app/utils/configStorage";

export default function PlayersSettings({config} : {config: UserConfig}) {

    const [playersConfig, setPlayersConfig] = useState(config.players ?? DEFAULT_PLAYERS);

    const handlePlayerChange = (id: number, field: "name" | "isEnabled", value: any) => {
        const updatedPlayers = playersConfig.map(p => 
        p.id === id ? { ...p, [field]: value } : p
        );
        setPlayersConfig(updatedPlayers);
        savePlayers({ players: updatedPlayers });
    };

    return (
        <div className="flex flex-col gap-4 pt-4 border-t border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <Users size={14} /> Players
            </h3>

            <div className="flex flex-col gap-2">
                {playersConfig.map((player) => (
                    <div key={player.id} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={player.name}
                            onChange={(e) => handlePlayerChange(player.id, "name", e.target.value)}
                            className={`
                    flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 
                    text-sm font-mono outline-none focus:border-neutral-600 transition-colors
                    ${player.isEnabled ? "text-white" : "text-neutral-600"}
                `}
                            disabled={!player.isEnabled}
                        />

                        <button
                            onClick={() => handlePlayerChange(player.id, "isEnabled", !player.isEnabled)}
                            className={`
                            p-2 rounded-lg transition-all duration-200 border cursor-pointer
                            ${player.isEnabled
                                    ? "text-green-400 bg-green-400/10 border-green-400/20"
                                    : "text-neutral-600 bg-neutral-900 border-neutral-800 hover:bg-neutral-800 hover:text-neutral-400"}
                `}
                            title={player.isEnabled ? "Disable Player" : "Enable Player"}
                        >
                            <Power size={14} strokeWidth={3} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}