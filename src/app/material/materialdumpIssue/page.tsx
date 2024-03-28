'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import axios from 'axios'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns'
import Loading from '@/components/loading/Loading'
import { CSVLink } from 'react-csv'


const MaterialIssueDump = () => {
  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)

  async function fetchData() {

    const res = await axios.get(`${baseurl}grn/materialissuecreate`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })

    return res.data
  }

  const { data,isLoading } = useQuery({ queryKey: ['materialIssue'], queryFn: fetchData })




  
  let csvData:any=[]

  if(data){
   const newData = data?.map((item:any ) => {
     const newItem = JSON.parse(item.item_issue)

     return newItem.map((items:any)=>{
              return [item.issue_no,items.mi_line,items.material_no,items.material_name,items.material_unit,items.material_issue,items.material_remarks,format(parseISO(item.time), 'dd.MM.yy')]
     })
   })

   csvData = [
    ['issue No', 'MLineNo', 'Material No', 'Material Name', 'Material Unit', 'Materila Issue', 'Remarks', 'Date'],
     ...newData?.flat()
   ];
  }
  






  const tableHead = ['issue No', 'MLineNo', 'Material No', 'Material Name', 'Material Unit', 'Materila Issue', 'Remarks', 'Date']

  return (
    <div className='h-auto bg-base-100  min-h-screen'>

      <div className="container pt-10">


      <div className='flex  text-center'>
            <div className='ml-10 pt-1 pb-1 pl-2 pr-2 text-sm rounded  drop-shadow-sm border-white shadow-sm border-1'><CSVLink filename={'Material Issue-file.csv'}  data={csvData}>Export Excel</CSVLink></div>
                {isLoading && <Loading />}
            {/* <div>{isLoading && <Loading />}</div> */}
           
            </div>




        <div className=' ml-2 mr-2 h-[550px] overflow-auto text-nowrap my-2 bg-base-300 relative overflow-y-auto shadow-md mt-2  sm:rounded-lg'>
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className='sticky top-0 z-1  h-10 bg-base-200'>
              <tr >
                {tableHead.map((item) => {
                  return <th key={item} scope="col"><div className='ml-2 mr-2'>{item}</div></th>
                })}
              </tr>
            </thead>
            <tbody >
              {data?.map((item: any, index: number) => {
                const itemIssue = JSON.parse(item.item_issue)
                return itemIssue.map((items: any, indexs: number) => {
                  return <tr key={indexs}>
                    <td><DumyInput indum={item.issue_no} /></td>
                    <td><DumyInput indum={items.mi_line} /></td>
                    <td><DumyInput indum={items.material_no} /></td>
                    <td><DumyInput indum={items.material_name} /></td>
                    <td><DumyInput indum={items.material_unit} /></td>
                    <td><DumyInput indum={items.material_issue} /></td>
                    <td><DumyInput indum={items.material_remarks} /></td>
                    <td><DumyInput indum={format(parseISO(item.time), 'dd.MM.yy')} /></td>

                  </tr>
                })

              })
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default MaterialIssueDump