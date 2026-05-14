"use client"

import V010101 from "../v010100/page";
import UpdatePreview from "./UpdatePreview";

export default function UpdatesContainer() {
    return (
        <div className="flex flex-wrap justify-between w-full gap-6 mt-10">
            <UpdatePreview id="v010102" title="Update 1.0.1" date="14.05.2026" />
            <UpdatePreview id="v010100" title="Update 1.0.0" date="12.05.2026" isMajor={true} />
        </div>
    );
}