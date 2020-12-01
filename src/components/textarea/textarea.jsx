import React,{useEffect} from 'react'
import '../InputGroup/InputGroup.styles.scss';



function TextArea({required,type,label,helper,countertext,min, max,name,formIcon,placeholder,otherProps,onChange,register,classinout,value}) {

    return (
        <div  className='inputForm'>
            <label id='scripted'  className='inputForm_label'>{label}</label> 
            <div className='inputForm_iconcontainer'>
            <textarea onChange={onChange} required={required} name={name} min={min}  max={max} type={type} placeholder={placeholder} value={value} {...otherProps} ref={register} className={`inputForm_input ${classinout}`} />
            <span className='inputForm_icon'><img src={formIcon} /></span>
            </div>
            <div className='inputForm_helpcontainer'>
                <span className='inputForm_helper_text'>{helper}</span>
                <span className='inputForm_counter' >{countertext}</span>
            </div>
        </div>
    )
}

export default TextArea
