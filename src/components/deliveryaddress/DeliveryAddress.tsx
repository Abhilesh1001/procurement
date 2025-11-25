import { useDelivery } from '@/hooks/deliveryaddress/useDelivery'
import React, { useState } from 'react'
import Loading from '../loading/Loading'
import DumyInput from '../dummyinput/DumyInput'

const DeliveryAddress = () => {

    const { handleUPdate, change, mutation, handleSubmit, vendor, setVendor, newData, vid, setVid, handleChange, handleCreate, handleKeyDown, mutationUpdate, sfcreate, companyId, setCompanyID, handleAddressSubmit, mutationAddress } = useDelivery()

    


    return (
        <div className="mt-4">
            <div className=''>

                <div className='flex justify-between'>
                    <div>
                        <button onClick={handleCreate} className="btn btn-success">Create</button>
                        <button onClick={handleChange} className="btn btn-warning ml-2">Change</button>
                        {change === 'create' && <button onClick={handleUPdate} className="btn btn-primary ml-2">Update</button>}
                    </div>

                    <div>
                        {change !== 'create' && <div className='w-full h-6 flex justify-center'>{mutation.isPending && <Loading />}{mutation.isSuccess && <div><div>{mutation?.data !== undefined && mutation.data.data.msg}Material No. {mutation.data !== undefined && mutation.data.data.data.s_no}</div></div>}</div>}

                        {/* updata  */}

                        {change === 'create' && <div className='w-full h-2 flex justify-center'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate?.data !== undefined && mutationUpdate.data.data.msg} Material No. {mutationUpdate !== undefined && mutationUpdate.data.data.data.s_no}</div></div>}</div>}
                    </div>



                    <div>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-error">Close</button>
                        </form>
                    </div>
                </div>



            </div>    

            {change === 'create' && <><label htmlFor="Material No" className="form-label mb-2 dark:text-gray-50 text-sm">Vendor Id</label>
                <input type="number" placeholder='Vendor Id' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full" /></>}

            {sfcreate == 'create' && <form onSubmit={handleSubmit}>

                <div className="row">
                    <div className="col-sm-6">
                        <label htmlFor="Name" className="form-label text-sm">Name</label>
                        <input type="text" placeholder='Name' value={vendor.name} onChange={(e) => setVendor({ ...vendor, name: e.target.value })} className="input input-bordered w-full" />
                        <label htmlFor="Phone" className="form-label text-sm ">Phone No</label>
                        <input type="number" value={vendor.phone_no === null || vendor.phone_no === 0 ? '' : vendor.phone_no} placeholder='Phone No' onChange={(e) => setVendor({ ...vendor, phone_no: Number(e.target.value) })} className="input input-bordered w-full" />

                        <label htmlFor="Vendorname" className="form-label text-sm">Vendor Name</label>

                        <input type="text" value={vendor.vendor_name} placeholder='Vendor Name' onChange={(e) => setVendor({ ...vendor, vendor_name: e.target.value })} className="input input-bordered w-full" />

                        <label htmlFor="GST" className="form-label text-sm">GST</label>
                        <input type="text" value={vendor.gst} placeholder='gst' onChange={(e) => setVendor({ ...vendor, gst: e.target.value })} className="input input-bordered w-full" />

                        {change !== 'create' && <button type='submit' className="btn btn-success mt-2">Submit</button>}
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="Email" className="form-label text-sm">Email</label>
                        <input type="email" value={vendor.email} placeholder='email' onChange={(e) => setVendor({ ...vendor, email: e.target.value })} className="input input-bordered w-full" />

                        <label htmlFor="Address" className="form-label text-sm">Address</label>
                        <input type="text" value={vendor.address} placeholder='Vendor Name' onChange={(e) => setVendor({ ...vendor, address: e.target.value })} className="input input-bordered w-full" />


                        {/* company address  */}


                        <label htmlFor="CO\ompanyAddress" className="form-label text-sm">Company Address</label>
                        <div className='flex'>
                            <input type="number" value={companyId === null ? '' : companyId} placeholder='Enter Company ID' onChange={(e) => setCompanyID(Number(e.target.value))} className="input input-bordered w-full" />
                            <button type='button' onClick={handleAddressSubmit} className='btn btn-accent ml-2'>Enter ID</button>
                        </div>
                        <div className='my-4'>
                            <label htmlFor="Companyname" className="form-label text-sm">Company Name</label>
                            <DumyInput indum={vendor.company_address} />
                        </div>
                        <div className='my-4'>

                            <label htmlFor="Companyname" className="form-label text-sm">Company</label>
                            <DumyInput indum={vendor.company_name} />
                        </div>
                    </div>
                </div>
            </form>}

        </div>
    )
}

export default DeliveryAddress