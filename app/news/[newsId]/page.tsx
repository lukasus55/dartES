import NotFound from "@/app/not-found";
import V010100 from "./v010100";
import V010101 from "./v010101";
import { Suspense } from "react";
import Loading from "@/app/loading";

type PropsType = {
    params: Promise<{ newsId: string }>;
};

export default async function News(props: PropsType) {
    const { params } = props;
    const { newsId } = await params;

    let page = <NotFound/>

    // !!! IMPORTANT: THIS IS ONLY TEMPORARY SOLUTION. FUTURE UPDATE WILL INTRODUCE DATABSE-BASED NEWS SYSTEM !!!

    if (newsId === "v010101") {
        page = <V010101/>
    }

    if (newsId === "v010100") {
        page = <V010100/>
    }

    
    return (
        <Suspense fallback={<Loading/>}>
            {page}
        </Suspense>
    )
    
};