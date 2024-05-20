import { useSelector, useDispatch } from 'react-redux'
import { matState } from '@/type/material/materia-type'
import { getMaterialGroup } from '@/redux/material/matslicer'
import axios from 'axios'
import { statePropsMaterial } from '@/type/type'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'



export const useMaterialGroup=()=>{


    const { baseurl, authToken, userId } = useSelector((state: statePropsMaterial) => state.counter)
    const [hiddenslert, setHiddenAlert] = useState('hidden')
    const [hiddenslertcreate, setHiddenAlertCreate] = useState('hidden')
    const [updateData, setUpdataData] = useState({
        "msg": '',
        "data": {
            "group_no": null,
            "group_name": "",
        }
    })

    const handleCloseAlert = () => {
        setHiddenAlert('hidden')
    }
    const handleCloseAlertCreate = () => {
        setHiddenAlertCreate('hidden')
    }

    const { materialGroup } = useSelector((state: matState) => state.matSlice)
    const dispatch = useDispatch()
    const [change, setChange] = useState('change')
    const [id, setId] = useState<Number | null>(null)

    function handleChange(ID_No: Number | null) {
        setChange(`${change === 'change' ? '' : 'change'}`)
        setId(ID_No)
    }

    async function handleUpdate(ID_No: Number) {

        const newData = [...materialGroup]
        const filterData = newData.filter((item) => {
            if (item.group_no === ID_No) {
                return item
            }
        })
        setId(null)

        const reqData = {
            material_umit: filterData[0].group_no,
            materil_unit_desc: filterData[0].group_name
        }

        try {
            const res = await axios.patch(`${baseurl}mat/materialgroup/${filterData[0].group_no}/`, reqData, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            setUpdataData(res.data)
            setHiddenAlert('')
        } catch (error) {
            console.log(error)

        }


        console.log(reqData)

    }

    function handleChangedata(id: number, index: number, key: string, value: string | number) {
        console.log(id, index, key, value)
        const newdata = [...materialGroup]
        newdata[index] = { ...newdata[index], [key]: value };
        dispatch(getMaterialGroup(newdata))
    }


    const mutation =useMutation<any,any,any,unknown>({
        mutationFn : async (data)  => {
        return await axios.post(`${baseurl}mat/materialgroup`,data,{headers:{
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

    

    const [group,setGroup] = useState({group_name:''})

    const handleSubmitUnit=()=>{
        console.log(group)

        const data = {
            group_name : group.group_name           
        }

        mutation.mutate(data)

    }

    useEffect(()=>{
        fetchMaterialUnit()
    },[authToken?.access,mutation.data])


    const fetchMaterialUnit = async () => {

        try {
            const res = await axios.get(`${baseurl}mat/materialgroup`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
            dispatch(getMaterialGroup(res.data))
            
        } catch (error) {
            console.log(error)
            
        }
         
        
    };  



    return {hiddenslert,handleCloseAlert,updateData,materialGroup,id,handleChangedata,handleChange,handleUpdate,group,setGroup,handleSubmitUnit,mutation,hiddenslertcreate,handleCloseAlertCreate}
}