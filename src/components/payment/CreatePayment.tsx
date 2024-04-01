import React from 'react'
import { usePaymentVendor } from '@/hooks/payment/usePaymentVendor'
import Loading from '../loading/Loading'
import DumyInput from '../dummyinput/DumyInput'


const CreatePayment = () => {
    const {handleCreate,handleChange,change,handleUPdate,mutation,updataMutation,paymentData,setPaymentData,handleKeyDownUpdate,handleKeyDown,handleSubmit,handleDataChange,error} =usePaymentVendor()
    let balance_amount = 0
    
    if (paymentData.total_amount !== null && paymentData.total_paymet!== null && paymentData.total_paymet!==undefined ){

        balance_amount = paymentData.total_amount-paymentData.total_paymet
    }


  return (
    <div>
    <div className='flex justify-between'>
        <div>
            <button onClick={handleCreate} className="btn btn-success">Create</button>
            <button onClick={handleChange} className="btn btn-warning ml-2">Change</button>
            {change === 'create' && <span >{!error && <button onClick={handleUPdate} className="btn btn-primary ml-2">Update</button>}</span>}
        </div>

        <div>
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-error">Close</button>
            </form>
        </div>


    </div>

    {/* form Field  */}

    <div className='row'>

    <div className="col-sm-6">

    {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />}{mutation.isSuccess && <div><div>{mutation?.data !== undefined && mutation.data.data.msg} Payment ID. {mutation.data !== undefined && mutation.data.data.data.payment_no}</div></div>}</div>}

    {/* updata  */}

    {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{updataMutation.isPending && <Loading />} {updataMutation.isSuccess && <div><div>{updataMutation?.data !== undefined && updataMutation.data.data.msg} Payment ID. {updataMutation !== undefined && updataMutation.data.data.data.payment_no}</div></div>}</div>}

    {change === 'create' && <> <label htmlFor="advance_payment_no" className="form-label text-sm mt-3">Payment ID</label>
        <input type="number" onKeyDown={(e) => handleKeyDownUpdate(e)} value={paymentData.payment_no === null || paymentData.payment_no === 0 ? '' : paymentData.payment_no} onChange={(e) => setPaymentData({ ...paymentData, payment_no: Number(e.target.value) })} className="input input-bordered w-full" /></>}


    <form onSubmit={handleSubmit}>
        <label htmlFor="po_no" className="form-label text-sm mt-3">MIRO NO</label>
        {change !== 'create' ? <input type="number" onKeyDown={(e) => handleKeyDown(e)} value={paymentData.mir_no === null || paymentData.mir_no === 0 ? '' : paymentData.mir_no} onChange={(e) => setPaymentData({ ...paymentData, mir_no: Number(e.target.value) })} className="input input-bordered w-full" /> : <DumyInput indum={paymentData.mir_no} />}

        <label htmlFor="total_amount" className="form-label text-sm ">Amount Pay</label>
         <input type="number" value={paymentData.amount_debit === null || paymentData.amount_debit === 0 ? '' : paymentData.amount_debit} placeholder='' onChange={(e) => handleDataChange(Number(e.target.value),'amount_debit')} className="input input-bordered w-full" /> 

        <label htmlFor="Amount Debit" className="form-label text-sm">Advance Adjust</label>

        <input type="number" value={paymentData.advance_adjust === null || paymentData.advance_adjust === 0 ? '' : paymentData.advance_adjust} placeholder='Advance Adjust' onChange={(e) => handleDataChange(Number(e.target.value),'advance_adjust')} className="input input-bordered w-full" />
        {change !== 'create' && <div> {!error && <button type='submit' className="btn btn-success mt-2">Submit</button>}</div>}
    </form>

    </div>
    <div className="col-sm-6 my-10">
    <label htmlFor="Amount Debit" className="form-label text-sm">Total Bill Amount</label>
    <DumyInput indum={paymentData.total_amount === null ?'': String(paymentData.total_amount) } />

    <label htmlFor="Amount Debit" className="form-label text-sm">Blance Amount</label>
    <DumyInput indum={balance_amount === null ?'': balance_amount } />
    <label htmlFor="Amount Debit" className="form-label text-sm">Vendor Name</label>
    <DumyInput indum={paymentData.vendor_name} />
    
    <label htmlFor="Amount Debit" className="form-label text-sm">Total Advance Avilabel</label>
        <DumyInput indum={paymentData.total_advance_balance === null ?'': String(paymentData.total_advance_balance) } />
    <label htmlFor="Amount Debit" className="form-label text-sm">Total Payment</label>
        <DumyInput indum={paymentData.total_paymet === null ?'': String(paymentData.total_paymet) } />
    <label htmlFor="Amount Debit" className="form-label text-sm">Bill No</label>
        <DumyInput indum={paymentData.bill_no === null ?'': String(paymentData.bill_no) } />

    <label htmlFor="Amount Debit" className="form-label text-sm">PO No</label>
        <DumyInput indum={paymentData.po_no === null ?'': String(paymentData.po_no) } />
    </div>
    

    </div>
</div>
  )
}

export default CreatePayment