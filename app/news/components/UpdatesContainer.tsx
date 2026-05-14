"use client"

import V010101 from "../[newsId]/v010100";
import UpdatePreview from "./UpdatePreview";

export default function UpdatesContainer() {
    return (
        <div className="flex flex-wrap justify-between w-full gap-6 mt-10">
            <UpdatePreview id="v010101" title="Update 1.0.1" date="15.05.2026" />
            <UpdatePreview id="v010100" title="Update 1.0.0" date="12.05.2026" isMajor={true} />
        </div>
    );
}