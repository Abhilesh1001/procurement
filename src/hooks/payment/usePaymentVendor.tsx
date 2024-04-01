import { useEffect, useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import axios from "axios"
import { toast } from "react-toastify"
import { soundSsuccess, soundError, soundClick } from "@/sound/sound"



interface paymentDataType {
    payment_no?: null | number,
    mir_no: null | number,
    amount_debit: null|number,
    user: null | number,
    advance_adjust: null | number,
    vendor_name: string,
    total_advance_balance? : number|null
    total_paymet? : number |null 
    total_amount : number | null,
    bill_no : number |null,
    po_no: number | null
}

export const usePaymentVendor = () => {


    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)

    const [error,setError] = useState(false)

    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')

    const [paymentData, setPaymentData] = useState<paymentDataType>({payment_no:null,mir_no:null,amount_debit:null,user:null,advance_adjust:null,vendor_name:'',total_advance_balance:null,total_paymet:null,total_amount:null,bill_no:null,po_no:null})

    function handleChange() {
        setChange(`${change !== 'create' ? 'create' : null}`)
    }
    function handleUPdate() {
        // updataMutation.reset()

        const data = {
            payment_no : paymentData.payment_no,
            miro_no: paymentData.mir_no,
            amount_debit:paymentData.amount_debit,
            user : userId,
            advance_adjust :paymentData.advance_adjust
        }

            // console.log(data)

            updataMutation.mutate(data)

        }

       

        const updataMutation = useMutation<any, any, any, unknown>({
            mutationFn: async (data) => {
                return axios.patch(`${baseurl}payment/payment/${paymentData.payment_no}/`, data, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
            },
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.log(error)
            }
        })


        function handleCreate() {
            setSfcreate('create')
            setChange('')
        }



        const mutation = useMutation<any, any, any, unknown>({
            mutationFn: async (data) => {
                return axios.post(`${baseurl}payment/payment`, data, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
            },
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                console.log(data)
            }
        })


        function handleDataChange(value:any,key : keyof paymentDataType){
            const newData:any = {...paymentData}
            
            newData[key]= value
           

            let balance_amount=0
            if (paymentData.total_amount !== null && paymentData.total_paymet!== null && paymentData.total_paymet!==undefined ){
                balance_amount = paymentData.total_amount-paymentData.total_paymet
            }

            let totalAmount  = newData['advance_adjust'] + newData['amount_debit']

            if (newData['advance_adjust']>newData.total_advance_balance || newData['amount_debit']> balance_amount || totalAmount > balance_amount ){
                setError(true)
            }else{  
                setError(false)
            }



            setPaymentData(newData)
            
        }

       

        function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            // mutation.reset()
            e.preventDefault()
            console.log(paymentData)

            const data = {
                miro_no: paymentData.mir_no,
                amount_debit:paymentData.amount_debit,
                user : userId,
                advance_adjust :paymentData.advance_adjust
            }

            mutation.mutate(data)

        }


        async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
            const value = (e.target as HTMLInputElement).value;
            // console.log('ok')
            if (e.key === 'Enter') {
                const vid = parseInt(value)
                e.preventDefault();
                // console.log(vid)
                try {
                    const res = await axios.get(`${baseurl}payment/mirocreateview/${vid}`, {
                        headers: {
                            Authorization: `Bearer ${authToken?.access}`
                        }
                    })

                    // console.log(res.data)
                    const vendor_details = JSON.parse(res.data.data.vendor_address)
                    const mainData = JSON.parse(res.data.data.maindata)
                    const billNo = JSON.parse(res.data.data.billing)
                    const item_grn = JSON.parse(res.data.data.item_grn)

                    setPaymentData((prev) => {
                        return {
                            ...prev,
                            mir_no: res.data.data.mir_no,
                            vendor_name: vendor_details.vendor_name,
                            total_amount: mainData.TotalWithtax,
                            total_advance_balance : res.data.total_advance_balance,
                            total_paymet : res.data.total_paymet,
                            bill_no :billNo.bill_no,
                            po_no : item_grn[0].po_no                       
                        }
                    })

                } catch (error) {

                    toast.error('Enter Correct PO no', { position: 'top-center' })

                }
            }
        }


        async function handleKeyDownUpdate(e: React.KeyboardEvent<HTMLInputElement>) {
            const value = (e.target as HTMLInputElement).value;
            // console.log('ok')
            if (e.key === 'Enter') {
                const vid = parseInt(value)
                e.preventDefault();
                // console.log(vid)
                try {
                const res = await axios.get(`${baseurl}payment/paymentupdateview/${vid}`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })

                // console.log(res.data)
                const vendor_details = JSON.parse(res.data.data.vendor_address)
                const mainData = JSON.parse(res.data.data.maindata)
                const billNo = JSON.parse(res.data.data.billing)
                const item_grn = JSON.parse(res.data.data.item_grn)

                setPaymentData((prev) => {
                    return {
                        ...prev,
                        mir_no: res.data.data.mir_no,
                        vendor_name: vendor_details.vendor_name,
                        total_amount: mainData.TotalWithtax,
                        total_advance_balance : res.data.total_advance_balance,
                        total_paymet : res.data.total_paymet,
                        bill_no :billNo.bill_no,
                        po_no : item_grn[0].po_no                       
                    }
                }) 
            }catch (error) {

                    toast.error('Enter Correct Payment no', { position: 'top-center' })

                }
            }
        }


        
        return { handleChange, handleUPdate, handleCreate, change, paymentData, setPaymentData, handleSubmit, sfcreate, handleKeyDown, handleKeyDownUpdate, mutation, updataMutation,handleDataChange,error }
    
}