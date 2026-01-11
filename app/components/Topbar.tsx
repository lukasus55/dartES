import IconButton from "./IconButton";
import { Pencil, RotateCcw, TvMinimal } from "lucide-react";

interface TopbarProps {
  onReset: () => void;
}

export default function Topbar({ onReset }: TopbarProps) {
  return (
    <div className="max-lg:absolute flex fixed top-0 left-0 w-screen p-5 min-h-30 items-center z-100">
      <div className="flex w-full justify-center gap-10">
        <IconButton
          icon={RotateCcw}
          label="Reset"
          onClick={onReset}
        />
        <IconButton icon={Pencil} label="Edit" />
        <IconButton icon={TvMinimal} label="TV Mode" />
      </div>
    </div>
  );
}