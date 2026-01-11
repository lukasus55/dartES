import { getCheckoutGuide } from "../utils/checkout";

interface CheckoutGuideProps {
score: number;
}

export default function CheckoutGuide({ score }: CheckoutGuideProps) {
const guide = getCheckoutGuide(score);

if (!guide) return null;

return (
    <div className="flex flex-col items-center mt-2 w-full">
        <span className="text-xs text-gray-400 mb-2 tracking-widest uppercase">
            Checkout Guide
        </span>
        <div className="flex gap-2 w-50">
            {guide.map((dart, i) => (
            <div 
                key={i} 
                className={`flex items-center justify-center px-3 py-1 rounded-md font-bold text-sm shadow-lg bg-customizableHighlit border-2 border-customizableAccent w-1/3`}
            >
                {dart}
            </div>
            ))}
        </div>
    </div>
);
}