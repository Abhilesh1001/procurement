import {irnsliiceState} from '@/type/irn/irn'
import React,{memo, useState} from 'react'
import {useSelector} from 'react-redux'
import Loading from '../loading/Loading'
import {useIrn} from '@/hooks/invoice/useIrn'
import {useIrnView} from '@/hooks/invoice/useIrnView'

// Button 

import ButtonSave from '../button/ButtonSave'
import ButtonChange from '../button/ButtonChange'
import UpdateBotton from '../button/UpdateButton'
import AddFormButton from '../button/AddFormButton'
import ButtonReset from '../button/ButtonReset'
import ViewBotton from '../button/ViewBotton'

const SelectionHeader = () => {

   const {irndata,selectedValue,mainData,irnchange,hastruevalue} = useSelector((state:irnsliiceState)=>state.irnSlice)
   const {handleRadioChange,handlePOGRNView,handleSubmit,mutation} =useIrn()
   const {handleViewClick,handleGrnchange,handleInsert,handleUpdateGRN,ResetGRN,handleChange} = useIrnView()
   

  return (
    <div >
    <div className='flex'>
        <input checked={selectedValue === 'PO'} id="default-radio-1" type="radio" value="PO" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />
        <label htmlFor="PR" className="ms-2 text-sm font-medium  mr-4 mb-2">PO</label>

        <input checked={selectedValue === 'IRN'} id="default-radio-1" type="radio" value="IRN" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />
        <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium">IRN</label>
    </div>

    <div className='overflow-auto' style={{ display: 'flex' }}>
        <input type="text" className='input input-bordered input-sm max-w-xs w-20 text-sm' onChange={handlePOGRNView} />

        {
            selectedValue === 'IRN' && <>
            <ViewBotton label={'View'} onClick={handleViewClick} />
            <ButtonChange label={'Change'} onClick={handleGrnchange} />
                {irnchange && <>{hastruevalue?<button className="btn btn-success mx-2  text-gray-800 dark:bg-green-500 bg-green-500 dark:text-gray-50 h-8 text-sm btn-sm" type='button' onClick={()=>handleUpdateGRN(Number(irndata.mir_no))} >Update</button>:<UpdateBotton label='Update'/>}</>}
            </>
        }
        {
            selectedValue === 'PO' && <> 
            <AddFormButton label={'Insert PO'} onClick={handleInsert} />

            {hastruevalue ? <button className="btn btn-success btn-sm  mx-2 dark:bg-green-800 text-gray-800 bg-green-500 dark:text-gray-50 h-8 text-sm" type='button' onClick={handleSubmit} >Save</button>:<ButtonSave label='Save'/>}

            </>
        }
        <ButtonReset label={'Reset'} onClick={ResetGRN} />
        
        <button className="btn btn-warning mx-2 btn-sm  h-8 text-sm" type='button'>Print</button>
        <div className='flex items-center mr-4'>Total Tax</div>
        <div className='flex items-center  text-green-400'>{mainData.TotalTax}</div>
        <div className='flex items-center ml-4 '>Total Amount</div>
        <div className='flex items-center text-green-400  ml-4'>{mainData.TotalWithtax}</div>
        <label htmlFor="Bill Amount" className='ml-4 text-center mr-4'>Bill Amount</label>
        <input type='number' className='input input-bordered input-sm max-w-xs text-sm w-40'  onChange={(e)=>handleChange(Number(e.target.value))} />
        <div className='w-full flex justify-center'>{mutation.isPending && <Loading />}</div>

        {irndata.mir_no && <div className=''>GRN : {irndata.mir_no}</div>}

    </div>
</div>
  )
}

export default memo(SelectionHeader)