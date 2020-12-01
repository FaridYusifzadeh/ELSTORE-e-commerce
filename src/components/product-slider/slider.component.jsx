import React,{useEffect} from 'react'
import './slider.component.scss';
import Swiper from 'swiper';
import HeartImage from '../heart-image/heartImage.component'

function ProductSlider(props){
useEffect(()=>{
    var galleryThumbs = new Swiper('.swiper-container.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: "auto",
      loop: true,
      freeMode: true,
      loopedSlides: "auto", //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      direction: 'vertical',
      navigation: {
        prevEl: '.myprev',
      },
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      loop:true,
      loopedSlides: 5, //looped slides should be the same
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs,
      },
    });
})

  return (
    <div className='product-slider-container'>
    <div class="swiper-container gallery-top">
    {/*<button className='slider_like'> <img src={require('../../assets/images/icons/Enabled.svg')} alt=""/></button>*/}
    <HeartImage clas='slider_like' id={props.id} isLiked={props.is_liked}/>
    <div class="swiper-wrapper">
      {
        props.images.map(x=>{
         return <div key={x.id} class="swiper-slide" style={{backgroundImage:`url(${x.product_image})`}}></div>
        })
      }
      
    </div>
    <div class="swiper-button-next swiper-button-white">
      <img src={require('../../assets/images/icons/next-icon.svg')} />
    </div>
    <div class="swiper-button-prev swiper-button-white">
    <img src={require('../../assets/images/icons/next-icon.svg')} />
    </div>
  </div>
  <div class="swiper-container gallery-thumbs">
    <div class="swiper-wrapper">
     {
      props.images.map(x=>{
        return <div class="swiper-slide" style={{backgroundImage:`url(${x.product_image})`}}></div>
        })
     }

    </div>
    <div class="swiper-button-prev myprev swiper-button-white">
    <img src={require('../../assets/images/icons/next-icon.svg')} />
    </div>
  </div>
  </div>
  );
}

export default ProductSlider