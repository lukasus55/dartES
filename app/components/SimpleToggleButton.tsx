import { LucideIcon } from "lucide-react";

interface SimpleToggleButtonProp {
    onClick: (...args : any[]) => void;
    isActive: boolean;
    Icon: LucideIcon;
    activateText?: string;
    deactivateText?: string;
}

export default function SimpleToggleButton({onClick, isActive, Icon, activateText="Disable", deactivateText="Disable"}: SimpleToggleButtonProp) {


    return (
        <button
            onClick={onClick}
            className={`
            p-2 rounded-lg transition-all duration-200 border cursor-pointer
            ${isActive
                    ? "text-neutral-950 bg-neutral-200 border-neutral-600"
                    : "text-neutral-600 bg-neutral-900 border-neutral-800 hover:bg-neutral-800 hover:text-neutral-400"}
            `}
            title={isActive ? activateText : deactivateText}
        >
            {<Icon size={16} strokeWidth={3} />}
        </button>
    )
}