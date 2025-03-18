export interface matType{
    mi_line: null|number
    material_no:null|number,
    material_name:string,
    material_unit:string,
    material_qty:number|null,
    material_issue :null|number 
    material_remarks:string,
}


export type materialunittype= {
    unit_no?:number|null,
    material_umit:string,
    materil_unit_desc:string
}

export type materialgrouptype = {
    group_no : null| number,
    group_name : string
}


export interface dataTypeMatIssue {
    matData : matType[],
    orignalData : matType[],
    totalQuantity :matType[],
    miview:null|number 
    materilalunit : materialunittype[]
    materialGroup : materialgrouptype[]

}

export interface matState {
    matSlice : dataTypeMatIssue
}



