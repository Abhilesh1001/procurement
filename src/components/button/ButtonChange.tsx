import React from 'react'

interface ButtonProps {
    label : string,
    onClick? : () => void,
    clsaatype? :string
    disable?:string
    buttomType? : string 
    css?:string
}

const ButtonChange = (props:ButtonProps) => {
  return (
    <button className="btn  btn-info btn-sm ml-2 mr-2" type={`${props.buttomType==='submit' ?'submit' :'button' }`} onClick={props.onClick} >{props.label}</button>
  )
}

export default ButtonChange