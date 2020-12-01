import React from 'react'
import './card.component.scss'

function Card({children,className}) {
 return (
  <div className={ `my-card ${className}`}>
   {children}
  </div>  
 )
}

function Header(props) {
 return (
   <div className='card-header'><h5>{props.name}</h5></div>
  
 )
}

export default Card
Card.Header=Header;
