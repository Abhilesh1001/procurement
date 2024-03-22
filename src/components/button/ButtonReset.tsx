import React from 'react'

interface ButtonProps {
    label : string,
    onClick? : () => void,
    clsaatype? :string
    disable?:string
    buttomType? : string 
    css?:string
}

const ButtonReset = (props:ButtonProps) => {
  return (
    <button className="btn  btn-error btn-sm" type={`${props.buttomType==='submit' ?'submit' :'button' }`} onClick={props.onClick} >{props.label}</button>
  )
}

export default ButtonReset