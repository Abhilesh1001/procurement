import { useSelector, useDispatch } from 'react-redux'
import { matState } from '@/type/material/materia-type'
import { getMaterialUnit } from '@/redux/material/matslicer'
import axios from 'axios'
import { statePropsMaterial } from '@/type/type'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'



export const useMaterialUnit=()=>{


    const { baseurl, authToken, userId } = useSelector((state: statePropsMaterial) => state.counter)
    const [hiddenslert, setHiddenAlert] = useState('hidden')
    const [hiddenslertcreate, setHiddenAlertCreate] = useState('hidden')
    const [updateData, setUpdataData] = useState({
        "msg": '',
        "data": {
            "unit_no": null,
            "material_umit": "",
            "materil_unit_desc": ""
        }
    })

    const handleCloseAlert = () => {
        setHiddenAlert('hidden')
    }
    const handleCloseAlertCreate = () => {
        setHiddenAlertCreate('hidden')
    }

    const { materilalunit } = useSelector((state: matState) => state.matSlice)
    const [data, seDtata] = useState({ unit_no: null, material_umit: '', materil_unit_desc: '' })
    const dispatch = useDispatch()
    const [change, setChange] = useState('change')
    const [id, setId] = useState<Number | null>(null)

    function handleChange(ID_No: Number | null) {
        setChange(`${change === 'change' ? '' : 'change'}`)
        setId(ID_No)
    }

    async function handleUpdate(ID_No: Number) {

        const newData = [...materilalunit]
        const filterData = newData.filter((item) => {
            if (item.unit_no === ID_No) {
                return item
            }
        })
        setId(null)

        const reqData = {
            material_umit: filterData[0].material_umit,
            materil_unit_desc: filterData[0].materil_unit_desc
        }

        try {
            const res = await axios.patch(`${baseurl}mat/materialunit/${filterData[0].unit_no}/`, reqData, {
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
        const newdata = [...materilalunit]
        newdata[index] = { ...newdata[index], [key]: value };
        dispatch(getMaterialUnit(newdata))
    }


    const mutation =useMutation<any,any,any,unknown>({
        mutationFn : async (data)  => {
        return await axios.post(`${baseurl}mat/materialunit`,data,{headers:{
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

    

    const [unit,setUnit] = useState({material_unit:'',material_description:''})

    const handleSubmitUnit=()=>{
        console.log(unit)

        const data = {
            material_umit : unit.material_unit,
            materil_unit_desc: unit.material_description
        }

        mutation.mutate(data)

    }

    useEffect(()=>{
        fetchMaterialUnit()
    },[authToken?.access,mutation.data])


    const fetchMaterialUnit = async () => {

        try {
            const res = await axios.get(`${baseurl}mat/materialunit`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`,
                },
            });
            dispatch(getMaterialUnit(res.data))
            
        } catch (error) {
            console.log(error)
            
        }
         
        
    };  



    return {hiddenslert,handleCloseAlert,updateData,materilalunit,id,handleChangedata,handleChange,handleUpdate,unit,setUnit,handleSubmitUnit,mutation,hiddenslertcreate,handleCloseAlertCreate}
}