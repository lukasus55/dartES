import Image from "next/image";

interface UpdateHeaderProp {
    title: string,
    date: string,
    imgUrl?: string,
    isMajor?: boolean,
}

export default function UpdateHeader({ title, date, imgUrl, isMajor = false}: UpdateHeaderProp) {
    return (
        <div className="flex w-full justify-center flex-wrap">
            <div className="flex w-full justify-start mt-4 text-neutral-400">
                {date}
            </div>
            <div className="flex w-full text-4xl text-white font-semibold items-center">
                {title}
            </div>
            {isMajor &&
                <div className="flex w-full mt-4">
                    <div className="bg-[#72B01D] text-sm flex h-min px-2 rounded-2xl font-semibold">Major update</div>
                </div>
            }

            {imgUrl &&
                <div className="mt-10">
                    <Image src={imgUrl} width={512} height={128} alt="Header photo." />
                </div>
            }

        </div>
    )
}