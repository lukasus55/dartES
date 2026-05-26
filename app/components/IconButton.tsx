import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
interface IconButtonProps {
  icon?: LucideIcon;
  url?: string;
  label: string;
  labelDisabled?: string;
  onClick?: () => void;
  disabled?: boolean;
}


export default function IconButton({ icon: Icon, label, labelDisabled=label, url, onClick, disabled=false}: IconButtonProps) {

  const commonStyle = "group relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200hover:shadow-xl shadow-neutral-700/50 text-primary/70 border-neutral-800 bg-neutral-950 ";
  const enabledStyle = commonStyle + "cursor-pointer hover:bg-neutral-800 hover:border-neutral-800 hover:text-primary hover:scale-110 active:scale-95 ";
  const disabledStyle = commonStyle + "cursor-not-allowed";

  const buttonStyle = disabled ? disabledStyle : enabledStyle

  return (
      <button
        type="button"
        onClick={disabled ? () => {} : onClick}
        className={buttonStyle}
      >

      <div className={disabled ? 'opacity-20' : 'opacity-100'}>
        {Icon ? <Icon className={`h-5 w-5`} strokeWidth={2.5} /> : <Image src={url || '/'} alt="Icon" width={18} height={18}/>}
      </div>

      {/* tooltip */}
      <span 
        className="
          absolute -top-8 left-1/2 z-10 
          -translate-x-1/2 scale-0 rounded-md bg-neutral-950 min-w-20
          px-4 py-2 text-xs font-medium text-white shadow-lg break-keep whitespace-nowrap
          transition-all duration-200 ease-out 
          group-hover:scale-100
        "
      >
        {disabled ? labelDisabled : label}
      </span>
    </button>
  );
}