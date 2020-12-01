import React, { useEffect, useState, useContext } from 'react'
import Card from '../card/card.component'
import './order-card.component.scss';
import ButtonRating from '../button-rating/buttonRating.component'
import UrlGenerator from '../../services/url-generator'
import { Link } from 'react-router-dom';
import {appContext} from '../../contexts/appContext';


function OrderCard({orders,status}) {

   

 return (
  <>
      {
          orders.map((x,i)=>{
             return(
                 <div key={i} className='card_profile-flex'>
             <div className='card_profile_left'>
             {
               x.images.map((x,i)=>{
                   if(x.is_main==1){
                       return <Link key={i} to={`/product/${x.id}/${x.product_name}`}><img alt='' className='basket_card_profile_img' src={x.product_thumbnail_image} /></Link> 
                   }
               })
             }
            </div>
            <div className='card_profile_center'>
                <Link to={`/product/${x.id}/${x.product_name}`}><h1 className='baskert_card_profile_header'>{x.product_name}</h1></Link>
                {
                    x.discount>0
                    ?<p>
                    <span style={{'color':'green'}}>{x.discount}</span>
                    <h1 className='baskert_card_profile_price'>{x.discount_price}</h1><del>{x.price}</del></p>
                    :<h1 className='baskert_card_profile_price'>{x.price}</h1>
                }
                <div>
                {
                    status===0
                    ?
                    <ButtonRating class='text_profile_iconcard' icon={require("../../assets/images/icons/Vector 1 (Stroke).svg")} name="məhsul hazırlanır"/>
                    :
                    <ButtonRating class='text_profile_iconcard' icon={require("../../assets/images/icons/Vector 1 (Stroke).svg")} name="məhsul çatdırıldı"/>
                }
                    
                </div>
            </div>
            <div className='card_profile_right price_div '>
               
            </div>
             </div>


             )
          })
       
      }    
  </>
 )
}

export default OrderCard
