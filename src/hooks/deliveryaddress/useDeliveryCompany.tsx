import { useSelector } from 'react-redux'
import axios from 'axios'
import { statePropsMaterial } from '@/type/type'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { add } from 'date-fns'



export const useDeliveryCompany=()=>{


    const { baseurl, authToken, userId } = useSelector((state: statePropsMaterial) => state.counter)
    const [hiddenslert, setHiddenAlert] = useState('hidden')
    const [hiddenslertcreate, setHiddenAlertCreate] = useState('hidden')
    const [deliveryComAddress,serDeliveryComAddress] = useState([{s_no :null,name:'',address:'',user:userId}])

    const [updateData, setUpdataData] = useState({
        "msg": '',
        "data": {
            "s_no": null,
            "address": "",
            "name": ""
        }
    })

    const handleCloseAlert = () => {
        setHiddenAlert('hidden')
    }
    const handleCloseAlertCreate = () => {
        setHiddenAlertCreate('hidden')
    }
   
    const [change, setChange] = useState('change')
    const [id, setId] = useState<Number | null>(null)

    console.log(id)

    function handleChange(ID_No: Number | null) {
        setChange(`${change === 'change' ? '' : 'change'}`)
        setId(ID_No)
    }

   

    async function handleUpdate(ID_No: Number) {

        const newData = [...deliveryComAddress]
        
        const filterData = newData.filter((item) => {
            console.log(newData,item.s_no,ID_No)
            if (item.s_no === ID_No) {
                return item
            }
        })
        console.log(newData)
        setId(null)

        const reqData = {
            name: filterData[0].name,
            address: filterData[0].address
        }

        try {
            const res = await axios.patch(`${baseurl}mat/companyaddress/${filterData[0].s_no}/`, reqData, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            
            setUpdataData(res.data)
            setHiddenAlert('')
        } catch (error) {
            console.log(error,'error')

        }


        console.log(reqData)

    }

    function handleChangedata(id: number, index: number, key: string, value: string | number) {
        console.log(id, index, key, value)
        const newdata = [...deliveryComAddress]
        newdata[index] = { ...newdata[index], [key]: value };
        serDeliveryComAddress(newdata)
    }


    const mutation =useMutation<any,any,any,unknown>({
        mutationFn : async (data)  => {
        return await axios.post(`${baseurl}mat/companyaddress`,data,{headers:{
          Authorization:`Bearer ${authToken?.access}`
        }})},
        onSuccess:(data)=>{
            console.log(data)
            setHiddenAlertCreate('')
            
        },
        onError:(error)=>{  
            console.log(error)
           
        }
    })

    

    const [unit,setUnit] = useState({name:'',address:''})

    const handleSubmitUnit=()=>{
        console.log(unit)

        const data = {
            name : unit.name,
            address: unit.address
        }

        mutation.mutate(data)

    }

    useEffect(()=>{
        fetchMaterialUnit()
    },[authToken?.access,mutation.data])


    const fetchMaterialUnit = async () => {

        try {

            if(authToken?.access){
                const res = await axios.get(`${baseurl}mat/companyaddress`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`,
                    },
                });
                serDeliveryComAddress(res.data)
                console.log(res.data)
            }
           
            
        } catch (error) {
            console.log(error)
            
        }
         
        
    };  



    return {hiddenslert,handleCloseAlert,updateData,deliveryComAddress,id,handleChangedata,handleChange,handleUpdate,unit,setUnit,handleSubmitUnit,mutation,hiddenslertcreate,handleCloseAlertCreate}
}