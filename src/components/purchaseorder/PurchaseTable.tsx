
import React,{memo} from 'react'
import {posliiceState,datatype} from '@/type/type'

// redux 
import {useSelector} from 'react-redux'

// custom hooks
import { usePo } from '@/hooks/purchseorder/usePo'
import { usePoview } from '@/hooks/purchseorder/usePoview'

// dependencies 
import DumyInput from '@/components/dummyinput/DumyInput'
import { format } from 'date-fns';

const PurchaseTable = () => {
    const {data,poview,podata} = useSelector((state:posliiceState)=>state.poslicer)
    console.log('line_no',data)
    const {handleDelete} =usePoview()
    const {handleChange} = usePo()
    let formattedDateString = ''
    if (podata.time) {
        const time = podata.time
        const dateObject = new Date(time);
        formattedDateString = format<Date>(dateObject, 'dd-MM-yyyy')
    }


  return (
    <tbody >
                            
    { data?.map((item, index) => {
        console.log(item.material_price)
            return <tr key={index}>
                <th><input type="checkbox" onChange={(e) => handleChange(e.target.value, 'material_no', index)} />
                </th>
                <th scope="row"> <DumyInput indum={index + 1}/></th>
                <th scope="row"> <DumyInput indum={item.po_line}/></th>
                <td> <DumyInput indum={item.pr_no} /></td>
                <td><DumyInput indum={item.material_no} /></td>
                <td><DumyInput indum={item.material_name} /></td>
                <td><DumyInput indum={item.material_unit} /></td>

                <td>
                    {poview ? <DumyInput indum={item.material_price}/> :<>{item.grn_no!==null && item.grn_no!==undefined ?<DumyInput indum={item.material_price}/>:<input required type="number" value={item.material_price !== null? item.material_price===0?'': item.material_price : ''} onChange={(e) => handleChange(Number(e.target.value), 'material_price', index)} className="input input-bordered input-sm max-w-xs w-32" />}</>}
                </td>

                <td>
                    {poview ?<DumyInput indum={item.material_qty}/>:<>{item.grn_no!==null && item.grn_no!==undefined?<DumyInput indum={item.material_qty}/>:<input type="number" required value={item.material_qty != null ? item.material_qty===0?'':item.material_qty : ''} onChange={(e) => handleChange(Number(e.target.value), 'material_qty', index)} className="input input-bordered input-sm max-w-xs  w-24" />}</>}
                </td>

                <td><DumyInput indum={item.total_amount} /></td>

                <td>
                    {poview ?<DumyInput indum={item.material_tax}/>:<>{item.grn_no!==null&& item.grn_no!==undefined?<DumyInput indum={item.material_tax}/>:<input required type="number" value={item.material_tax !== null ? item.material_tax===0?'':item.material_tax : ''} onChange={(e) => handleChange(Number(e.target.value), 'material_tax', index)} className="input input-bordered input-sm max-w-xs  w-32" />}</>}
                    
                </td>

                <td>
                <DumyInput indum={item.total_tax} /></td>

                <td>
                    {poview ?<DumyInput indum={item.material_text}/>:<>{item.grn_no!==null&& item.grn_no!==undefined?<DumyInput indum={item.material_text}/>:<input type="text" onChange={(e) => handleChange(e.target.value, 'material_text', index)} value={item.material_text} className="input input-bordered input-sm max-w-xs text-sm"  required/>}</>}
                </td>
                <td>
                {poview ? '':<>{item.grn_no !==null && item.grn_no!==undefined ?'':<button onClick={()=>handleDelete(index)} className="btn btn-error btn-sm pt-0 pb-0">Delete</button>}</>} </td>
                  
                    <td >{<DumyInput indum={item.grn_no} />}</td>
                <td >{podata.user !==null ?<DumyInput indum={podata.user} />: "user"}</td>
                <td >{podata.user !==null ?<DumyInput indum={formattedDateString} />: ""}</td>
                <td >{<DumyInput indum={item.line_no} />}
                </td>
            </tr>
        })}

</tbody>
  )
}

export default memo(PurchaseTable)