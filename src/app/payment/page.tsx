'use client'
import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import DumyInput from '@/components/dummyinput/DumyInput'
import { parseISO, format } from 'date-fns'



interface paymentType {
  payment_no?: number | null,
  amount_debit: number | null,
  user: number | null,
  time: string,
  item_grn: string,
  main_data: string,
  miro_no: number | null,
  vendor_name: string,
  bill_no: string,
  advance_adjust :number|string

}

const Payment = () => {
  const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)

  async function fetchData() {
    const res = await axios.get(`${baseurl}payment/payment`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })

    return res.data
  }

  const { data } = useQuery({ queryKey: ['payment'], queryFn: fetchData })
  console.log(data)

  return (
    <div className='bg-base-100 min-h-screen'>

      <div className="container">
        <div className="pt-3">
          <div className="my-4 ">


            <button className="btn btn-success" onClick={() => {
              const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              }
            }}>Create</button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">

                {/* <AdvancePaymentCreate /> */}

                <div className="modal-action">

                </div>
              </div>
            </dialog>

          </div>


          {/* table  */}

          <div className="relative text-nowrap overflow-y-auto shadow-md mt-4  sm:rounded-lg bg-base-300  h-96">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className='sticky top-0 z-1 bg-base-200  h-10'>
                <tr>
                  <th scope="col" className='px-6 py-2'>Payment No</th>
                  <th scope="col">Miro No</th>
                  <th scope="col">PO No</th>
                  <th scope="col">Vendor Name</th>
                  <th scope="col">Bill NO</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Advance Adjust</th>
                  <th scope="col">Amout Paid</th>
                  <th scope="col">User</th>
                  <th scope="col">Date</th>

                </tr>
              </thead>
              <tbody className='text-center'>

                {data?.map((items: paymentType) => {
                  const vendo_name = JSON.parse(items.vendor_name)
                  const mainData = JSON.parse(items.main_data)
                  const bill_no = JSON.parse(items.bill_no)
                  const item_grn = JSON.parse(items.item_grn)
                  console.log(vendo_name,bill_no,item_grn)
                  return <tr key={items.payment_no}>

                    <td scope="row"><DumyInput indum={items.payment_no !== undefined ? items.payment_no : null} /></td>
                    <td><DumyInput indum={items.miro_no} /></td>
                    <td><DumyInput indum={item_grn[0].po_no} /></td>
                    <td><DumyInput indum={vendo_name.vendor_name} /></td>
                    <td><DumyInput indum={bill_no.bill_no} /></td>
                    <td><DumyInput indum={mainData.TotalWithtax} /></td>
                    <td><DumyInput indum={items.advance_adjust} /></td>
                    <td><DumyInput indum={items.amount_debit} /></td>
                    <td><DumyInput indum={items.user} /></td>
                    <td><DumyInput indum={format(parseISO(items.time), 'dd-MM-yyyy')} /></td>


                  </tr>
                })}





              </tbody>
            </table>
          </div>





        </div>

      </div>


    </div>
  )
}

export default Payment