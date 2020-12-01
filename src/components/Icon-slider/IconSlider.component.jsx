import React, { Component } from 'react'
import './IconSlider.component.scss'
import Swiper from 'swiper';
import { Link } from 'react-router-dom';

export class IconSlider extends Component {
    componentDidUpdate(){
        var iconSlider = new Swiper('#icon_slider__container.swiper-container',{
            slidesPerView :"auto",
            slidesPerGroup: 1,
            loopedSlides:'auto',
            spaceBetween:10,
            loop: true,
            speed:1000,
            loopFillGroupWithBlank: true,
            grabCursor: true,
            freeMode:true,
            navigation:{
                nextEl: '.icon-button-next',
                prevEl: '.icon-button-preview'
            },
            breakpoints:{
                0:{
                    slidesPerView:1
                },
                320:{
                    slidesPerView:2
                },
                576:{
                    slidesPerView:4
                },
                768:{
                    slidesPerView:6
                },
                992:{
                    slidesPerView:'auto'
                },
                1200:{
                    slidesPerView:"auto",
                    // spaceBetween:5
                }
            }
        })
    }
    render() {
        return (
            <section className="icon_slider_section">
                            <div id="icon_slider__container" className="swiper-container">
                                
                                <div className="swiper-wrapper">
                                {
                                    this.props.brands.map(x=>{
                                        return <div key={x.id} className="swiper-slide isic">
                                        <Link style={{'textDecoration':'none','color':'black'}} to={`/search/filter[brand_id]=${x.id}`}>
                                        <div className="swiper_slide_image">
                                            <img src={x.logo} alt=""/>
                                        </div>
                                        </Link>  
                                        <Link style={{'textDecoration':'none','color':'black'}} to={`/search/filter[brand_id]=${x.id}`}><p>{x.name}</p></Link>
                                    </div>
                                    })
                                }
                                </div>
                            </div>
                <div className="icon-button-next"> <img src={require('../../assets/images/icons/chevron-right-solid.svg')} alt=""/> </div>
                <div className="icon-button-preview"> <img src={require('../../assets/images/icons/chevron-left-solid.svg')} alt=""/> </div>
            </section>
        )
    }
}

export default IconSlider
