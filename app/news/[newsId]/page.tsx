type PropsType = {
    params: Promise<{ newsId: string }>;
};

export default async function News(props: PropsType) {
    const { params } = props;
    const { newsId } = await params;

    // !!! IMPORTANT: THIS IS ONLY TEMPORARY SOLUTION. FUTURE UPDATE WILL INTRODUCE DATABSE-BASED NEWS SYSTEM !!!

    return (<div className="flex w-full justify-center mt-16 font-bold text-4xl"> News Not found </div>)
    
};