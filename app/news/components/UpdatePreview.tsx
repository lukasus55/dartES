import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReadMoreButton from "./ReadMoreButton";

interface UpdatePreviewProp {
    id: string,
    title: string,
    date: string,
    isMajor?: boolean,
}

export default function UpdatePreview({ id, title, date, isMajor = false}: UpdatePreviewProp) {
    const url = `news/${id}`

    return (
        <div className="flex w-full justify-center flex-wrap bg-neutral-950 py-4 px-10 rounded-md">
            <div className="flex-1 flex-wrap">
                <div className="flex w-full justify-start text-neutral-400">
                    {date}
                </div>
                <div className="flex w-full text-2xl text-white font-semibold items-center">
                    {title}
                </div>
                {isMajor &&
                    <div className="flex w-full mt-4">
                        <div className="bg-[#72B01D] text-sm flex h-min px-2 rounded-2xl font-semibold">Major update</div>
                    </div>
                }
            </div>
            <div className="flex flex-0 flex-wrap items-center">
                <Link href={url}> <ReadMoreButton /> </Link>
            </div>
        </div>
    )
}