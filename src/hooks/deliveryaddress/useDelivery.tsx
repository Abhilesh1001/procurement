import axios from 'axios'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { vendorType,DeliveryType } from '@/type/type'
import { soundClick,soundSsuccess,soundError } from '@/sound/sound'



export const useDelivery=()=>{

    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)

    const [vendor, setVendor] = useState<DeliveryType>({ name: '', phone_no: null, vendor_name: '', gst: '', email: '', address: '',company_s_no:null,company_name:'',company_address:'',company:'',company_adress_code:''})
    // console.log(vendor)
    
    const [companyId,setCompanyID] = useState<number | null>(null)

    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')

    // create data 
    const mutation = useMutation({
        mutationFn: async (newTodo:any) => {
            return await axios.post(`${baseurl}mat/createDelivery`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onError: (error)=>{
            console.log(error)
        }
    })
 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
             name: vendor.name, phone_no: vendor.phone_no, vendor_name: vendor.vendor_name, gst: vendor.gst, email: vendor.email, address: vendor.address,company_address:vendor.company_s_no
        }
        console.log(data)

        mutation.mutate(data)
    }

    // receive Data 
    const fetchTodoList = async () => {
        const res = await axios.get(`${baseurl}mat/createDelivery`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        return res.data
    }


    const handleUPdate =()=> {

        const newData = {
            name: vendor.name,
            phone_no: vendor.phone_no,
            vendor_name: vendor.phone_no,
            gst: vendor.gst,
            email: vendor.email,
            address: vendor.address,
            user : userId
        }
        mutationUpdate.mutate(newData)

    }

    const handleChange=()=>{
        setChange(`${change!=='create'?'create':null}`)

    }

    const handleCreate=()=>{
        // soundClick?.play()
        setVendor(
            { name: '', phone_no: null, vendor_name: '', gst: '', email: '', address: '',company_s_no:null,company_name:'',company_address:'',company:'',company_adress_code:''}
        )
        setSfcreate('create')
        setChange('')

    }

    const mutationUpdate =useMutation<any,any,any,unknown>({
        mutationFn : async (data)  => {
        return await axios.patch(`${baseurl}mat/createDelivery/${vid}/`,data,{headers:{
          Authorization:`Bearer ${authToken?.access}`
        }})},
        onSuccess:(data)=>{
            soundSsuccess?.play()
            console.log(data,"success")
            setVendor(
                { name: '', phone_no: null, vendor_name: '', gst: '', email: '', address: '',company_s_no:null,company_name:'',company_address:'',company:'',company_adress_code:''}
            )
        },
        onError:(error)=>{
            console.log('error',error)
            soundError?.play()
        }
    })


    const mutationVendor = useMutation<any,any,any,unknown>({
        mutationFn: async () => {
          return await axios.get(`${baseurl}mat/createDelivery/${vid}/`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: async  (data) => {
            //    console.log(data,'onsuccess')
            //    console.log(data)

               setVendor(prev=>{ 
                return {
                    ...prev,
                    name: data.data.name, 
                    phone_no: parseInt(data.data.phone_no), 
                    vendor_name:data.data.vendor_name, 
                    gst:data.data.gst, 
                    email: data.data.email,
                    address: data.data.address,
                }
              })
              
              try {

                const res = await axios.get(`${baseurl}mat/companyaddress/${data.data.company_address}/`,{headers:{
                    Authorization:`Bearer ${authToken?.access}`
                }});
                console.log(res.data)
                setVendor(prev=>{ 
                    return {
                        ...prev,
                        company_s_no : data.data.s_no,
                        company_name : res.data.name,
                        company_address : res.data.address
    
                    }
                  })

              } catch (error) {
                console.log(error)

                
              }

              soundSsuccess?.play()
            
            }              
    })

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        console.log('ok')
        if (e.key === 'Enter') {
            const vid = parseInt(value)
            e.preventDefault();
            mutationVendor.mutate(vid)
            soundClick?.play()
        }
    }

    const { data: newData, error: errors } = useQuery({ queryKey: ['listDelivery',mutationUpdate.data], queryFn: fetchTodoList, })
   



    const mutationAddress = useMutation<any,any,any,unknown>({
        mutationFn: async (companyId) => {
          return await axios.get(`${baseurl}mat/companyaddress/${companyId }/`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
            console.log(data.data)
               setVendor(prev=>{ 
                return {
                    ...prev,
                    company_s_no : data.data.s_no,
                    company_name : data.data.name,
                    company_address : data.data.address
                }
              })
            
              soundSsuccess?.play()
            
            }              
    })
    
    // console.log(mutationAddress?.data?.data)
    

    const handleAddressSubmit =()=>{
        
        mutationAddress.mutate(companyId)

    }
    

   


    return {handleUPdate,change,mutation,handleSubmit,vendor,setVendor,newData,vid,setVid,handleChange,sfcreate,handleCreate,handleKeyDown,mutationUpdate,companyId,setCompanyID,handleAddressSubmit,mutationAddress}
}