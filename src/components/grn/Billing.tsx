import React from 'react'
import DumyInput from '../dummyinput/DumyInput'
import {useSelector,useDispatch} from 'react-redux'
import {grnsliiceState,billDetails } from  '@/type/grn/grntype'
import {getBillData} from '@/redux/grn/grnslicer'

const Billing = () => {
  const dispatch = useDispatch()
  const {grnview,billData} = useSelector((state:grnsliiceState)=>state.grnslice)
  const handleChange = (value:any,key:keyof billDetails) =>{
          console.log(value,key)
          const newData = {...billData}
          newData[key] = value
          console.log(newData)
          dispatch(getBillData(newData))
  }
  return (
    <div className='h-[100px] relative overflow-y-auto bg-base-300 shadow-md mt-4 mb-2 sm:rounded-lg'>
    <table className='w-full text-sm text-left rtl:text-right   '>
        <thead>
            <tr className='sticky top-0 z-1  h-10 bg-base-200'>
                <th><div className='ml-2'>Bill Date</div></th>
                <th>Bill No</th>
                <th>Delivery Note</th>
                <th>Transporter Name</th>
                <th>Way Bill No</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td>{grnview ?<DumyInput indum={billData.bill_date}/>:<input required type="date" value={billData.bill_date != null ? billData.bill_date : ''} onChange={(e) => handleChange(e.target.value, 'bill_date')} className="input input-bordered input-sm max-w-xs  text-sm  w-full" placeholder='DD.MM.YYYY' />}</td>

                    <td>{grnview ?<DumyInput indum={billData.bill_no}/>:<input required type="text" value={billData.bill_no != null ? billData.bill_no : ''} onChange={(e) => handleChange(e.target.value, 'bill_no')} className="input input-bordered input-sm max-w-xs  text-sm  w-full" />}</td>

                    <td>{grnview ?<DumyInput indum={billData.delivery_note}/>:<input required type="text" value={billData.delivery_note != null ? billData.delivery_note: ''} onChange={(e) => handleChange(e.target.value, 'delivery_note')} className="input input-bordered input-sm max-w-xs  text-sm  w-full" />}</td>

                    <td>{grnview ?<DumyInput indum={billData.transporter_name}/>:<input required type="text" value={billData.transporter_name != null ? billData.transporter_name : ''} onChange={(e) => handleChange(e.target.value, 'transporter_name')} className="input input-bordered input-sm max-w-xs  text-sm  w-full" />}</td>

                    <td>{grnview ?<DumyInput indum={billData.way_bill}/>:<input required type="text" value={billData.way_bill != null ? billData.way_bill : ''} onChange={(e) => handleChange(e.target.value, 'way_bill')} className="input input-bordered input-sm max-w-xs  text-sm  w-full" />}</td>
                </tr>
        </tbody>
    </table>
    </div>
  )
}

export default Billing