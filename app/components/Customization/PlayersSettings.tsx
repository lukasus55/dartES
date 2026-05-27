import { useState } from "react";
import { Users, Power, Bot, Settings } from "lucide-react";
import { DEFAULT_PLAYERS, savePlayers, UserConfig } from "@/app/utils/configStorage";
import LevelSlider from "./LevelSlider";
import SimpleToggleButton from "../SimpleToggleButton";

export default function PlayersSettings({config} : {config: UserConfig}) {

    const [playersConfig, setPlayersConfig] = useState(config.players ?? DEFAULT_PLAYERS);

    const handlePlayerChange = (id: number, field: "name" | "isEnabled" | "isBot" | "botLevel", value: any) => {
        const updatedPlayers = playersConfig.map(p => 
        p.id === id ? { ...p, [field]: value } : p
        );
        savePlayers({ players: updatedPlayers });
        setPlayersConfig(updatedPlayers);
    };

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <Users size={14} /> Players
            </h3>

            <div className="flex flex-col gap-2">
                {playersConfig.map((player) => (
                    <div key={player.id} className="flex min-h-12 items-center gap-2 w-full flex-wrap border-b-2 border-neutral-800 py-2">
                        <input
                            type="text"
                            value={player.name}
                            onChange={(e) => handlePlayerChange(player.id, "name", e.target.value)}
                            className={`
                                w-50 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5
                                text-sm font-mono outline-none focus:border-neutral-600 transition-colors
                                ${player.isEnabled ? "text-white" : "text-neutral-600"}
                            `}
                            disabled={!player.isEnabled}
                        />

                        <SimpleToggleButton onClick={() => handlePlayerChange(player.id, "isEnabled", !player.isEnabled)} isActive={player.isEnabled} Icon={Power} activateText="Enable Player" deactivateText="Disable Players"/>
                        <SimpleToggleButton onClick={() => handlePlayerChange(player.id, "isBot", !player.isBot)} isActive={player.isBot} Icon={Bot} activateText="Enable Bot" deactivateText="Disable Bot"/>

                        {player.isBot && <LevelSlider player={player} handlePlayerChange={handlePlayerChange}/>}
                        

                    </div>
                ))}
            </div>
        </div>
    )
}