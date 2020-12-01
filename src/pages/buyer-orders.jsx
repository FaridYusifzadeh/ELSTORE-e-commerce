import React, { useContext,useState, useEffect } from 'react'
import {appContext} from '../contexts/appContext';
import UrlGenerator from '../services/url-generator';
import OrderCard from '../components/order-card/order-card.component';
import "../assets/sass/pages/orders.scss";
import Pagination from "../components/Pagination/pagination.component"


function BuyerOrders() {
 const [currentOrders, setCurrentOrders] = useState([]);
 const [oldOrders, setOldOrders] = useState([]);
 const AppContext=useContext(appContext)

 useEffect(()=>{
  let currentOrderUrl=UrlGenerator('az','users/buyer/orders/0');
  let oldOrderUrl=UrlGenerator('az','users/buyer/orders/2');
  let token=AppContext.app.token;
  
  //-------------------------current Orders Fetch
  fetch(currentOrderUrl,{
      headers:{
          'Authorization':`${token.token_type} ${token.access_token}`
      }
  })
  .then(async res=>{
      let data=await res.json();
      if(res.ok){
       setCurrentOrders([
              ...data.data
          ])
      }
  }).catch(err => console.log(err));

  //----------------------------old orders fetch
  fetch(oldOrderUrl,{
   headers:{
       'Authorization':`${token.token_type} ${token.access_token}`
   }
})
.then(async res=>{
   let data=await res.json();
   if(res.ok){
    setOldOrders([
           ...data.data
       ])
   }
}).catch(err => console.log(err))



 },[])

 
 function CurrentOrders() {
    let profile__info_update=document.getElementById('current-order-section');
    let adress__info_clicked=document.getElementById("old-order-section")
    let active__border= document.querySelector(".active--border");
    let simple__border= document.querySelector(".simple--border");
    profile__info_update.style.display="block"
    adress__info_clicked.style.display="none"
    simple__border.style.border="2px solid #D0D0D0";
    active__border.style.border="2px solid #6472B8";
 }
 function OldOrders() {
     let profile__info_update=document.getElementById('current-order-section');
     let adress__info_clicked=document.getElementById("old-order-section")
     let active__border= document.querySelector(".active--border");
     let simple__border= document.querySelector(".simple--border");
     profile__info_update.style.display="none"
     adress__info_clicked.style.display="block"
     simple__border.style.border="2px solid #6472B8";
     active__border.style.border="2px solid #D0D0D0";
  }
 

 return (
  <div className='buyer-order-content'>
      <div className="profil__info--offer">
      <div onClick={CurrentOrders}  id="profile__info-clikced">
        <h5>cari</h5>
      <div className="active--border"></div>                                                             
       </div>
       <div onClick={OldOrders}  id="adress__info-clicked">
          <h5>tamamlanmış</h5>
           <div className="simple--border"></div>
       </div>                                                        
    </div>
    <br/>
  <section id='current-order-section'>
     <OrderCard status={0} orders={currentOrders}/>
  </section>
  <section id='old-order-section'>
    <OrderCard status={2} orders={oldOrders}/>
  </section>


  {/* <Pagination paginationHandling={(e)=>PagenationHandling1(e)} meta={currentOrder.meta}/>  */}
   
  </div>
 )
}

export default BuyerOrders
