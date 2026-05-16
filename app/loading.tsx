import Spinner from "./components/Spinners/Spinner";

export default function Loading() {
    return (
        <div className='flex w-full h-screen justify-center items-center'>
            <Spinner/>
        </div>
    )
}