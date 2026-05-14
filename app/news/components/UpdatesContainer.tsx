"use client"

import V010101 from "../v010101";
import UpdatePreview from "./UpdatePreview";

export default function UpdatesContainer() {
    return (
        <div className="mt-10 flex gap-6">
            <UpdatePreview id="v010101" title="Update 1.0.0" date="12.05.2026" isMajor={true} />

        </div>
    );
}