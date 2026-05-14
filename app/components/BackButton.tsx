import Link from "next/link";
import IconButton from "./IconButton";
import { ArrowLeft } from "lucide-react";

export default function BackButton({url="/"}: {url?: string}) {
    return (
        <Link
            href={url}
            className="text-sm text-neutral-500 hover:text-white transition-colors"
        >
            <IconButton
                icon={ArrowLeft}
                label="Back"
            />
        </Link>
    )
}

