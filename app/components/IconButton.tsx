import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export default function IconButton({ icon: Icon, label, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group relative flex h-10 w-10 items-center justify-center
        bg-neutral-950 rounded-full cursor-pointer border-2 border-neutral-800 text-primary/70 
        transition-all duration-200
        hover:shadow-xl shadow-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-800 hover:text-primary hover:scale-110
        active:scale-95 ignore_popup_close
      "
    >
      <Icon className="h-5 w-5" strokeWidth={2.5} />

      {/* tooltip */}
      <span 
        className="
          absolute -top-8 left-1/2 z-10 
          -translate-x-1/2 scale-0 rounded-md bg-neutral-950 w-20
          px-2 py-1 text-xs font-medium text-white shadow-lg 
          transition-all duration-200 ease-out 
          group-hover:scale-100
        "
      >
        {label}
      </span>
    </button>
  );
}