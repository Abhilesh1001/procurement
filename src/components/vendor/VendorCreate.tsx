import React from 'react'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import { useVendor } from '@/hooks/vendor/useVendor'


const VendorCreate = () => {

    const {handleUPdate,change,mutation,handleSubmit,vendor,setVendor,newData,vid,setVid,handleChange,handleCreate,handleKeyDown,mutationUpdate,sfcreate} = useVendor()
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
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-error">Close</button>
                    </form>
                </div>
            </div>

        {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />}{mutation.isSuccess && <div><div>{mutation?.data !== undefined && mutation.data.data.msg}Material No. {mutation.data !== undefined && mutation.data.data.data.s_no}</div></div>}</div>}

        {/* updata  */}

        {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate?.data !== undefined && mutationUpdate.data.data.msg} Material No. {mutationUpdate !== undefined && mutationUpdate.data.data.data.s_no}</div></div>}</div>}

    </div>

    {change === 'create' && <><label htmlFor="Material No" className="form-label mb-2 dark:text-gray-50 text-sm">Vendor Id</label>
        <input type="number" placeholder='Vendor Id' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full" /></>}

    {sfcreate == 'create'  && <form onSubmit={handleSubmit}>
        <label htmlFor="Name" className="form-label text-sm">Name</label>
        <input type="text" placeholder='Name' value={vendor.name} onChange={(e) => setVendor({ ...vendor, name: e.target.value })} className="input input-bordered w-full" />
        <label htmlFor="Phone" className="form-label text-sm ">Phone No</label>
        <input type="number"  value={vendor.phone_no === null || vendor.phone_no ===0 ? '' : vendor.phone_no} placeholder='Phone No'  onChange={(e) => setVendor({ ...vendor, phone_no: Number(e.target.value) })} className="input input-bordered w-full" />
        
        <label htmlFor="Vendorname" className="form-label text-sm">Vendor Name</label>

        <input type="text" value={vendor.vendor_name} placeholder='Vendor Name'  onChange={(e) => setVendor({ ...vendor, vendor_name: e.target.value })} className="input input-bordered w-full" />

        <label htmlFor="GST" className="form-label text-sm">GST</label>
        <input type="text" value={vendor.gst} placeholder='gst' onChange={(e) => setVendor({ ...vendor, gst: e.target.value })}  className="input input-bordered w-full" />

        <label htmlFor="Email" className="form-label text-sm">Email</label>
        <input type="email" value={vendor.email} placeholder='email' onChange={(e) => setVendor({ ...vendor, email: e.target.value })}  className="input input-bordered w-full" />

        <label htmlFor="Address" className="form-label text-sm">Address</label>
        <input type="email" value={vendor.address}  placeholder='Vendor Name' onChange={(e) => setVendor({ ...vendor, address: e.target.value })}  className="input input-bordered w-full" />

        {change !== 'create' && <button type='submit' className="btn btn-success mt-2">Submit</button>}
    </form>}

</div>
  )
}

export default VendorCreate