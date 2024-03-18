'use client'
import { loginred } from "@/reducer/loginreducer"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { getUser, getAuthToken, clearAuthToken, clearUser, getUserId } from '@/redux/slice'
import { StateProps } from '@/type/type'
import { getMainheader } from '@/redux/slice'
import { soundClick, soundSsuccess, soundError } from "@/sound/sound"
import { cookies } from 'next/headers'

export const useLogin = (data: loginred) => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')  
    const dispatch = useDispatch()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        soundClick?.play()
        setLoading(true)
        e.preventDefault()
        try {
            const response = await axios.post(`${baseurl}cus/authlogin/`, data)
            const res = response.data
            // console.log(res, 'login')
            const tokenRefresh = res.token.refresh;
            const tokenAcess = res.token.access;
            document.cookie = `tokenRefresh=${tokenRefresh}; path=/`
            document.cookie = `tokenAcess=${tokenAcess}; path=/`
            dispatch(getAuthToken({ 'refresh': tokenRefresh, 'access': tokenAcess }))
            const userToken: { name: string, user_id: number } = jwtDecode(tokenAcess)
            // console.log(userToken.name)
            dispatch(getUser(userToken.name))
            dispatch(getUserId(userToken.user_id))
            dispatch(getMainheader('Index Page'))
            setLoading(false)
            soundSsuccess?.play()
        } catch (error) {
            console.log(error)
            setError('Email or Password Wrong')
            setLoading(false)
            soundError?.play()
        }
    }
    // updatetoken 

    
    useEffect(() => {
        let time = 1000 * 4 * 60
        if (authToken?.access !== undefined) {
            const userToken: { name: string, user_id: number } = jwtDecode(authToken?.access)
            dispatch(getUser(userToken.name))
            dispatch(getUserId(userToken.user_id))
            
            

            let interval = setInterval(() => {
                updataToken()
            }, time)
            return () => clearInterval(interval)
        }
    }, [authToken?.access])

    const updataToken = async () => {
        let data: { data: { access: string }, status: number } = await axios?.post(`${baseurl}cus/api/token/refresh/`, { 'refresh': authToken?.refresh })

        if (data.status === 200 && authToken?.refresh !== undefined) {
            const tokenAcess = data.data.access
            dispatch(getAuthToken({ 'refresh': authToken?.refresh, 'access': tokenAcess }))
            document.cookie = `tokenAcess=${tokenAcess}; path=/`
            document.cookie = `tokenRefresh=${authToken?.refresh}; path=/`
            const userToken: { name: string, user_id: number } = jwtDecode(tokenAcess)
            dispatch(getUser(userToken.name))
            dispatch(getUserId(userToken.user_id))
        } else {
            handleLogout()
        }
    }
    function handleLogout() {
        soundClick?.play()
        document.cookie = 'tokenRefresh=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie = 'tokenAcess=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        dispatch(clearAuthToken(''))
        dispatch(clearUser(""))
    }





    return { handleSubmit, handleLogout, error, loading }
}