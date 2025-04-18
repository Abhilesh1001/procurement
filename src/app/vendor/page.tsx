'use client'
import VendorCreate from '@/components/vendor/VendorCreate'
import { vendorType } from '@/type/type'
import DumyInput from '@/components/dummyinput/DumyInput'
import { useVendor } from '@/hooks/vendor/useVendor'

const Vendor = () => {

    const { newData } = useVendor()


    return (
        <div className=' h-auto bg-base-100  min-h-screen'>
            <div className='container pt-3'>
                <div className="my-4 ">

                    <button className="btn btn-success" onClick={() => {
                        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                        if (modal) {
                            modal.showModal();
                        }
                    }}>Create</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <VendorCreate />
                            <div className="modal-action">
                            </div>
                        </div>
                    </dialog>
                    

                    <div className="relative text-nowrap overflow-y-auto shadow-md mt-4  sm:rounded-lg bg-base-300  h-96">
                        <table className="w-full text-sm text-left rtl:text-right ">
                            <thead className='sticky top-0 z-1 bg-base-200  h-10'>
                                <tr>
                                    <th scope="col" className='px-6 py-2'>Vendor Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone No</th>
                                    <th scope="col">Vendor Name</th>
                                    <th scope="col">GST</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {newData?.map((items: vendorType) => {
                                    return <tr key={items.s_no}>
                                        <th scope="row"><DumyInput indum={items.s_no !== undefined ? items.s_no : null} /></th>
                                        <td><DumyInput indum={items.name} /></td>
                                        <td><DumyInput indum={items.phone_no} />{ }</td>
                                        <td><DumyInput indum={items.vendor_name} /></td>
                                        <td><DumyInput indum={items.gst} /></td>
                                        <td><DumyInput indum={items.email} /></td>
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

export default Vendor