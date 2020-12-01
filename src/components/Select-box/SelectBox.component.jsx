import React from 'react'
import './SelectBox.component.scss';




function SelectBox(props) {
    return (
            <div className={`${props.class}`} >
                    <label htmlFor="" id="labelId">{props.label}</label>
                    <div className="select_box_content">
                    <select name={props.name}  value={props.value}  onChange={props.handleChange} ref={props.register}  id="searchSelect">
                            <option>{props.firstopt} </option> 
                        {
                            (props.options!==undefined)?props.options.map(item =>{
                                return (
                               <>
                                <option  value={item.id}>{item.name}</option>
                               </>
                               )
                                }):''
                        }
                    </select>
                    </div>
            </div>
    )
}


export default SelectBox