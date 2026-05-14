import BackButton from "@/app/components/BackButton";
import UpdateHeader from "../components/UpdateHeader";

export default function V010101() {
    return (
        <div className="flex w-full justify-center bg-background px-8">
            <div className="w-1/2 max-lg:w-full py-15">
                <BackButton url="/news"/>
                <div className="flex w-full flex-wrap bg-neutral-950 mt-4 py-4 px-10 gap-10 rounded-md">
                    
                    <UpdateHeader title={"Update 1.0.1"} date={"14.05.2026"}/>

                    <div className="w-full">
                        <div className="font-semibold underline text-xl leading-12">Changes</div>
                        <ul className="list-disc pl-4 *:mt-2">
                            <li>Adjusted bot throws visualisation size on both mobile and desktop devices.</li>
                            <li>Removed unnecessary animations on popups.</li>
                            <li>Renamed "new" page to "news."</li>
                            <li>Moved update previews to individual pages.</li>
                        </ul>
                    </div>

                    <div className="w-full">
                        <div className="font-semibold underline text-xl leading-12">Fixes</div>
                        <ul className="list-disc pl-4 *:mt-2">
                            <li>Opening the settings menu no longer interrupts an active bot's turn.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}