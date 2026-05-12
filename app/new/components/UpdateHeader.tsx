import Image from "next/image";

export default function UpdateHeader({title, imgUrl, isMajor=false}: {title: string, imgUrl?: string, isMajor?: boolean}) {
    return (
        <div className="flex w-full justify-center flex-wrap">
            <div className="flex w-full justify-center text-4xl text-white font-semibold items-center">
                {title}
            </div>
            {isMajor && 
            <div className="flex w-full justify-center mt-4">
                <div className="bg-[#72B01D] text-md flex h-min px-2 rounded-2xl font-semibold">Major update</div> 
            </div>
            }
            {imgUrl &&
            <div className="mt-10">
                <Image src={imgUrl} width={512} height={128} alt="Header photo."/>
            </div>
            }
            
        </div>
    )
}