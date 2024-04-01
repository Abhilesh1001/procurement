import React from 'react'
import { StateProps } from '@/type/type'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import DumyInput from '@/components/dummyinput/DumyInput'

interface paymentType {
    miro_no: number | null,
    main_data: string,
    bill_no: string,
    total_paid_amount : number | null,
    vendor_name: string,
    item_grn: string,
  }




const MiroTotalPayment = () => {


    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)

    async function fetchData() {
      const res = await axios.get(`${baseurl}payment/paymnetbymiro`, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
  
      return res.data
    }
  
    const { data } = useQuery({ queryKey: ['paymentbymiro'], queryFn: fetchData })
    console.log(data)

  return (
    <div className="relative text-nowrap overflow-y-auto shadow-md mt-4  sm:rounded-lg bg-base-300  h-96">

            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className='sticky top-0 z-1 bg-base-200  h-10'>
                <tr>
                 
                  <th scope="col">Miro No</th>
                  <th scope="col">PO No</th>
                  <th scope="col">Vendor Name</th>
                  <th scope="col">Bill NO</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Amout Paid</th>
                  <th scope="col">Balance Amount</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {data?.map((items: paymentType) => {
                  const vendo_name = JSON.parse(items.vendor_name)
                  const mainData = JSON.parse(items.main_data)
                  const bill_no = JSON.parse(items.bill_no)
                  const item_grn = JSON.parse(items.item_grn)
                  console.log(vendo_name, bill_no, item_grn)

                  const balanceAmount = mainData.TotalWithtax -  (items.total_paid_amount !==null ? items.total_paid_amount : 0)
                  return <tr key={items.miro_no}>
                    <td><DumyInput indum={items.miro_no} /></td>
                    <td><DumyInput indum={item_grn[0].po_no} /></td>
                    <td><DumyInput indum={vendo_name.vendor_name} /></td>
                    <td><DumyInput indum={bill_no.bill_no} /></td>
                    <td><DumyInput indum={mainData.TotalWithtax} /></td>
                    <td><DumyInput indum={items.total_paid_amount} /></td>
                    <td><DumyInput indum={balanceAmount} /></td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        
  )
}

export default MiroTotalPayment