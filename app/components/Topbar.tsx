import Image from "next/image";
import IconButton from "./IconButton";
import { Pencil, RotateCcw, TvMinimal } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex fixed top-0 left-0 w-screen p-5 min-h-30 items-center">

      <div className="flex w-full justify-center gap-10">
        <IconButton
          icon={RotateCcw}
          label="Reset"
          onClick={() => console.log("Resetting...")}
        />
        <IconButton icon={Pencil} label="Edit" />
        <IconButton icon={TvMinimal} label="TV Mode" />
      </div>
    </div>
  );
}
