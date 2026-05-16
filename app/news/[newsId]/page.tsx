import NotFound from "@/app/not-found";
import V010100 from "./v010100";
import V010101 from "./v010101";

type PropsType = {
    params: Promise<{ newsId: string }>;
};

export default async function News(props: PropsType) {
    const { params } = props;
    const { newsId } = await params;

    // !!! IMPORTANT: THIS IS ONLY TEMPORARY SOLUTION. FUTURE UPDATE WILL INTRODUCE DATABSE-BASED NEWS SYSTEM !!!

    if (newsId === "v010101") {
        return <V010101/>
    }

    if (newsId === "v010100") {
        return <V010100/>
    }

    
    return (<NotFound />)
    
};