'use client'
import React, { useState } from 'react'
import PrBurron from '@/components/button/PrBurron';
import TextInputText from '@/components/dummyinput/TextInputText';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query'
import axios from 'axios';
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import Loading from '@/components/loading/Loading';

const Page = () => {
  const {baseurl} = useSelector((state:StateProps)=>state.counter)

  const mutation = useMutation<any,any,any,any>({
    mutationFn:async (data)=>{
      return await axios.post(`${baseurl}cus/send-reset-password/`,data)
    },
    onSuccess:()=>{
      formik.resetForm()
    }
  })
  
  

  const validationSchema =Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  })

   const formik = useFormik({
    initialValues:{
      email:''
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>{
      console.log(values)
      mutation.mutate(values)

    }
   })



  return (
    <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6'>
        <div className='w-full container flex justify-center'>

          <form onSubmit={formik.handleSubmit} className='mt-6'>
            
            {mutation.isPending && <Loading />}
            {mutation.isSuccess && <div className='p-2 rounded capitalize dark:bg-green-800 bg-green-400'>{mutation.data.data.msg}</div>}
          {mutation.error && <div className='p-2 capitalize rounded dark:bg-red-900 bg-red-400' >{mutation?.error?.response?.data?.errors?.non_field_errors[0]}</div>}
     
            <label htmlFor="name" className='block'>Enter Email</label>
                {<div className='dark:text-gray-50'>{formik.errors.email}</div>}
                <input type="email" required name='email' value={formik.values.email} onChange={formik.handleChange} placeholder="name" className="input input-bordered w-80 my-2" />
         
        
           <button className="btn btn-primary ml-2 mb-2 block" type='submit'>Submit</button>



          </form>
        </div>
    </div>
  )
}

export default Page