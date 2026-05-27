import NotFound from "@/app/not-found";
import V010000 from "./v010000";
import V010001 from "./v010001";
import { Suspense } from "react";
import Loading from "@/app/loading";
import V010101 from "./v010101";

type PropsType = {
    params: Promise<{ newsId: string }>;
};

export default async function News(props: PropsType) {
    const { params } = props;
    const { newsId } = await params;

    let page = <NotFound/>

    // !!! IMPORTANT: THIS IS ONLY TEMPORARY SOLUTION. FUTURE UPDATE WILL INTRODUCE DATABSE-BASED NEWS SYSTEM !!!

    if (newsId === "v010001") {
        page = <V010001/>
    }

    if (newsId === "v010000") {
        page = <V010000/>
    }

    if (newsId === "v010100") {
        page = <V010101/>
    }

    
    return (
        <Suspense fallback={<Loading/>}>
            {page}
        </Suspense>
    )
    
};