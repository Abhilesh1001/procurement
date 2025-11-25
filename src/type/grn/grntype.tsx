
export interface vendorType {
  s_no?: null | number,
  name: string,
  phone_no: number | null,
  vendor_name: string,
  address: string,
  gst: string,
  email: string,
  code :string,
  description: string,
  days: string,
  gl_account: string,
  vendor_code: string,
}
export interface deliveryddressType {
  s_no?: null | number,
  name: string,
  phone_no: number | null,
  vendor_name: string,
  address: string,
  gst: string,
  email: string,
  company_address: string,
  company_name: string,
  company_s_no: null | number,
  company : string,
  company_adress_code :string,
}

export interface datatype {
  line_no: null | number,
  po_line: null | number,
  pr_no: null | number,
  po_no: null | number,
  grn_line: null | number,
  mrn_no: null | number,
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

export interface grndataType {
  grn_no: null | number,
  time: string,
  item_po: string,
  vendor_address: string,
  delivery_address: string,
  user: null | number,
  maindata: string,
  billing: string,
}

export type mainType = { TotalAmount: null | number, TotalWithtax: null | number, TotalTax: null | number }

export interface CounterStateGRN {
  deliveryadress: deliveryddressType,
  vendoradress: vendorType,
  data: datatype[]
  grndata: grndataType
  selectedValue: string,
  mainData: mainType,
  newGrnNo: null | number
  grnpoview: null | number
  grnview: boolean
  grnchange: boolean,
  upgrnno: null | number,
  billData: billDetails,
  orignalData: datatype[],
  totalQuantity: datatype[],
  hiddenalert: string,
  newchang: string
}

export interface grnsliiceState {
  grnslice: CounterStateGRN
}

export interface billDetails { bill_date: string | null, bill_no: null | string, delivery_note: null | string, transporter_name: null | string, way_bill: null | string | number }