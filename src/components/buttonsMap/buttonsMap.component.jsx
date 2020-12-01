import React from 'react'
import "../buttonsMap/buttonsMap.scss"

const ButtonsMap = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 ">
                    <div className="btn__map-box display__flex">
                        <div className="btn__delivery">
                            <button><img src={require(`../../assets/images/slider/Box.png`)} alt=""/>
                                <p>Çatdırılma</p></button>
                            <div className="bord_delivery"></div>
                        </div>
                        <div className="btn__payment"> 
                                 <button>
                                     <img src={require(`../../assets/images/slider/Payment.png`)} alt=""/>
                                    <p>Ödəniş</p>
                                </button>
                        </div>
                        <div className="btn__order">
                            <div className="bord_order"></div>
                            <button><img src={require(`../../assets/images/slider/Verify.png`)} alt=""/>
                                <p>Sifariş et</p></button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                        <h1>Salam eee</h1>
                </div>
            </div>
        </div>
    )
}

export default ButtonsMap;
