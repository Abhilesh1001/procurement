// dependenciew
import React, {memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// typescript 
import {vendorType,StateProps,posliiceState } from '@/type/type'
import { grnsliiceState } from "@/type/grn/grntype"

// redux 
import { getVendorAdress } from '@/redux/po/poslicer'



// components 
import DumyInput from '../dummyinput/DumyInput'


const VendorDetails = () => {
    const {vendoradress} = useSelector((state:grnsliiceState)=>state.grnslice)
    





    return (
          <div className='h-[100px] relative overflow-y-auto shadow-md bg-base-300  mt-4 mb-2  sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right'  >
                <thead>
                    <tr className='sticky top-0 z-1 bg-base-200  h-10'>
                        <th>Party Id</th>
                        <><th>Name</th>
                        <th>Phone No</th>
                        <th>Party Name</th>
                        <th>Party Adrress</th>
                        <th>Party GST No</th>
                        <th>Email</th></> 
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td><DumyInput indum={vendoradress.s_no === undefined ?'':vendoradress.s_no} /></td>
                            <><td><DumyInput indum={vendoradress.name} /></td>
                            <td><DumyInput indum={vendoradress.phone_no} /></td>
                            <td><DumyInput indum={vendoradress.vendor_name} /></td>
                            <td><DumyInput indum={vendoradress.address} /></td>
                            <td><DumyInput indum={vendoradress.gst} /></td>
                            <td><DumyInput indum={vendoradress.email} /></td></>
                        
                            
                        </tr>
                </tbody>
            </table>
            </div>

    )
}

export default memo(VendorDetails)