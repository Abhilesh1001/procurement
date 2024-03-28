'use client'
import {useSelector} from 'react-redux'
import MaterialIssueTable from '@/components/Materialssue/MaterialIssueTable'
import { useIsMaterial } from '@/hooks/material/useIssueMatrial'
import Loading from '@/components/loading/Loading'
import {matState} from '@/type/material/materia-type'


// button 

import ButtonSave from '@/components/button/ButtonSave'
import ButtonChange from '@/components/button/ButtonChange'
import UpdateBotton from '@/components/button/UpdateButton'
import AddFormButton from '@/components/button/AddFormButton'
import ButtonReset from '@/components/button/ButtonReset'
import ViewBotton from '@/components/button/ViewBotton'



const Vendor = () => {

  const {miview} =  useSelector((state:matState)=>state.matSlice)  
 
  const {handleClick,handleSubmit,mutation,hasTrueValue,handleViewClick,handleIssuechange,handleReset,handleMateriIssueView,view,handleUpdate,change,mutationUpdata} = useIsMaterial()
  return (
    <div className=' h-auto bg-base-100  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-10 mt-4">
                <div>
                  <input className='input input-bordered input-sm ml-2' value={miview===null || miview===0 ?'':miview}  type="number" onChange={handleMateriIssueView} />

                   <ViewBotton onClick={handleViewClick}  label={'View'} />

                   <ButtonChange  onClick={handleIssuechange} label={'Change'}/>

                   {view!=='change' ? '': <AddFormButton onClick={handleClick} label={'Add Form'}/>}

                   { change!=='change' ? <> {!hasTrueValue ? <button className="btn btn-success mx-2 dark:bg-green-400 text-gray-800 bg-green-400 btn-sm  dark:text-gray-50 h-8 text-sm" type='button' onClick={handleUpdate} >Update</button>: <UpdateBotton  buttomType={'button'} label={'Update'} />}</>  :'' }

                   {change==='change'?<>{!hasTrueValue ?<>{view==='change' && <button className="btn btn-success mx-2 dark:bg-green-400 text-gray-800 bg-green-400  dark:text-gray-50 h-8 text-sm btn-sm" type='button' onClick={handleSubmit} >Save</button>}</>:<ButtonSave label='Save'/>}</>:''}
                   
                   <ButtonReset  onClick={handleReset} label={'Reset'}/> 
                    {mutation.isPending && <Loading />}
                    {mutationUpdata.isPending && <Loading />}
                    {mutation.isSuccess && <>{mutation.data.data.msg} Issue No. {mutation.data.data.data.issue_no}</>}
                    {mutation.isError && mutation.error.response.data.errors.detail}
                    {mutationUpdata.isSuccess && <>{mutationUpdata.data.data.msg} Issue No. {mutationUpdata.data.data.data.issue_no}</>}
                    {mutation.isError && mutation.error.response.data.errors.detail}
                </div>
                <div className='w-full h-4 flex justify-center'></div>
                <MaterialIssueTable viewdata={view} changeData={change}  />
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Vendor