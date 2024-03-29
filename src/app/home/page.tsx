'use client'
import { usePoview } from '@/hooks/purchseorder/usePoview'
import { posliiceState, datatype } from '@/type/type'
import { useSelector } from 'react-redux'
import Link from 'next/link'



const Home = () => {

  const { data, poview, podata } = useSelector((state: posliiceState) => state.poslicer)
  const { handleViewClick } = usePoview()
  console.log(data)


  return (
    <div>

      <main className="min-h-screen bg-base-100">

        {/* Main content area */}
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Placeholder for dashboard content */}
            <h1 className="text-3xl font-semibold text-success">About Page</h1>

            <div className="flex flex-col my-2 w-full">
              <div className="grid h-auto pt-4 pb-4 text-accent font-bold text-2xl card bg-base-300 rounded-box place-items-center pr-4 pl-6">
                This project aims to improve how we buy things for our organization. It involves steps like ordering materials from suppliers, storing them properly, and using them effectively. These steps are important for keeping our organization running smoothly.
              </div>
              <div className="divider divider-secondary"></div>

            </div>




            <div className="flex flex-col w-full lg:flex-row">
              <div className="grid flex-grow  p-4 text-lg h-32 card bg-base-300 text-success rounded-box place-items-center">
              1.	Purchase Request (PR): Users within the organization initiate a purchase request for required materials.
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="grid flex-grow text-lg text-success p-4 h-32 card bg-base-300 rounded-box place-items-center">

              <span className='font-bold flex'>2.	Purchase Order (PO):</span> The procurement department generates a purchase order based on the approved purchase request. This PO is then sent to the vendor, specifying the details of the materials to be procured.
              </div>
            </div>







          </div>
        </div>
      </main>
    </div>
  )
}

export default Home