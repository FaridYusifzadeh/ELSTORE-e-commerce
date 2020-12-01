import React from 'react'
import './label.component.scss'

function Label({name,className}) {
 return (
  <div className={`label-component ${className}`}>
   {name}
  </div>
 )
}

export default Label
