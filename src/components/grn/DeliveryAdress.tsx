// dependencies 
import React, { useEffect, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// typeScript 
import { StateProps, posliiceState, DeliveryType } from '@/type/type'
import { grnsliiceState, datatype } from "@/type/grn/grntype"

// redux 
import { getDEliveryAdress } from '@/redux/po/poslicer'

// component 
import DumyInput from '../dummyinput/DumyInput'


const DeliveryAdress = () => {
    const { data, grnpoview, selectedValue, mainData, billData, orignalData, deliveryadress } = useSelector((state: grnsliiceState) => state.grnslice)




    return (
        <div className='h-[100px] relative overflow-y-auto bg-base-300 shadow-md  mt-4 mb-2 sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right '>
                <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                    <tr>
                        <th>Company</th>
                        <th>Company Code</th>
                        <th>Name</th>
                        <th>Phone No</th>
                        <th>Delivery Adrress</th>
                        <th>GST No</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td> <DumyInput indum={deliveryadress.company} /></td>
                        <td> <DumyInput indum={deliveryadress.company_adress_code} /></td>
                        <td> <DumyInput indum={deliveryadress.name} /></td>
                        <td> <DumyInput indum={deliveryadress.phone_no} /></td>
                        <td> <DumyInput indum={deliveryadress.address} /></td>
                        <td> <DumyInput indum={deliveryadress.gst} /></td>
                        <td> <DumyInput indum={deliveryadress.email} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default memo(DeliveryAdress)