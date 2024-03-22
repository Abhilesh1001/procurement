'use client'
import VendorCreate from '@/components/vendor/VendorCreate'
import { vendorType } from '@/type/type'
import DumyInput from '@/components/dummyinput/DumyInput'
import { useVendor } from '@/hooks/vendor/useVendor'

const Vendor = () => {

    const { mutation, newData } = useVendor()

    return (
        <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
            <div className='container pt-3'>
                <div className="my-4 ">

                    <button className="btn btn-success" onClick={() => {
                        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                        if (modal) {
                            modal.showModal();
                        }
                    }}>Create</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <VendorCreate />
                            <div className="modal-action">
                            </div>
                        </div>
                    </dialog>


                    <div className="relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg  h-96">
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                                <tr>
                                    <th scope="col" className='px-6 py-2'>Vendor Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone No</th>
                                    <th scope="col">Vendor Name</th>
                                    <th scope="col">GST</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody className=' text-gray-50 text-center'>
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