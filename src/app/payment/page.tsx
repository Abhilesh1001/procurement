'use client'
import AllPayment from "@/components/payment/AllPayment";
import MiroTotalPayment from "@/components/payment/MiroTotalPayment";
import CreatePayment from "@/components/payment/CreatePayment";



const Payment = () => {


  return (
    <div className='bg-base-100 min-h-screen'>

      <div className="container">
        <div className="pt-3">
          <div className="my-4 flex">

            <div className='mr-2'>
            <button className="btn btn-success" onClick={() => {
              const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              }
            }}>Create</button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">

                <CreatePayment />

                <div className="modal-action">

                </div>
              </div>
            </dialog>
            </div>


            <div>
            <button className="btn btn-primary" onClick={() => 
           {
            const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}>All Payments</button>

          <dialog id="my_modal_2" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <AllPayment />
              <div className="modal-action">

              </div>
            </div>
          </dialog>
          </div>

          </div>

         

          {/* table  */}


          <MiroTotalPayment />



        </div>

      </div>


    </div>
  )
}

export default Payment