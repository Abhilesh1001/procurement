
import Loading from '@/components/loading/Loading'

// hooks 
import { useMaterial } from '@/hooks/material/useMaterial'
// components 
import React from 'react'



const Materialcreate = () => {

    const { handleSubmit, setDate, data, handleUPdate, handleCreate, handleChange, change, mutation, handleKeyDown, setVid, mutationUpdate, sfcreate,materialGroup,materialUnit } = useMaterial()



    return (
        <div className="my-4">
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


            {change === 'create' && <><label htmlFor="Material No" className="form-label block mb-2 text-sm">Material No</label>
                <input type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="input input-bordered w-full " /></>}

            {sfcreate == 'create' && <form onSubmit={handleSubmit}>
                <label htmlFor="material name" className=' form-label text-sm'>Material Name</label>
                <input type="text" onChange={(e) => setDate({ ...data, material_name: e.target.value })} value={data.material_name} className="input input-bordered w-full" />

                <label htmlFor="Material No" className="form-label text-sm">Material Group</label>
                <select onChange={(e) => setDate({ ...data, material_group: e.target.value })} value={data.material_group} required className="select select-bordered block w-full" aria-label="Large select example">
                    {/* <option value='material_group' selected>Material Group</option> */}
                    <option disabled selected>Pick one</option>
                    {
                        materialGroup?.map((item:{group_no:number,group_name:string})=>{
                            return  <option key={item.group_no} value={item.group_name}>{item.group_name}</option>
                        })
                    }
                </select>
                <label htmlFor="Material No" className="form-label text-sm">Material Unit</label>
                <select onChange={(e) => setDate({ ...data, unit: e.target.value })} value={data.unit} required className="select select-bordered block w-full" aria-label="Large select example">
                <option disabled selected>Pick one</option>
                    {
                        materialUnit?.map((item:{unit_no:number,material_umit:string,materil_unit_desc:string})=>{
                            return  <option key={item.unit_no} value={item.material_umit}>{item.material_umit}</option>
                        })
                    }

                </select>

                {change !== 'create' && <button type='submit' className="btn btn-success mt-2">Submit</button>}

            </form>}
        </div>
    )
}

export default Materialcreate