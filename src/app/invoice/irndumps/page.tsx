'use client'
import React,{useState} from 'react'
import PrBurron from '@/components/button/PrBurron'
import Loading from '@/components/loading/Loading'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import { soundClick } from '@/sound/sound'
import { irndataType,billDetails,datatype } from '@/type/irn/irn'
import DumyInput from '@/components/dummyinput/DumyInput'
import { vendorType } from '@/type/type'
import {format, parseISO} from 'date-fns'
import { CSVLink} from "react-csv";

const IrnDumps = () => {
    
    const {baseurl,authToken} = useSelector((state:StateProps)=>state.counter)

    async function fetchData(){
        const res = await axios.get(`${baseurl}grn/mirocreate`,{
            headers:{
                Authorization:`Bearer ${authToken?.access}`
            }
        })

       
        return res.data
    }

    const {data,error,isLoading,isError} =  useQuery({ queryKey: ['irndata'], queryFn: fetchData,staleTime:1000*4 })
 

   

     let serialNumber=0
    const tableHead = ['S No','Line No','MRN No','Material No','Material Name','Material Unit','Price','Quantity','Total Price','Material Tax','Total Amount with Tax','Text','Created By','Date','Po No','PR No','GRN NO','Vendor Id','Vendor Name','Deliver Id','Delivery Name','Bill No','Bill Data','Delivery Note']


    let csvData:any=[]
    if(data){
     const newData = data?.map((item:irndataType ) => {
       const newItem = JSON.parse(item.item_grn)
       const vendorDetails: vendorType = JSON.parse(item.vendor_address)
       const DeliveryDetails: vendorType = JSON.parse(item.delivery_address)
       const billingDetails: billDetails = JSON.parse(item.billing)
       return newItem.map((itemJson: datatype, indexs: number)=>{
                return [itemJson.irn_line,item.mir_no,itemJson.material_no,itemJson.material_name,itemJson.material_unit,itemJson.material_price,itemJson.material_qty,itemJson.total_amount,itemJson.material_tax,itemJson.total_tax,itemJson.material_text,item.user,item.time,itemJson.po_line,itemJson.po_no,itemJson.line_no,itemJson.pr_no,itemJson.grn_line,itemJson.grn_no,vendorDetails.s_no,vendorDetails.name,DeliveryDetails.s_no,DeliveryDetails.name,billingDetails.bill_no,billingDetails.bill_date,billingDetails.delivery_note]
       })
     })
 
     csvData = [
       ["MRN Line", "MRN No", 'Material No', 'Material Name', 'Material Unit', 'Price', 'Qty', 'Total Price', 'Material Tax', 'Total Amount with Tax', 'Text', 'created by', 'Date', 'Po line', 'Po no', 'PR Line', 'PR no','GRN Line','GRN No', 'Vendor Id', 'Vendor Name', 'Delivery Id', 'Delivery Name', 'Bill No', 'Bill Date', 'Bill Note'],
       ...newData?.flat()
     ];
 
    }


  return (
    <div className='bg-base-100 min-h-screen mt-6'>
        
         <div className='pt-6'>
        
            <div className='flex  text-center'>
            <div className='ml-10 pt-1 pb-1 pl-2 pr-2 text-sm rounded  drop-shadow-sm border-white shadow-sm border-1'><CSVLink filename={'IRN-file.csv'}  data={csvData}>Export Excel</CSVLink></div>
                {isLoading && <Loading />}
            {/* <div>{isLoading && <Loading />}</div> */}
           
            </div>

            <div className=' ml-2 mr-2 h-[75vh]  bg-base-300 overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md  mt-2  sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right  ">
                            <thead className='sticky top-0 z-1 bg-base-200 h-10'>
                                <tr >
                                    <th scope="col"></th>
                                    {
                                        tableHead.map((item)=>{
                                            return <th scope="col" key={item}><div className='ml-2 mr-2'>{item}</div></th>
                                        })
                                    }
                                    
                                </tr>
                            </thead>
                            <tbody >
                             {data?.map((item:irndataType,index:number)=>{
                                const newItem  = JSON.parse(item.item_grn)
                                const vendorDetails:vendorType = JSON.parse(item.vendor_address)
                                const DeliveryDetails:vendorType = JSON.parse(item.delivery_address)
                                const billingDetails:billDetails = JSON.parse(item.billing)
                                return newItem.map((itemJson:datatype,indexs:number)=>{    
                                    serialNumber += 1;
                                    return <tr key={indexs}>
                                        <td></td>
                                        <td><DumyInput indum={serialNumber}/></td>
                                        <td><DumyInput indum={itemJson.irn_line} /></td>
                                        <td><DumyInput indum={item.mir_no} /></td>
                                        <td><DumyInput indum={itemJson.material_no} /></td>
                                        <td><DumyInput indum={itemJson.material_name} /></td>
                                        <td><DumyInput indum={itemJson.material_unit} /></td>
                                        <td><DumyInput indum={itemJson.material_price} /></td>
                                        <td><DumyInput indum={itemJson.material_qty} /></td>
                                        <td><DumyInput indum={itemJson.total_amount} /></td>
                                        <td><DumyInput indum={itemJson.material_tax}/></td>
                                        <td><DumyInput indum={itemJson.total_tax} /></td>
                                        <td><DumyInput indum={itemJson.material_text} /></td>
                                        <td><DumyInput indum={item.user} /></td>
                                        <td><DumyInput indum={format(parseISO(item.time),'dd.MM.yy')} /></td>
                                        <td><DumyInput indum={itemJson.po_no} /></td>
                                        <td><DumyInput indum={itemJson.pr_no} /></td>
                                        <td><DumyInput indum={itemJson.grn_no} /></td>
                                        <td><DumyInput indum={vendorDetails.s_no !==undefined ? vendorDetails.s_no:''  } /></td>
                                        <td><DumyInput indum={vendorDetails.vendor_name} /></td>
                                        <td><DumyInput indum={DeliveryDetails.s_no!==undefined ? DeliveryDetails.s_no:''} /></td>
                                        <td><DumyInput indum={DeliveryDetails.vendor_name} /></td>
                                        <td><DumyInput indum={billingDetails.bill_no} /></td>
                                        <td><DumyInput indum={billingDetails.bill_date} /></td>
                                        <td><DumyInput indum={billingDetails.delivery_note} /></td>
                                    </tr>
                                })

                             })}
                            </tbody>
                        </table>
        </div>
           
        </div>
        </div>
  )
}

export default IrnDumps