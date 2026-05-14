import UpdateHeader from "./components/UpdateHeader";

export default function V010101() {
    return (
        <div className="flex w-full flex-wrap bg-neutral-950 py-4 px-10 gap-10 rounded-md">

            <UpdateHeader title={"Update 1.0.0"} date={"12.05.2026"} isMajor={true}/>

            <div className="w-full">
                <div className="font-semibold underline text-xl leading-12">New</div>
                <ul className="list-disc pl-4 *:mt-2">
                    <li><strong>Play against AI Bots:</strong> Challenge yourself against realistic virtual opponents.</li>
                    <li><strong>Lifelike Dart Physics:</strong> Bot throws are now powered by a realistic, physics-based engine for natural-feeling hits and misses.</li>
                    <li><strong>Dynamic Difficulty (Levels 1-10):</strong> Scale the bot's skill level to perfectly match your own.</li>
                    <li><strong>Smart Bot Strategy:</strong> Bots play like pros, actively avoiding "Bogey" numbers and setting up ideal checkouts.</li>
                    <li><strong>Real-time Visual Feedback:</strong> Watch the bot's targets and throws unfold live on the screen.</li>
                    <li><strong>Streamlined Navigation:</strong> A new "More" menu in the top bar keeps your workspace clean.</li>
                    <li><strong>"What's New" Page:</strong> You're looking at it! A dedicated space to catch up on the latest updates.</li>
                </ul>
            </div>

            <div className="w-full">
                <div className="font-semibold underline text-xl leading-12">Changes</div>
                <ul className="list-disc pl-4 *:mt-2">
                    <li>The app is now officially hosted at <strong>dart.kkol.pl</strong>.</li>
                    <li>Decluttered the top bar by moving "Export to .xlsx" and "Broadcast Setup" into the new "More" menu.</li>
                    <li>Created a dedicated "Players" button for much quicker access to player management.</li>
                    <li>Game settings now apply automatically and seamlessly as soon as you click away from the input field.</li>
                    <li>Improved accessibility: You can now quickly close any popup by pressing the `ESC` key or clicking outside the window.</li>
                    <li>Refreshed popup styling for a cleaner, smoother experience.</li>
                </ul>
            </div>

            <div className="w-full">
                <div className="font-semibold underline text-xl leading-12">Fixes</div>
                <ul className="list-disc pl-4 *:mt-2">
                    <li>Prevented invalid values from being entered into the "Starting Score" and "Legs to Win Set" settings.</li>
                    <li>Fixed an issue where the theme color picker was getting cut off on certain devices and screen sizes.</li>
                </ul>
            </div>

            <div className="w-full">
                <div className="font-semibold underline text-xl leading-12">Known Issues</div>
                <ul className="list-disc pl-4 *:mt-2">
                    <li>Opening the Game Settings menu currently interrupts and resets an active bot's turn. I am working on a fix for this!</li>
                </ul>
            </div>

        </div>
    )
}