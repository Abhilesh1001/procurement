
'use client'
import React from 'react'
import { useMaterial } from '@/hooks/material/useMaterial'
import DumyInput from '@/components/dummyinput/DumyInput'
interface matType {
    s_no:number | null,
    material_name:string, 
    material_group:string,
    unit:string, 
    user :string,
}

const MaterialDisplaytable = () => {
    const {matdata } = useMaterial()
   console.log(matdata)
  return (
    <div className="relative overflow-y-auto shadow-xl  bg-neutral mt-2 sm:rounded-lg max-h-screen h-[550px]">
    <table className=" text-sm mt-4 text-left rtl:text-right text-gray-500 bg-sky-600 dark:text-gray-400">
        <thead className='text-xs text-gray-50 uppercase bg-sky-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
                <th ><DumyInput indum={'Material Code'}/></th>
                <th ><DumyInput indum={'Material Name'}/></th>
                <th ><DumyInput indum={'Material Group'}/></th>
                <th ><DumyInput indum={'Unit'}/></th>
                <th ><DumyInput indum={'User'}/></th> 
            </tr>
        </thead>
        <tbody>
            {
                matdata?.length != undefined && matdata?.length > 0 && matdata?.map(( items:matType ) => {
                    const {s_no,material_name,material_group,unit,user} = items
                    return <tr className='odd:bg-sky-600 text-gray-50 odd:dark:bg-gray-900 even:bg-sky-400  even:dark:bg-gray-800 border-b dark:border-gray-700' key={s_no}>
                        <th ><div className="text-nowrap"><DumyInput indum={s_no}/></div></th>
                        <td > <div className="text-nowrap"><DumyInput indum={material_name} /></div></td>
                        <td > <div className="text-nowrap"><DumyInput indum={material_group} /></div></td>
                        <td > <div className="text-nowrap"><DumyInput indum={unit}/></div></td>
                        <td > <div className="text-nowrap"><DumyInput indum={user} /></div></td>
                    </tr>
                })
            }

        </tbody>
    </table>
</div>
  )
}

export default MaterialDisplaytable