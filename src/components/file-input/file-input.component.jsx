import React from 'react'
import './file-input.scss'

function FileInput({onchange,name}) {
 return (
   <button className='file-upload-input' name='file' type='file'>
   <input name={name}  onChange={(e)=>{onchange(e)}} type='file'multiple/>
   </button>
 )
}

export default FileInput
