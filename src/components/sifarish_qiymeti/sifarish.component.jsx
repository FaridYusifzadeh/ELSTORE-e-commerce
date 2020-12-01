import React from "react";
import "./sifarish.scss"

const SifarishQiymeti = (props) => {
    return (
                <>
                    <div className="text__qiymet display__flex ">
                        <h5>{props.price}</h5>
                        <div className="text--stock display__flex">
                            <img src={require(`../../assets/images/slider/suggest.png`)} alt=""/>
                            <p>{props.stock}</p>
                        </div>
                    </div>
                    <div className="text--qiymetferqi">
                        <p>{props.priceabuot}</p>
                        <div className="bord"></div>
                    </div>
                    <div className="text--qeydler">
                         <h5> {props.sifarisqeydleri}</h5>
                        <div className="text--product__melumatlar">
                            <p>Zəhmət olmasa sifarişinizdə aşağıdakıları bildirin:</p>
                            <ul>
                                <li><span>-</span>Məhsulun növü</li>
                                <li><span>-</span>Məhsulun ölçüsü</li>
                                <li><span>-</span>Məhsulun rəngi</li>
                                <li><span>-</span>Əlavə istəkləriniz</li>
                            </ul>
                        </div>
                    </div>
                </>
    )
}


export default SifarishQiymeti;
