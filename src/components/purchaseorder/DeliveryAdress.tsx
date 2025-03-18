// dependencies 
import React, { useEffect, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// typeScript 
import { StateProps, posliiceState, DeliveryType } from '@/type/type'

// redux 
import { getDEliveryAdress } from '@/redux/po/poslicer'

// component 
import DumyInput from '../dummyinput/DumyInput'


const DeliveryAdress = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
    const { deliveryadress: devAdress, selectedValue, podata } = useSelector((state: posliiceState) => state.poslicer)
    const dispatch = useDispatch()

    console.log(devAdress)

    let devileryAdress: DeliveryType = {
        s_no: null,
        name: '',
        phone_no: null,
        vendor_name: '',
        address: '',
        gst: '',
        email: '',
        company_s_no: null,
        company_name: '',
        company_address: ''

    };
    if (podata.delivery_address !== '') {
        devileryAdress = JSON.parse(podata.delivery_address)
    }


    const addressDetails = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value !== '') {
            try {
                const data = await axios.get(`${baseurl}mat/createDelivery/${e.target.value}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                console.log(data.data)
                const newData = {
                    s_no: data.data.s_no,
                    name: data.data.name,
                    phone_no: data.data.phone_no,
                    vendor_name: data.data.vendor_name,
                    address: data.data.address,
                    gst: data.data.gst,
                    email: data.data.email,
                    // company_address : data.data.company_address,
                }



                dispatch(getDEliveryAdress(newData))
            } catch (errors) {
                console.log(errors)
            }
        }
    }



    return (
        <div className='h-[100px] relative overflow-y-auto bg-base-300 shadow-md  mt-4 mb-2 sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right '>
                <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                    <tr>
                        <th>Delivery Id</th>
                        {devileryAdress.name !== "" && <><th>Name</th>
                            <th>Phone No</th>
                            <th>Name</th>
                            <th>Delivery Adrress</th>
                            <th>GST No</th>
                            <th>Email</th></>}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>

                            {selectedValue === 'PO' ? <DumyInput indum={devileryAdress.s_no !== null && devileryAdress.s_no !== undefined ? devileryAdress.s_no : ''} /> : <input type="number" className="input input-bordered input-sm max-w-xs text-sm w-24" onChange={(e) => addressDetails(e)} />}
                        </td>

                        {devileryAdress.name !== "" && <><td> <DumyInput indum={devileryAdress.name} /></td>
                            <td> <DumyInput indum={selectedValue==='PO'?devileryAdress.phone_no :devAdress.phone_no } />  </td>
                            <td><DumyInput indum={selectedValue==='PO'?devileryAdress.vendor_name:devAdress.vendor_name} /></td>
                            <td><DumyInput indum={selectedValue==='PO'?devileryAdress.address:devAdress.address} /></td>
                            <td><DumyInput indum={selectedValue==='PO'?devileryAdress.gst:devAdress.gst} /></td>
                            <td><DumyInput indum={selectedValue==='PO'?devileryAdress.email:devAdress.email} /></td></>}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default memo(DeliveryAdress)