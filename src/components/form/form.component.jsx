import React from 'react'
import {useForm} from 'react-hook-form'

function From({onsubmit,children}) {
 const {registe,handleSubmit,errors}=useForm();
 return (
  <form onSubmit={onsubmit}>
   {children}
  </form>
 )
}

export default From
