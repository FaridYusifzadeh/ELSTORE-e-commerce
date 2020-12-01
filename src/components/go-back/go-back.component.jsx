import React from 'react'
import {Link} from 'react-router-dom'
import './go-back.scss'

function GoBack({text,link,className}) {
 return (
  <div className={`redirect__page ${className}`}>
  <span><img src={require(`../../assets/images/icons/Iconprev.svg`)} alt=""/></span>
        <Link className="rediretc__text" to={link}>{text}</Link>
</div>
 )
}

export default GoBack
