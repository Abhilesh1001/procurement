'use client'
import React, { useEffect, useState, memo } from 'react'
import Link from 'next/link'
import { useLogin } from '@/hooks/login/useLogin'
import { getMainheader } from '@/redux/slice'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthToken } from '@/redux/slice'
import PrBurron from './button/PrBurron'
import { useRouter } from 'next/navigation';
import { soundClick, soundError, soundSsuccess } from '@/sound/sound'
import { IoMdMenu } from "react-icons/io";
import ProcumentMenu from './mainpage/ProcumentMenu'
import { useMenu } from '@/hooks/menu/useMenu'
import axios from 'axios'
import { toast } from 'react-toastify'


export type StateProps = {
    counter: {
        user: string | null,
        mainheader: string,
        authToken: {
            access: string
        }
        baseurl: string
    }
}


const Navbar = () => {
    const dispatch = useDispatch()
    const { user, mainheader, authToken, baseurl } = useSelector((state: StateProps) => state.counter)
    const data = { email: '', password: '' }
    const { handleLogout } = useLogin(data)
    const { handleClickMenu, hiddenmenu } = useMenu()
    const [theme, setTheme] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            // Check if running in the browser environment
            const storedTheme = localStorage.getItem('theme') || 'light';
            return storedTheme;
        }
        return 'light'; // Default value if running in a non-browser environment
    });


    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check if running in the browser environment
            localStorage.setItem('theme', theme || 'light');
            document.querySelector('html')?.setAttribute('data-theme', theme || 'light');
        }
    }, [theme]);


    useEffect(() => {
        const mainhesder = localStorage.getItem('mainHeader')
        if (mainhesder !== null) {
            dispatch(getMainheader(mainhesder))
        }
    }, [])




    const router = useRouter()

    const handleInput = () => {

    }
    const handleLogin = () => {
        dispatch(getMainheader('Login Page'))
        soundClick?.play()
        router.push('/login')
    }

    const handleInputCahnge = () => {

    }

    useEffect(() => {
        if (document.cookie !== undefined && document.cookie !== null) {
            const authTokenData: any = (() => {
                const cookies = document.cookie.split(';');
                const tokenRefresh = cookies.find(cookie => cookie.trim().startsWith('tokenRefresh='));
                const tokenAccess = cookies.find(cookie => cookie.trim().startsWith('tokenAcess='));

                return {
                    'refresh': tokenRefresh?.split('tokenRefresh=')[1],
                    'access': tokenAccess?.split('tokenAcess=')[1]
                };
            })();
            dispatch(getAuthToken(authTokenData));
        }
    }, [dispatch]);


    const hanclickMainHead = (value: string) => {
        dispatch(getMainheader(value))
    }

    const checkAuthorization = async () => {
        if (authToken?.access) {
            try {
                const data = await axios.get(`${baseurl}cus/authuserpro/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })

            } catch (error) {
                console.log('errro', error)
                toast.error('Your sesson has expired Please Login', { position: 'top-center' })
                handleLogout()
                soundError?.play()
            }
        }

    }

    useEffect(() => {

        checkAuthorization()

    }, [authToken?.access])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setTheme(e.target.value)

    }


    return (

        <nav className="lg:px-16 z-10 navbar bg-base-100 shadow-md flex flex-wrap items-center justify-center lg:py-0 fixed  top-0 w-full h-14">
            <div className="flex-1 flex justify-between items-center">
                <div className='relative'>
                    <IoMdMenu className='cursor-pointer mr-4 text-2xl  ml-2' onClick={handleClickMenu} />
                    {hiddenmenu !== 'hidden' && <div className='fixed rounded top-14 overflow-auto  z-10[80%] text-nowrap w-[535px]'>
                        <div className='pl-4 flex flex-col gap-4 h-full  '>
                            <ProcumentMenu />
                        </div>

                    </div>}
                </div>

                <Link href="/" className="flex text-lg font-semibold">
                    <div className="relative" onClick={() => hanclickMainHead('Index Page')}>AbhiMaterials</div>
                </Link>
                <div className="flex-1 h-12 flex justify-between items-center ml-5 mr-5 w-full">
                    {mainheader}
                </div>

            </div>

            <label htmlFor="menu-toggle" className="cursor-pointer mr-10 lg:hidden block">
                <svg
                    className="fill-current  text-sm "
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                >
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </label>
            <input className="hidden"  onChange={handleInput} type="checkbox" id="menu-toggle" />
            <select value={theme===null?'':theme} onChange={handleChange} name="theme">
                <option className='dark:hidden' value="light">Light</option>
                <option className='hidden' value="dark">Dark</option>
                <option className='hidden' value="aqua">Aqua</option>
                <option className='dark:hidden' value="cupcake">Cupcake</option>
                <option className='dark:hidden' value="retro">Retro</option>
            </select>

            <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">

                <nav>
                    <ul className="text-xl text-center items-center gap-x-5 md:gap-x-4 lg:text-lg lg:flex  lg:pt-0">

                        <li className="py-2 lg:py-0 ">
                            <a
                                className="text-sm "
                                href="#"
                            >
                                {!!user && user?.charAt(0).toUpperCase() + user?.slice(1)}
                            </a>
                        </li>
                        <li className="py-2 lg:py-0 ">
                            {user && <button className="btn btn-error btn-sm ml-2 mr-5" onClick={handleLogout} type='button'>Logout</button>}
                            {!user && <button className="btn btn-success btn-sm ml-2 mr-5" onClick={handleLogin} type='button'>Login</button>}

                        </li>

                    </ul>
                </nav>
            </div>
        </nav>
    )
}

export default memo(Navbar)