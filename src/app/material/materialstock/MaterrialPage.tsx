'use client'
import React, { useState, memo } from 'react'
import axios from 'axios'
import PrBurron from '@/components/button/PrBurron'
import { useQuery } from '@tanstack/react-query'
import DumyInput from '@/components/dummyinput/DumyInput'
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import { soundClick } from '@/sound/sound'
import { CSVLink } from 'react-csv'


const MaterrialPage = () => {

    const {baseurl,authToken} = useSelector((state:StateProps)=>state.counter)
    
    const getData = async () => {
        
        const res = await axios.get(`${baseurl}grn/materialstock`,{
            headers:{
                Authorization:`Bearer ${authToken?.access}`
            }
        })
        const data = res.data
        
        return data
    }

    const { data: res,error } = useQuery({ queryKey: ['materialStock'], queryFn: getData,staleTime:1000*4 })
   
    let serialNumber = 0;

    let csvData: any[] = [];

    if (res) {
        const newData = res?.map((item: any) => {
            return [item.material_no, item.material_name, item.material_unit, item.material_qty];
        });
    
        csvData = [
            ['Material No', 'Material Name', 'Material Unit', 'Quantity'],
            ...newData 
        ];
    }
    
  return (
    <div className='bg-base-100 min-h-screen mt-6' >
            <div className="container">
                <div className='h-3'></div>
                <div className='flex'>
            <div className=' ml-10  pt-1 pb-1 pl-2 mt-4 mb-2 pr-2 text-sm rounded hover:dark:bg-slate-800 drop-shadow-sm border-white shadow-sm border-1'><CSVLink filename={'Material-file.csv'}  data={csvData}>Export Excel</CSVLink></div>
           </div>   
                <div className="row">
                    <div className="col-sm-6">
                        <div className=' ml-2 mr-2 h-[70vh] overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md bg-base-300 mt-2 sm:rounded-lg'>
                            <table className="w-full text-sm text-left rtl:text-right ">
                                <thead className='sticky top-0 z-1 bg-base-200 h-10'>
                                    <tr >
                                        <th scope="col"><div className='ml-2 mr-2'>S.No</div></th>
                                        <th scope="col"><div className='ml-2 mr-2'>Material No</div></th>
                                        <th scope="col"><div className='ml-2 mr-2'>Material Name</div></th>
                                        <th scope="col" ><div className='ml-2 mr-2'>Materil Unit</div></th>
                                        <th scope="col"><div className='ml-2 mr-2'>Material Qty</div></th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        res?.map((item: any) => {
                                            serialNumber += 1
                                            return <tr key={item.material_no}>
                                                <td><DumyInput indum={serialNumber} /></td>
                                                <td><DumyInput indum={item.material_no} /></td>
                                                <td><DumyInput indum={item.material_name} /></td>
                                                <td><DumyInput indum={item.material_unit} /></td>
                                                <td><DumyInput indum={item.material_qty} /></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-sm-6">

                    </div>
                   </div>
            </div>
        </div>
  )
}

export default MaterrialPage