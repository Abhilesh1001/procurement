import React from 'react'
import { useDelivery } from '@/hooks/deliveryaddress/useDelivery'
import Loading from '../loading/Loading'
import { useDeliveryCompany } from '@/hooks/deliveryaddress/useDeliveryCompany'
import Aleart from '../alert/Aleart'

import DumyInput from '../dummyinput/DumyInput'
import ButtonChange from '../button/ButtonChange'



const DeliveryCompAddre = () => {

    const { hiddenslert, handleCloseAlert, updateData, deliveryComAddress, id, handleChangedata, handleChange, handleUpdate, unit, setUnit, handleSubmitUnit, mutation, hiddenslertcreate, handleCloseAlertCreate } = useDeliveryCompany()  


    return (
        <div>
            <div className='flex'>

                <form method="dialog">

                    <button className="btn btn-error mb-2">Close</button>
                </form>

            </div>

            <div className='h-10'>

                {hiddenslert === '' && <Aleart label={'Updated'} alertname={'Delivery Address'} onClose={handleCloseAlert} newMat={updateData.data.s_no} />}

                {hiddenslertcreate === '' && <Aleart label={'Created'} alertname={'Delivery Address'} onClose={handleCloseAlertCreate} newMat={mutation.data.data.data.s_no} />}

            </div>


            {/*Add new material Unit  */}


            <div className='flex'>

                <div className='flex flex-col'>

                    <input type="text" value={unit.name} onChange={(e) => setUnit({ ...unit, name: e.target.value })} placeholder="Company Name" className="input input-bordered w-full max-w-xs ml-2 mr-2" />
                </div>
                <div className='flex flex-col ml-4'>

                    <input type="text" value={unit.address} onChange={(e) => setUnit({ ...unit, address: e.target.value })} placeholder="Company Address" className="input input-bordered w-full max-w-xs ml-2" />
                </div>
                <div>
                    <button onClick={handleSubmitUnit} className="btn btn-success ml-4">Submit</button>
                </div>
            </div>

            <div className=' ml-2 mr-2 h-[400px] overflow-auto text-nowrap my-2 bg-base-300 relative overflow-y-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-sm text-left rtl:text-right'>
                    <thead className='sticky top-0 z-1 bg-base-200'>
                        <tr>
                            <th><DumyInput indum={'Cmpany ID'} /></th>
                            <th><DumyInput indum={'Company Name'} /></th>
                            <th><DumyInput indum={'Company Address'} /></th>
                            <th><DumyInput indum={'Change'} /></th>
                            <th><DumyInput indum={'Update'} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryComAddress?.map((item: any, index: number) => {

                                return <tr key={item.s_no}>
                                    <td><DumyInput indum={item.s_no} /></td>
                                    <td>{id !== index + 1 ? <DumyInput indum={item.name} /> : <input className='form-control w-26 px-2 py-1 h-8' value={item.name} onChange={(e) => handleChangedata(item.name, index, 'name', e.target.value,)} />}</td>
                                    <td>{id !== index + 1 ? <DumyInput indum={item.address} /> : <input className='form-control w-26' value={item.
                                        address} onChange={(e) => handleChangedata(item.address, index, 'address', e.target.value,)} />}</td>
                                    <td><ButtonChange onClick={() => handleChange(item.s_no)} label={'Change'} /></td>
                                    <td>{id !== index + 1 ? <button className='btn-sm ml-2 mr-2'>Update</button> : <ButtonChange onClick={() => handleUpdate(item.s_no)} label={'Update'} />}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default DeliveryCompAddre