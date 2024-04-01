import { usePayment } from '@/hooks/payment/usePayment'
import DumyInput from '../dummyinput/DumyInput'
import Loading from '../loading/Loading'

const AdvancePaymentCreate = () => {

    const { handleChange, handleUPdate, handleCreate, change, paymentData, setPaymentData, handleSubmit, handleKeyDown, handleKeyDownUpdate, mutation, updataMutation } = usePayment()


    return (


        <div>
            <div className='flex justify-between'>
                <div>
                    <button onClick={handleCreate} className="btn btn-success">Create</button>
                    <button onClick={handleChange} className="btn btn-warning ml-2">Change</button>
                    {change === 'create' && <button onClick={handleUPdate} className="btn btn-primary ml-2">Update</button>}
                </div>

                <div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-error">Close</button>
                    </form>
                </div>


            </div>

            {/* form Field  */}

            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />}{mutation.isSuccess && <div><div>{mutation?.data !== undefined && mutation.data.data.msg} APN NO. {mutation.data !== undefined && mutation.data.data.data.advance_payment_no}</div></div>}</div>}

            {/* updata  */}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{updataMutation.isPending && <Loading />} {updataMutation.isSuccess && <div><div>{updataMutation?.data !== undefined && updataMutation.data.data.msg} APN No. {updataMutation !== undefined && updataMutation.data.data.data.advance_payment_no}</div></div>}</div>}




            {change === 'create' && <> <label htmlFor="advance_payment_no" className="form-label text-sm mt-3">Advance ID</label>
                <input type="number" onKeyDown={(e) => handleKeyDownUpdate(e)} value={paymentData.advance_id === null || paymentData.advance_id === 0 ? '' : paymentData.advance_id} onChange={(e) => setPaymentData({ ...paymentData, advance_id: Number(e.target.value) })} className="input input-bordered w-full" /></>}


            <form onSubmit={handleSubmit}>
                <label htmlFor="po_no" className="form-label text-sm mt-3">PO No</label>
                {change !== 'create' ? <input type="number" onKeyDown={(e) => handleKeyDown(e)} value={paymentData.po_no === null || paymentData.po_no === 0 ? '' : paymentData.po_no} onChange={(e) => setPaymentData({ ...paymentData, po_no: Number(e.target.value) })} className="input input-bordered w-full" /> : <DumyInput indum={paymentData.po_no} />}

                <label htmlFor="vendor_name" className="form-label text-sm ">Vendor Name</label>
                {change !== 'create' ? <input type="text" value={paymentData.vendor_name} placeholder='' onChange={(e) => setPaymentData({ ...paymentData, vendor_name: e.target.value })} className="input input-bordered w-full" /> : <DumyInput indum={paymentData.vendor_name} />}

                <label htmlFor="total_amount" className="form-label text-sm ">Total Amount</label>
                {change !== 'create' ? <input type="number" value={paymentData.total_amount === null || paymentData.total_amount === 0 ? '' : paymentData.total_amount} placeholder='' onChange={(e) => setPaymentData({ ...paymentData, total_amount: Number(e.target.value) })} className="input input-bordered w-full" /> : <DumyInput indum={paymentData.total_amount} />}

                <label htmlFor="Amount Debit" className="form-label text-sm">Advance Amount</label>

                <input type="number" value={paymentData.amount_debit === null || paymentData.amount_debit === 0 ? '' : paymentData.amount_debit} placeholder='Advance Payment' onChange={(e) => setPaymentData({ ...paymentData, amount_debit: Number(e.target.value) })} className="input input-bordered w-full" />

                {change !== 'create' && <button type='submit' className="btn btn-success mt-2">Submit</button>}
            </form>
        </div>


    )
}

export default AdvancePaymentCreate