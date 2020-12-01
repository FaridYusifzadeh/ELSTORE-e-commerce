import React,{useState} from 'react'
import './ButtonDropDown.component.scss'
import Button from '../button/button.component';


function showHide(e){
    let current=e.target.closest('.button_drop__down').nextElementSibling;

    // current.classList.toggle('middle_side-height')
}

function ButtonDropDown({onchange,onclick}) {
    const [toggle, setToggle] = useState({
        active: false,
      });

      function toggleNav() {
        const currentState = toggle.active;
        setToggle({ active: !currentState });
    }

    return (
        <button className='cover-upload'>Düzəliş et<input onChange={onchange} onClick={onclick} type='file'/></button>
    )
}

export default ButtonDropDown
