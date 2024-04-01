'use client'
import React from 'react'
import AdvancePaymentCreate from '@/components/payment/AdvancePaymentCreate'
import DumyInput from '@/components/dummyinput/DumyInput'
import { usePayment } from '@/hooks/payment/usePayment'
import {parseISO, format } from 'date-fns'




interface advanceType{
    advance_payment_no : number | null,
    amount_debit : number | null,
    time : string,
    po_no : string,
    user: number | null 
    main_amount: string
    vendor_name : string 
}



const AdvancePayment = () => {
  

    const {viewData} = usePayment()
    console.log(viewData)

   


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
                        
                            <AdvancePaymentCreate />
                            
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
                                    <th scope="col" className='px-6 py-2'>Advance Id</th>
                                    <th scope="col">PO Number</th>
                                    <th scope="col">Vendor Name</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Amout Advance</th>
                                    <th scope="col">Created By</th>
                                    <th scope="col">Date</th>
                                   
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {viewData?.map((items: advanceType) => {
                                    const vendo_name = JSON.parse(items.vendor_name)
                                    const mainData = JSON.parse(items.main_amount)
                            
                                    return <tr key={items.advance_payment_no}>
                                        <th scope="row"><DumyInput indum={items.advance_payment_no !== undefined ? items.advance_payment_no : null} /></th>
                                        <td><DumyInput indum={items.po_no} /></td>
                                        <td><DumyInput indum={vendo_name.vendor_name} /></td>
                                        <td><DumyInput indum={mainData.TotalWithtax} /></td>
                                        <td><DumyInput indum={items.amount_debit} /></td>
                                        <td><DumyInput indum={items.user} /></td>
                                        <td><DumyInput indum={format(parseISO(items.time),'dd-MM-yyyy')} />{ }</td>
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

export default AdvancePayment