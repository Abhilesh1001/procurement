import React, {memo } from 'react'
import ProcumentMenu from './ProcumentMenu'

const Main = () => {
   
  return (
    <div className='container dark:bg-gray-800 bg-sky-500'>
        <div className="row">
            <div className="col-sm-6">
                <ProcumentMenu />
            </div>

        </div>
      
    </div>
  )
}

export default memo(Main)