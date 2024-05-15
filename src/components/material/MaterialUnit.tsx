import { useMaterial } from '@/hooks/material/useMaterial'
import React, { useState } from 'react'
import DumyInput from '../dummyinput/DumyInput'
import ButtonChange from '../button/ButtonChange'


const MaterialUnit = () => {

    const { materialUnit } = useMaterial()
    const [change,setChange] = useState('change')
 
    function handleChange (ID_No:Number){
        console.log(ID_No)
        setChange(`${change==='change'?'':'change'}`)

    }


    return (
        <div>
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-error">Close</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th><DumyInput indum={'Unit ID'} /></th>
                        <th><DumyInput indum={'Material Unit'} /></th>
                        <th><DumyInput indum={'Description'} /></th>
                        <th><DumyInput indum={'Change'} /></th>
                    </tr>
                </thead>
                <tbody>

                        {
                            materialUnit?.map((item:{unit_no:number,material_umit:string,materil_unit_desc:string})=>{
                                return <tr key={materialUnit.unit_no}>
                                    <td><DumyInput indum={item.unit_no} /></td>
                                    <td><DumyInput indum={item.material_umit} /></td>
                                    <td><DumyInput indum={item.materil_unit_desc} /></td>
                                    <td><ButtonChange onClick={()=>handleChange(item.unit_no)} label={'Change'}  /></td>
                                </tr>
                            })
                        }

                </tbody>
            </table>
        </div>
    )
}

export default MaterialUnit