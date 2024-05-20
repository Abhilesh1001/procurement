import { useMaterialGroup } from '@/hooks/material/useMaterialGroup'
import React from 'react'
import Aleart from '../alert/Aleart'
import DumyInput from '../dummyinput/DumyInput'
import ButtonChange from '../button/ButtonChange'
import { useSelector } from 'react-redux'
import { matState } from '@/type/material/materia-type'



const MaterialGroup = () => {
    const {hiddenslert,handleCloseAlert,updateData,id,handleChangedata,handleChange,handleUpdate,group,setGroup,handleSubmitUnit,mutation,hiddenslertcreate,handleCloseAlertCreate} = useMaterialGroup()
    
    const { materialGroup } = useSelector((state: matState) => state.matSlice)

    console.log(materialGroup)

    return (
        <div>
            <div className='flex'>

                <form method="dialog">

                    <button className="btn btn-error mb-2">Close</button>
                </form>
               
            </div>

            <div className='h-10'>
                 
                {hiddenslert === '' && <Aleart label={'Updated'} alertname={'Material Unit'} onClose={handleCloseAlert} newMat={updateData.data.group_no} />}

                {hiddenslertcreate === '' && <Aleart label={'Created'} alertname={'Material Unit'} onClose={handleCloseAlertCreate} newMat={mutation.data.data.data.unit_no} />}

            </div>




            {/*Add new material Unit  */}


            <div className='flex'>

                <div className='flex flex-col'>

                    <input type="text" value={group.group_name} onChange={(e) => setGroup({ ...group, group_name: e.target.value })} placeholder="Group Name" className="input input-bordered w-full max-w-xs ml-2 mr-2" />
                </div>
                <div>
                    <button onClick={handleSubmitUnit} className="btn btn-success ml-4">Submit</button>
                </div>
            </div>

            <div className=' ml-2 mr-2 h-[400px] overflow-auto text-nowrap my-2 bg-base-300 relative overflow-y-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-sm text-left rtl:text-right'>
                    <thead className='sticky top-0 z-1 bg-base-200'>
                        <tr>
                            <th><DumyInput indum={'Group ID'} /></th>
                            <th><DumyInput indum={'Group Name'} /></th>
                            <th><DumyInput indum={'Change'} /></th>
                            <th><DumyInput indum={'Update'} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            materialGroup?.map((item: any, index: number) => {
                                return <tr key={item.group_no}>
                                    <td><DumyInput indum={item.group_no} /></td>
                                    <td>{id !== index + 1 ? <DumyInput indum={item.group_name} /> : <input className='form-control' value={item.group_name} onChange={(e) => handleChangedata(item.group_name, index, 'material_umit', e.target.value,)} />}</td>
                                    <td><ButtonChange onClick={() => handleChange(item.unit_no)} label={'Change'} /></td>
                                    <td>{id !== index + 1 ? <button>No Update</button> : <ButtonChange onClick={() => handleUpdate(item.unit_no)} label={'Update'} />}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default MaterialGroup