import React from 'react'
import "./upButton.css"
const UpButton = () => {
  return (
   <button className='up-button' onClick={(e)=>{ e.preventDefault(); window.scrollTo(0, 0)}}>
    <div ></div>
   </button>
  )
}

export default UpButton