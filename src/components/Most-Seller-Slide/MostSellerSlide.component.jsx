import React, { Component } from 'react'
import './MostSellerSlide.component.scss'
import {Link} from 'react-router-dom';
import Swiper from 'swiper';
import ProductCartItem from '../product-card-item/product-cart-item.component'
import Axios from 'axios';
import UrlGenerator from '../../services/url-generator';

export class MostSellerSlide extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[]
        }
    }
    componentDidMount(){
        let url=UrlGenerator('az','search/product?filter[popularity]=0')
        Axios(url).then(res=>{
            console.log(res.data)
            this.setState({
                ...this.state,
                data:res.data
            })
        }).catch(err=>console.log(err))


        var mostSeller = new Swiper('#mostSlider.swiper-container',{
            slidesPerView : 'auto',
            slidesPerGroup: 1,
            loop: true,
            freeMode: true,
            loopedSlides: "auto",
            speed:1000,
            spaceBetween : 18,
            loopFillGroupWithBlank: true,
            grabCursor: true,
            // autoplay: {
            //     delay: 0,
            //     disableOnInteraction: false,
            // },
            navigation:{
                nextEl: '.most-button-next',
                prevEl: '.most-button-preview'
            },
            breakpoints:{
                0:{
                    slidesPerView:1
                },
                320:{
                    slidesPerView:1
                },
                576:{
                    slidesPerView:2
                },
                768:{
                    slidesPerView:3
                },
                992:{
                    slidesPerView:4
                },
                1200:{
                    slidesPerView:4,
                    // spaceBetween:5
                }
            }
        })
    }
    componentDidUpdate(props){
        var mostSeller = new Swiper('#mostSlider.swiper-container',{
            slidesPerView : 'auto',
            slidesPerGroup: 1,
            loop: true,
            freeMode: true,
            loopedSlides: "auto",
            speed:1000,
            spaceBetween : 18,
            loopFillGroupWithBlank: true,
            grabCursor: true,
            // autoplay: {
            //     delay: 0,
            //     disableOnInteraction: false,
            // },
            navigation:{
                nextEl: '.most-button-next',
                prevEl: '.most-button-preview'
            },
            breakpoints:{
                0:{
                    slidesPerView:1
                },
                320:{
                    slidesPerView:1
                },
                576:{
                    slidesPerView:2
                },
                768:{
                    slidesPerView:3
                },
                992:{
                    slidesPerView:4
                },
                1200:{
                    slidesPerView:4,
                    // spaceBetween:5
                }
            }
        })
        
    }
    
    render(){
        // <p className="discount">20% endirim</p>
        
        return (
            <section className="most_seller_slider_section">
                            <div className="most_slider_title display__flex">
                             <h4>{this.props.name}</h4>
                             <Link to="/mostsellers/filter[popularity]=0">Hamsını gör</Link>
                            </div>
                            <div id="mostSlider" className="swiper-container">
                                <div className="swiper-wrapper">
                                        {
                                            this.state.data.data!==undefined?
                                            this.state.data.data.slice(0,4).map(x=>{
                                                    return <div className="swiper-slide">
                                                    <ProductCartItem data={x}/>
                                                    </div>
                                                }):
                                                null
                                        }
                                </div>
                            </div>
                <div className="most-button-next"> <img src={require('../../assets/images/icons/chevron-right-solid.svg')} alt=""/> </div>
                <div className="most-button-preview"> <img src={require('../../assets/images/icons/chevron-left-solid.svg')} alt=""/> </div>
            </section>
        )
    }
}

export default MostSellerSlide
