import DumyInput from '../dummyinput/DumyInput'
import ButtonChange from '../button/ButtonChange'

import Aleart from '../alert/Aleart'

import { useMaterialUnit } from '@/hooks/material/useMaterialUnit'



const MaterialUnit = () => {
    const { hiddenslert, handleCloseAlert, updateData, materilalunit, id, handleChangedata, handleChange, handleUpdate, unit, setUnit, handleSubmitUnit, mutation, hiddenslertcreate,handleCloseAlertCreate } = useMaterialUnit()



    return (
        <div>
            <div className='flex'>

                <form method="dialog">

                    <button className="btn btn-error mb-2">Close</button>
                </form>
               
            </div>

            <div className='h-10'>
                 
                {hiddenslert === '' && <Aleart label={'Updated'} alertname={'Material Unit'} onClose={handleCloseAlert} newMat={updateData.data.unit_no} />}

                {hiddenslertcreate === '' && <Aleart label={'Created'} alertname={'Material Unit'} onClose={handleCloseAlertCreate} newMat={mutation.data.data.data.unit_no} />}

            </div>




            {/*Add new material Unit  */}


            <div className='flex'>

                <div className='flex flex-col'>

                    <input type="text" value={unit.material_unit} onChange={(e) => setUnit({ ...unit, material_unit: e.target.value })} placeholder="Material Unit" className="input input-bordered w-full max-w-xs ml-2 mr-2" />
                </div>
                <div className='flex flex-col ml-4'>

                    <input type="text" onChange={(e) => setUnit({ ...unit, material_description: e.target.value })} placeholder="Material Description" className="input input-bordered w-full max-w-xs ml-2" />
                </div>
                <div>
                    <button onClick={handleSubmitUnit} className="btn btn-success ml-4">Submit</button>
                </div>
            </div>

            <div className=' ml-2 mr-2 h-[400px] overflow-auto text-nowrap my-2 bg-base-300 relative overflow-y-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-sm text-left rtl:text-right'>
                    <thead className='sticky top-0 z-1 bg-base-200'>
                        <tr>
                            <th><DumyInput indum={'Unit ID'} /></th>
                            <th><DumyInput indum={'Material Unit'} /></th>
                            <th><DumyInput indum={'Description'} /></th>
                            <th><DumyInput indum={'Change'} /></th>
                            <th><DumyInput indum={'Update'} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            materilalunit?.map((item: any, index: number) => {
                                return <tr key={item.unit_no}>
                                    <td><DumyInput indum={item.unit_no} /></td>
                                    <td>{id !== index + 1 ? <DumyInput indum={item.material_umit} /> : <input className='form-control' value={item.material_umit} onChange={(e) => handleChangedata(item.unit_no, index, 'material_umit', e.target.value,)} />}</td>
                                    <td>{id !== index + 1 ? <DumyInput indum={item.materil_unit_desc} /> : <input className='form-control' value={item.materil_unit_desc} onChange={(e) => handleChangedata(item.unit_no, index, 'materil_unit_desc', e.target.value,)} />}</td>
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

export default MaterialUnit