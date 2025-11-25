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



    let deliveryAddress: DeliveryType = {
        s_no: null,
        address: '',
        company_address: '',
        company_name: '',
        company_s_no: null,
        company_adress_code :'',
        email: '',
        gst: '',
        name: '',
        phone_no: null,
        vendor_name: '',
        company :''
    };
    console.log(podata.delivery_address, 'podata');


    if (podata.delivery_address && typeof podata.delivery_address === 'string') {
        try {
            deliveryAddress = JSON.parse(podata.delivery_address);
        } catch (error) {
            console.error('Error parsing delivery_address:', error);
        }
    }

    // console.log(deliveryAddress, 'delivery address');

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
                    company_s_no : data.data.company_s_no,
                    company_name : data.data.company_name,
                    company_address : data.data.company_address,
                    company_adress_code : data.data.company_adress_code,
                    company : data.data.company,
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
                        <th>Company</th>
                        <th>Company Code</th>
                        

                        <th>Name</th>
                            <th>Phone No</th>
                            <th>Name</th>
                            <th>Delivery Adrress</th>
                            <th>GST No</th>
                            <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>

                            {selectedValue === 'PO' ? <DumyInput indum={deliveryAddress.s_no !== null && deliveryAddress.s_no !== undefined ? deliveryAddress.s_no : ''} /> : <input type="number" className="input input-bordered input-sm max-w-xs text-sm w-24" onChange={(e) => addressDetails(e)} />}
                        </td>
                        { <>
                        <td> <DumyInput indum={selectedValue === 'PO' ? deliveryAddress.company : devAdress.company} />
                        </td>
                        <td> <DumyInput indum={selectedValue === 'PO' ? deliveryAddress.company_adress_code : devAdress.company_adress_code} />
                        </td>
                        <td> <DumyInput indum={selectedValue === 'PO' ? deliveryAddress.name : devAdress.name} />
                        </td>
                            <td> <DumyInput indum={selectedValue === 'PO' ? deliveryAddress.phone_no : devAdress.phone_no} />  </td>
                            <td><DumyInput indum={selectedValue === 'PO' ? deliveryAddress.vendor_name : devAdress.vendor_name} /></td>
                            <td><DumyInput indum={selectedValue === 'PO' ? deliveryAddress.address : devAdress.address} /></td>
                            <td><DumyInput indum={selectedValue === 'PO' ? deliveryAddress.gst : devAdress.gst} /></td>
                            <td><DumyInput indum={selectedValue === 'PO' ? deliveryAddress.email : devAdress.email} /></td></>}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default memo(DeliveryAdress)