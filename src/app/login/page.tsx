'use client'
import React,{useRef} from 'react'
import { useRouter } from 'next/navigation'
import Login from '@/components/Login/Login'


const Page = () => {


    return (
        <div className='min-h-screen dark:bg-gray-800 bg-sky-600 h-auto text-gray-50 lg:mt-6 mt-7'>
            <Login />
        </div>
    )
}

export default Page