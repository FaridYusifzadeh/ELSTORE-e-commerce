import React from 'react'
import './ButtonRadio.component.scss'

function clickAll(e){
    if(e.currentTarget.children[0].children[0].children[0].checked == false){
        e.currentTarget.children[0].children[0].children[0].checked = true;
    }else{
        e.currentTarget.children[0].children[0].children[0].checked = false;
    }
}


function ButtonRadio(props) {

    return (
        <div className={`radio_button__body ${props.class}`} id={props.id} onChange={props.change}   onClick={(e) => clickAll(e)} tabIndex="-1" id="radioButtonBody">
            <div  className="radio_button__content">
                <div id="radioButtonContent" className="radio-box">
                    <input id="radioButton" type="radio" name="choosed"/>
                    <span></span>
                </div>
            </div>
            <div className="radio_button__text">
                <p>{props.name}</p>
                <p>{props.nextName}</p>
            </div>
        </div>

    )
}

export default ButtonRadio
