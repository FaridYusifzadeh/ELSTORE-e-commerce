import Swiper from 'swiper';
export default new Swiper('#brandSlider.swiper-container',{
 slidesPerView : 4,
 slidesPerGroup: 1,
 loop: true,
 speed:1000,
 spaceBetween : 18,
 loopFillGroupWithBlank: true,
 grabCursor: true,
 // autoplay: {
 //     delay: 0,
 //     disableOnInteraction: false,
 // },
 navigation:{
     nextEl: '.brand-button-next'
 },
 breakpoints:{
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