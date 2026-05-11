import { Player } from "@/app/utils/configStorage";
import { Slider } from "@mui/material";
import { useEffect, useState } from "react";

interface LevelSliderProps {
    player: Player, 
    handlePlayerChange: (id: number, field: "name" | "isEnabled" | "isBot" | "botLevel", value: any) => void
}

export default function LevelSlider({player, handlePlayerChange} : LevelSliderProps) {

    function valuetext(value: number) {
        return `${value}`;
    }

    const levelAverages = {
        1: "21 - 25",
        2: "26 - 30",
        3: "31 - 35",
        4: "36 - 40",
        5: "41 - 50",
        6: "51 - 61",
        7: "61 - 70",
        8: "71 - 80",
        9: "81 - 90",
        10: "91 - 100",
    }

    function formatLabel(value: number) {
        return `${levelAverages[value as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10] ?? '???'} Avg.`;
    }

    const [botLevel, setBotLevel] = useState(player.botLevel);
    const [sliderValue, setSliderValue] = useState(player.botLevel);

    useEffect(() => {
        handlePlayerChange(player.id, "botLevel", botLevel)
    }, [botLevel])
    
    

    /* Both onChange and onChangeCommitted have an event in their arguemnts. 
    The difference is that the onChange only catches mosedown and mousemove events, but the onChangeCommitted only runs when mouseup event is triggered. 
    In short: onChangeCommitted for better performance but it won't visualy update the slider till mouseDown so thats why using both at the same time.
    */

    const handleChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const handleChangeCommited = (event: React.SyntheticEvent | Event, newValue: number) => {
        setBotLevel(newValue)
    };

    return (
        <div className="w-40 h-full flex items-center">
            <Slider
                aria-label="Small steps"
                defaultValue={2}
                value={sliderValue}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommited}
                getAriaValueText={valuetext}
                step={1}
                min={1}
                max={10}
                valueLabelDisplay="auto"
                valueLabelFormat={formatLabel}
                sx={{
                    color: '#d4d4d4',
                    
                    // The draggable circle
                    '& .MuiSlider-thumb': {
                        backgroundColor: '#ffffff',
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: '0px 0px 0px 4px rgba(255, 255, 255, 0.15)',
                        },
                        '&.Mui-active': {
                            boxShadow: '0px 0px 0px 7px rgba(255, 255, 255, 0.2)',
                        },
                    },
                    
                    // The filled part of the line (left of the thumb)
                    '& .MuiSlider-track': {
                        backgroundColor: '#e5e5e5',
                        border: 'none',
                    },
                    
                    // The unfilled part of the line (right of the thumb)
                    '& .MuiSlider-rail': {
                        backgroundColor: '#525252',
                        opacity: 0.5,
                    },
                    
                    // The little dots for each step (disabled)
                    '& .MuiSlider-mark': {
                        backgroundColor: '#737373',
                        height: 4,
                        width: 4,
                        borderRadius: '50%',
                    },
                    
                    // The dots that are currently filled/passed (disabled)
                    '& .MuiSlider-markActive': {
                        backgroundColor: '#ffffff',
                        opacity: 0.9,
                    },
                    
                    // The tooltip bubble
                    '& .MuiSlider-valueLabel': {
                        backgroundColor: '#262626',
                        color: '#ffffff',
                        borderRadius: '6px',
                        padding: '4px 8px',
                    },
                }}
            />
        </div>
    );
}