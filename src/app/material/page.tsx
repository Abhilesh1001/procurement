'use client'
import MaterialDisplaytable from './MaterialDisplaytable'
import Materialcreate from '@/components/material/Materialcreate'

interface matType {
    s_no: number | null,
    material_name: string,
    material_group: string,
    unit: string,
    user: string,
}

const page = () => {

    return (
        <div className='h-auto min-h-screen bg-base-100'>
            <div className='container pt-10'>
                <button className="btn btn-success" onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                if (modal) {
                  modal.showModal();
                }
              }}>Create</button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                    <Materialcreate />
                        <div className="modal-action">
                         
                        </div>
                    </div>
                </dialog>

                {/* <Materialcreate /> */}
                <MaterialDisplaytable />
            </div>

        </div>
    )
}

export default page