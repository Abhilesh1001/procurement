// dependenciew
import React, {memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// typescript 
import {vendorType,StateProps,posliiceState } from '@/type/type'

// redux 
import { getVendorAdress } from '@/redux/po/poslicer'


// components 
import DumyInput from '../dummyinput/DumyInput'



const VendorDetails = () => {

    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
    const  { vendoradress: vendor, selectedValue, podata } = useSelector((state: posliiceState) => state.poslicer)
    const dispatch = useDispatch()
    let vendorAdress:vendorType={ 
        s_no:null,
        name: '',
        phone_no: null,
        vendor_name: '',
        address: '',
        gst: '',
        email: ''};
    if(podata.vendor_address !== ''){
        vendorAdress = JSON.parse(podata.vendor_address)
    }

    const handleClickVendor = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value !== '') {
            try {
                const res = await axios.get(`${baseurl}mat/createvender/${e.target.value}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                dispatch(getVendorAdress(res.data))

            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
          <div className='h-[100px] relative overflow-y-auto bg-base-300 shadow-md mt-4 mb-2 sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right'>
                <thead className='bg-base-200'>
                    <tr className='sticky top-0 z-1  h-10'>
                        <th>Party Id</th>
                        <><th>Name</th>
                        <th>Phone No</th>
                        <th>Party Name</th>
                        <th>Party Adrress</th>
                        <th>Party GST No</th>
                        <th>Email ID</th></> 
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{selectedValue==='PO'? <DumyInput indum={vendorAdress.s_no !== null && vendorAdress.s_no !== undefined ?vendorAdress.s_no:''} />:<input type="number" className="input input-bordered input-sm max-w-xs text-sm w-24"  onChange={(e) => handleClickVendor(e)} />}</td>
                            { 
                            <><td><DumyInput indum= {selectedValue==='PO'?vendorAdress.vendor_name:vendor.name} /></td>
                            <td><DumyInput indum={selectedValue==='PO'?vendorAdress.phone_no:vendor.phone_no} /></td>
                            <td><DumyInput indum={selectedValue==='PO'?vendorAdress.vendor_name:vendor.vendor_name} /></td>
                            <td><DumyInput indum={selectedValue==='PO'?vendorAdress.address:vendor.address} /></td>
                            <td><DumyInput indum={selectedValue==='PO'?vendorAdress.gst:vendor.gst} /></td>
                            <td><DumyInput indum={selectedValue==='PO'?vendorAdress.email:vendor.email} /></td></>
                            }
                            
                        </tr>
                </tbody>
            </table>
            </div>

    )
}

export default memo(VendorDetails)