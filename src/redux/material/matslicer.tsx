'use_client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {dataTypeMatIssue,matType,materialunittype,materialgrouptype} from '@/type/material/materia-type'
import { matissueMain } from '@/components/dataAll/data'


const initialState: dataTypeMatIssue = {
    matData :matissueMain,
    orignalData : matissueMain,
    totalQuantity : matissueMain,
    miview:null,
    materilalunit : [{unit_no:null,material_umit:'',materil_unit_desc:''}],
    materialGroup : [{group_no:null,group_name:''}]
}

export const matSlice = createSlice({
  name: 'matslicer',
  initialState,
  reducers: {
    getMatData : (state,action:PayloadAction<matType[]>) =>{
        state.matData = action.payload
    },
    getOrignalData :(state,action:PayloadAction<matType[]>)=>{
        state.orignalData=action.payload
    },
    getTotalQuantity : (state,action:PayloadAction<matType[]>)=>{
        state.totalQuantity = action.payload
    },
    getMiView:(state,action:PayloadAction<number|null>)=>{
        state.miview = action.payload
    },
    getMaterialUnit : (state,action : PayloadAction<materialunittype[]>) =>{
        state.materilalunit = action.payload
    },
    getMaterialGroup : (state,action: PayloadAction<materialgrouptype[]>)=>{
        state.materialGroup = action.payload
    }

}
   
})

// Action creators are generated for each case reducer function
export const { getMatData,getOrignalData,getTotalQuantity,getMiView,getMaterialUnit,getMaterialGroup} = matSlice.actions

export default matSlice.reducer