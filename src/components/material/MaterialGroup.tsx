import { useMaterial } from '@/hooks/material/useMaterial'
import React from 'react'




const MaterialGroup = () => {

    const { materialGroup } = useMaterial()
    return (
        <div>
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-error">Close</button>
            </form>






        </div>
    )
}

export default MaterialGroup