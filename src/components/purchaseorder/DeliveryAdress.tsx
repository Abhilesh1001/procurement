// dependencies 
import React, { useEffect, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// typeScript 
import { StateProps, posliiceState } from '@/type/type'

// redux 
import { getDEliveryAdress } from '@/redux/po/poslicer'

// component 
import DumyInput from '../dummyinput/DumyInput'


const DeliveryAdress = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
    const { deliveryadress: devAdress } = useSelector((state: posliiceState) => state.poslicer)
    const dispatch = useDispatch()
    const addressDetails = async () => {

        try {
            const data = await axios.get(`${baseurl}mat/createDelivery/1/`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })

            dispatch(getDEliveryAdress(data.data))
        } catch (errors) {
            console.log(errors)
        }
    }
    useEffect(() => {
        if(authToken?.access!==null){
            addressDetails()
        }
    }, [authToken?.access])


    return (
        <div className='h-[100px] relative overflow-y-auto bg-base-300 shadow-md  mt-4 mb-2 sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right '>
            <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                <tr>
                    <th>Delivery Id</th>
                    {devAdress.name !== "" && <><th>Name</th>
                        <th>Phone No</th>
                        <th>Name</th>
                        <th>Delivery Adrress</th>
                        <th>GST No</th>
                        <th>Email</th></>}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><DumyInput indum={devAdress.s_no !== null && devAdress.s_no !== undefined ?devAdress.s_no :''  } /></td>
                    {devAdress.name !== "" && <><td> <DumyInput indum={devAdress.name} /></td>
                        <td> <DumyInput indum={devAdress.phone_no} />  </td>
                        <td><DumyInput indum={devAdress.vendor_name} /></td>
                        <td><DumyInput indum={devAdress.address} /></td>
                        <td><DumyInput indum={devAdress.gst} /></td>
                        <td><DumyInput indum={devAdress.email} /></td></>}

                </tr>
            </tbody>
        </table>
        </div>
    )
}

export default memo(DeliveryAdress)