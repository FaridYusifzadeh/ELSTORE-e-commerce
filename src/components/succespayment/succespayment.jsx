import React from 'react';
import './succespayment.scss';
import {Link} from 'react-router-dom'
function Succespayment() {
    return (
        <div className='successpaymentcontainer'>   
            <div className='succes_main'>
                <div className='succes_icon'>
                    <img src={require('../../assets/images/Verify.svg')} />
                </div>
                <div className='succes_text'>
                    Sifariş uğurla tamamlandı.
                </div>
                <div className='succes_links'>
                    <Link to='/'>alış-verİşə davam et</Link>
                    <Link to='/basket'>sİfarİşlərİm</Link>
                </div>
            </div>
        </div>
    )
}

export default Succespayment
