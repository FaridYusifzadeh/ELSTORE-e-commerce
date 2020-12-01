import React, { useEffect } from 'react'
import "../List-Item/Listitem.scss"





const Listitem = (props) => {
    return (
            <li className="listitme-li">{props.name} <span><img src={require(`../../assets/images/icons/next-icon.svg`)} alt=""/></span></li>
    )
}

export default Listitem;
