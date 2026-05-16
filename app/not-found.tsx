import Link from 'next/link'
import Spinner from './components/Spinners/Spinner'
import Image from 'next/image'
import BackButton from './components/BackButton'

export default function NotFound() {
    return (
        <div className='w-full pt-20 px-4 h-screen'>
            
            <div className='flex w-full justify-center text-4xl font-bold gap-4'> <BackButton /> No results </div>
            <div className='flex w-full justify-center h-min mt-10'> <Image src="/allMissed.svg" alt='3 missed darts image.' width={400} height={300}/> </div>
        </div>
    )
}