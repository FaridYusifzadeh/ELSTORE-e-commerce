import React from 'react'

import './buttonRating.component.scss'

function ButtonRating(props) {
    return (
        <div className="button_rating_content">
            <button data-id={props.data} onClick={props.click} className={`button_rating ${props.class}`}>
                <img src={props.icon} alt=""/>
                {props.name}
            </button>
        </div>
    )
}

export default ButtonRating
