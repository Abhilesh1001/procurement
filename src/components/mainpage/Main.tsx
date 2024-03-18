import React, {memo } from 'react'
import ProcumentMenu from './ProcumentMenu'

const Main = () => {
   
  return (
    <div className='container'>
        <div className="row">
            <div className="col-sm-6">
                <ProcumentMenu />
            </div>

        </div>
      
        
    </div>
  )
}

export default memo(Main)