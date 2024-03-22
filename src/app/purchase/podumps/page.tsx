'use client'
import dynamic from 'next/dynamic';
import React, { useState,memo } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import {podataType,vendorType,datatype} from '@/type/type'
import { CSVLink} from "react-csv";
import { useQuery } from '@tanstack/react-query';

const Prdumps = dynamic(() => import('@/components/purchaserequest/Prdumps'));


const Page = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
   
    const fetchData = async  () =>{
        const res =await axios.get(`${baseurl}mat/createpo`,{
            headers:{
                Authorization : `Bearer ${authToken?.access}`
            }})
        return res.data
    }

    const {data} = useQuery({queryKey:['porder'],queryFn:fetchData})
   
   const tableHead = ['S No','PO Line','PO No','Material No','Material Name','Material Unit','Price','Quantity','Total Price','Material Tax','Total Amount with Tax','Text','Created By','Date','PR line','PR No','Vendor Id','Vendor Name','Deliver Id','Delivery Name']

   let csvData:any=[]

   if(data){
    const newData = data?.map((item:podataType ) => {
      const newItem = JSON.parse(item.item_pr)
      const vendorDetails: vendorType = JSON.parse(item.vendor_address)
      const DeliveryDetails: vendorType = JSON.parse(item.delivery_address)
      return newItem.map((itemJson: datatype, indexs: number)=>{
               return [itemJson.po_line,item.po_no,itemJson.material_no,itemJson.material_name,itemJson.material_unit,itemJson.material_price,itemJson.material_qty,itemJson.total_amount,itemJson.material_tax,itemJson.total_tax,itemJson.material_text,item.user,item.time,itemJson.line_no,itemJson.pr_no,vendorDetails.s_no,vendorDetails.name,DeliveryDetails.s_no,DeliveryDetails.name]
      })
    })

    csvData = [
      ["PO Line", "PO No", 'Material No', 'Material Name', 'Material Unit', 'Price', 'Qty', 'Total Price', 'Material Tax', 'Total Amount with Tax', 'Text', 'created by', 'Date', 'PR line', 'PR No','Vendor Id', 'Vendor Name', 'Delivery Id', 'Delivery Name'],
      ...newData?.flat()
    ];

   }

  return (
    <div className='bg-base-100 min-h-screen mt-6'>
 
        <div className=' container pt-4'>
        <div className='h-3'>
            
        </div>
           <div className='flex'>
            <div className=' ml-10  pt-1 pb-1 pl-2 pr-2 text-sm rounded hover:dark:bg-slate-800 drop-shadow-sm border-white shadow-sm border-1'><CSVLink filename={'PO-file.csv'}  data={csvData}>Export Excel</CSVLink></div>
           
           </div>
        </div>
        <div className=' ml-2 mr-2 h-[75vh] overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md  mt-2  sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className='sticky top-0 z-1 bg-base-200 h-10'>
                                <tr >
                                    <th scope="col"></th>
                                    {tableHead.map((item)=>{
                                        return <th scope="col" key={item}><div className='ml-2 mr-2'>{item}</div></th>
                                    })}
                                </tr>
                            </thead>
                            <Prdumps data={data} />
                        </table>
                    </div>
        
    </div>
  )
}

export default memo(Page)