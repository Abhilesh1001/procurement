
export interface datatype {
  line_no: null | number,
  po_line: null | number,
  pr_no: null | number,
  grn_no: null | number,
  material_no: null | number,
  material_name: string,
  material_unit: string,
  material_price: null | number,
  material_tax: null | number,
  total_tax: null | number,
  material_qty: null | number,
  material_text: string,
  total_amount: null | number,
  cost_center: string,
  expense_gl: string,
  hsn: string,
  internal_order: string,
  inventory_gl: string,
  tax: string,
  tax_gl: string,
  tax_rate: string,
}


export interface DeliveryType {
  s_no?: null | number,
  name: string,
  phone_no: number | null,
  vendor_name: string,
  address: string,
  gst: string,
  email: string,
  company_s_no: null | number,
  company_name: string,
  company_address: string,
  company_adress_code :string,
  company : string

}

export interface vendorType {
  s_no?: null | number,
  vendor_code: string,
  name: string,
  phone_no: number | null,
  vendor_name: string,
  address: string,
  gst: string,
  email: string,
  gl_account: string,
  code: string,
  description: string,
  days: string,
}

export type StateProps = {
  counter: {
    baseurl: string,
    authToken: null | {
      refresh: string,
      access: string
    },
    user: string,
    userId: number | null
    hidden: hiddenType
    companyId: null | number
  }

}
export type mainType = { TotalAmount: null | number, TotalWithtax: null | number, TotalTax: null | number }

export interface posliiceState {
  poslicer: CounterStatePo
}

export interface podataType {
  po_no: null | number,
  time: string,
  item_pr: string,
  vendor_address: string,
  delivery_address: string,
  user: null | number
  maindata: string
}

export const updataData = {
  pr_no: null,
  material_no: null,
  material_name: '',
  material_unit: '',
  material_price: null,
  material_quantity: null,
  material_tax: null,
  total_tax: null,
  material_qty: null,
  material_text: '',
  total_amount: null,
}


export interface datatypePr {
  line_no: null | number,
  po_no: null | number,
  pr_no: null | number,
  material_name: string,
  material_unit: string,
  material_no: number | null,
  material_price: number | null,
  material_qty: number | null,
  material_text: string,
  total_price: null | number,
  cost_center: string,
  expense_gl: string,
  hsn: string,
  internal_order: string,
  tax: string,
  tax_gl: string,
  tax_rate: string,
  inventory_gl: string
}

export interface prsliiceState {
  prslicer: {
    datapr: datatypePr[],
    prmaindata: prmainData,
    hiddenalert?: string,
    newchang?: string,
  }

}

export interface statePropsMaterial {
  counter: {
    user: string,
    authToken: {
      access: string
    },
    userId: number,
    baseurl: string
  }
}



export interface prmainData {
  pr_no: number | null,
  user: number | null,
  time: string,
  item_json: string
}

export interface CounterState {
  datapr: datatypePr[],
  prmaindata: prmainData,
  hiddenalert?: string,
  newchang?: string,
}





export interface CounterStatePo {
  deliveryadress: DeliveryType,
  vendoradress: vendorType,
  data: datatype[]
  podata: podataType
  selectedValue: string,
  mainData: mainType,
  newPoNo: null | number
  poprview: null | number
  poview: boolean
  pochange: boolean,
  uppono: null | number
  orignalData: datatype[]
  totalQuantity: datatype[]
  hiddenalert: string
  newchang: string,
}


export interface hiddenType {
  hiddenmaterial: string,
  hiddenPr: string,
  hiddenPo: string,
  hiddenGRN: string,
  hiddenDumps: string,
  hiddenVendor: string,
  hiddenDelivery: string,
  hiddenFundName: string,
  capitalDis: string,
  rdpername: string,
  rdColl: string,
  loanpername: string,
  loanColl: string,
  invoice: string,
  issuematerial: string
}


export interface DeliveryType {
  s_no?: null | number,
  name: string,
  phone_no: number | null,
  vendor_name: string,
  address: string,
  gst: string,
  email: string,
  company_s_no: null | number,
  company_name: string,
  company_address: string
}


export interface assetType {
  asset_no?: null | number,
  time?: string,
  asset_name: string,
  usersf?: number | null
  amount_Debit: number | null
  debit_date: string
}