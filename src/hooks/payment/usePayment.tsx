import { useState } from "react"
import { useQuery,useMutation } from "@tanstack/react-query"
import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import axios from "axios"
import { toast } from "react-toastify"
import { soundSsuccess,soundError,soundClick } from "@/sound/sound"



interface paymentDataType {
    advance_id?:null|number,
    po_no:null|number,
    vendor_name:string,
    created_by:null|string,
    date?:null|string,
    amount_debit:null|number
    total_amount : null | number
}

export const usePayment=()=>{


    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)

    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')

    const [paymentData,setPaymentData] = useState<paymentDataType>({po_no:null,vendor_name:'',advance_id:null,created_by:'',date:'',amount_debit:null,total_amount:null})




    async function fetchData(){
        const res = await axios.get(`${baseurl}payment/adpayment`,{
            headers :{
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        return res.data
    }

    


    function handleChange(){
        setChange(`${change!=='create'?'create':null}`)
    }
    function handleUPdate (){
        updataMutation.reset()
    
        const data = {
            amount_debit : paymentData.amount_debit,
            user : userId,
            po_no : paymentData.po_no
        }

        // console.log(data)
        updataMutation.mutate(data)

    }


    const updataMutation=useMutation<any,any,any,unknown >({
        mutationFn : async (data)=>{
            return axios.patch(`${baseurl}payment/adpayment/${paymentData.advance_id}/`,data,{
                headers:{
                    Authorization : `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess : (data) =>{
            console.log(data)
        },
        onError : (error)=>{
            console.log(error)
        }
    })


    function handleCreate(){
        setSfcreate('create')
        setChange('')
    }
   


    const mutation = useMutation<any,any,any,unknown>({
        mutationFn : async (data) =>{
            return axios.post(`${baseurl}payment/adpayment`,data,{
                headers:{
                    Authorization : `Bearer ${authToken?.access}`
                }
            })
        },
        onError : (error)=>{
            console.log(error)
        },
        onSuccess:()=>{

        }
    })



    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        mutation.reset()
        e.preventDefault()
        console.log('ok')
        const data = {
            po_no : paymentData.po_no,
            amount_debit:paymentData.amount_debit,
            user : userId
        }
        mutation.mutate(data)
     
    }


    async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        const value = (e.target as HTMLInputElement).value;
        console.log('ok')
        if (e.key === 'Enter') {
            const vid = parseInt(value)
            e.preventDefault();
            console.log(vid)
            try{
                const res =await axios.get(`${baseurl}mat/purchaseorderadvance/${vid}`,{
                    headers:{
                        Authorization : `Bearer ${authToken?.access}`
                    }
                }) 
           
                const vendor_details =  JSON.parse(res.data.vendor_address)
                const mainData =  JSON.parse(res.data.maindata)
                setPaymentData((prev)=>{
                    return {
                        ...prev,
                        po_no:res.data.po_no,
                        vendor_name:vendor_details.vendor_name,
                        total_amount:mainData.TotalWithtax,
                       
                    }
                })

            }catch(error){

                toast.error('Enter Correct PO no',{position:'top-center'})

            }
        }
    }


    async function handleKeyDownUpdate(e: React.KeyboardEvent<HTMLInputElement>){
        const value = (e.target as HTMLInputElement).value;
        console.log('ok')
        if (e.key === 'Enter') {
            const vid = parseInt(value)
            e.preventDefault();
            console.log(vid)
            try{
                const res =await axios.get(`${baseurl}payment/adpayment/${vid}`,{
                    headers:{
                        Authorization : `Bearer ${authToken?.access}`
                    }
                }) 
                console.log(res.data)

                const vendor_details =  JSON.parse(res.data.vendor_name)
                const mainData =  JSON.parse(res.data.main_amount)


                setPaymentData((prev)=>{
                    return {
                        ...prev,
                        po_no:res.data.po_no,
                        vendor_name:vendor_details.vendor_name,
                        total_amount:mainData.TotalWithtax,
                        amount_debit :res.data.amount_debit
                    }
                })

            }catch(error){

                toast.error('Enter Correct PO no',{position:'top-center'})

            }
        }
    }


    const {data:viewData} = useQuery({queryKey:['advancePayment',mutation.data,updataMutation.data],queryFn:fetchData})

    return {handleChange,handleUPdate,handleCreate,change,paymentData,setPaymentData,handleSubmit,sfcreate,handleKeyDown,handleKeyDownUpdate,mutation,updataMutation,viewData}

}