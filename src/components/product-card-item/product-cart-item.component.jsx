import React,{useContext} from 'react'
import HeartImage from '../heart-image/heartImage.component'
import ButtonRating from '../button-rating/buttonRating.component'
import Button from "../button/button.component"
import {Link} from 'react-router-dom'
import './product-card-item.component.scss'
import {appContext} from '../../contexts/appContext'


function ProductCartItem({data,isLiked}) {

        // let firstImg = document.querySelector('.hearts_icon')
        // if(firstImg.childNodes[0].style.display === 'block'){
        //     firstImg.childNodes[0].style.display = 'none';
        //     firstImg.childNodes[1].style.display = 'block';
        // }else{
        //     firstImg.childNodes[1].style.display = 'none';
        //     firstImg.childNodes[0].style.display = 'block';
        // }

        const AppContext=useContext(appContext)

 return (

         
  <div  className="search__result">
  <HeartImage isLiked={data.is_like} id={data.id}/>
  {
      data.images.map(f=>{
          if(f.is_main){
              return <div key={f.id} className="swiper_slide_image">
              <Link to={`/product/${data.id}/${data.product_name}`}>
                <img src={f.product_thumbnail_image} alt=""/>
                </Link>
              </div> 
          }
      })
  }
  <h5>
  <Link to={`/product/${data.id}/${data.product_name}`}>{data.product_name}</Link>
  </h5>
  {
     (data.discount!=0)?<p className="product_-discount">{data.discount} % endirim</p>:null
    
  }
  
  <div className="product__price ">
  {
    data.discount_price!==0
    ?<p>{data.discount_price} AZN<del>{data.price} AZN</del></p>
    :<p>{data.price} AZN</p>
  }
  </div>
  <div className="baginto">
  <ButtonRating name='Yüksək reytinq' class='bg-gold' icon={require('../../assets/images/icons/star.svg')}/>
  </div>
  <Button data={data.id} onClick={(e)=>AppContext.events.addBasket(e)}  class="button__adress" btng='btn-position' name="səbətə at"/>
</div>
 )
}

export default ProductCartItem;
