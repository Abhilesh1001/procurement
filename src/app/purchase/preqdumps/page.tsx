'use client'
import React, { useState } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import DumyInput from '@/components/dummyinput/DumyInput'
import {datatypePr,prmainData} from '@/type/type'
import {format, parseISO} from 'date-fns'
import { CSVLink } from 'react-csv'
import { useQuery } from '@tanstack/react-query'



const Page = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
    
   
    const fetchData = async  () =>{
        const res =await axios.get(`${baseurl}mat/createpurchase`,{
            headers:{
                Authorization : `Bearer ${authToken?.access}`
            }})

        return res.data
        
    }

    const {data} = useQuery({queryKey:['prequest'],queryFn:fetchData})

   
   let serialNumber = 0;

   const tableHead = ["S No",'Line No','PR No','Material No','Material Name','Material Unit','Price','Quantity','Total Price','Text','Created By','Date']

   let csvData:any=[]
   if(data){
    const newData = data?.map((item:prmainData ) => {
      const newItem = JSON.parse(item.item_json)
      return newItem.map((itemJson: datatypePr)=>{
               return [itemJson.line_no,item.pr_no,itemJson.material_no,itemJson.material_name,itemJson.material_unit,itemJson.material_price,itemJson.material_qty,itemJson.total_price,itemJson.material_text,item.user,item.time]
      })
    })

    csvData = [
        ['Line No','PR No','Material No','Material Name','Material Unit','Price','Quantity','Total Price','Text','Created By','Date']
     ,
      ...newData?.flat()
    ];




   }

  return (
    <div className='bg-base-100 min-h-screen mt-6'>
        <div></div>
        <div className=' container pt-4'>
            <div className='h-3'></div>
            <div className='flex'>
            <div className=' ml-10  pt-1 pb-1 pl-2 pr-2 text-sm rounded  drop-shadow-sm border-white shadow-sm border-1'><CSVLink filename={'PR-file.csv'}  data={csvData}>Export Excel</CSVLink></div>
           </div>
        </div>
        <div className=' ml-2 mr-2 h-[550px] overflow-auto text-nowrap my-2 bg-base-300 relative overflow-y-auto shadow-md mt-2  sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right ">
                            <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                                <tr >
                                    <th scope="col"></th>
                                   {tableHead.map((item)=>{
                                    return <th key={item} scope="col"><div className='ml-2 mr-2'>{item}</div></th>
                                   })}
                                </tr>
                            </thead>
                            <tbody >
                             {data?.map((item:prmainData,index:number)=>{
                                const newItem  = JSON.parse(item.item_json)
                                return newItem.map((itemJson:datatypePr,indexs:number)=>{    
                                    serialNumber += 1;
                                    return <tr key={indexs}>
                                        <td></td>
                                        <td><DumyInput indum={serialNumber}/></td>
                                        <td><DumyInput indum={itemJson.line_no} /></td>
                                        <td><DumyInput indum={item.pr_no} /></td>
                                        <td><DumyInput indum={itemJson.material_no} /></td>
                                        <td><DumyInput indum={itemJson.material_name} /></td>
                                        <td><DumyInput indum={itemJson.material_unit} /></td>
                                        <td><DumyInput indum={itemJson.material_price} /></td>
                                        <td><DumyInput indum={itemJson.material_qty} /></td>
                                        <td><DumyInput indum={itemJson.total_price} /></td>
                                        <td><DumyInput indum={itemJson.material_text} /></td>
                                        <td><DumyInput indum={item.user} /></td>
                                        <td><DumyInput indum={format(parseISO(item.time),'dd.MM.yy')} /></td>
                                    </tr>
                                })

                             })}
                            </tbody>
                        </table>
                    </div>
        
    </div>
  )
}

export default Page