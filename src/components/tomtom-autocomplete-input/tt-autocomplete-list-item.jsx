import React, { forwardRef } from 'react'

const TTAutocompleteListItem=forwardRef(({name,val,click,refProp,reff})=>
 (
  <div ref={reff} onClick={(e)=>click(refProp,e)} data-name={name.address.freeformAddress} data-position={JSON.stringify(name.position)}>
     <strong>{name.address.freeformAddress.substr(0, val.length)}</strong>
     {name.address.freeformAddress.substr(val.length)}
     <input type='hidden' value={name}/>
  </div>
 ))


export default TTAutocompleteListItem
