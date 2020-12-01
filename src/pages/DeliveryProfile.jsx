import React, { useEffect, useContext } from 'react'
import {BrowserRouter as Router,Link,Route, NavLink} from 'react-router-dom'
import Deliveyİnfo from "../components/DeliveryProfile/Delivery.component"
import {appContext} from '../contexts/appContext';
import Card from '../components/card/card.component';
import ListItem from '../components/List-Item/Listitem.component'
import DeliverOrder from './delivery-orders';
import UrlGenerator from '../services/url-generator';

import '../assets/sass/pages/deliveryProfile.scss';


function Profile() {
  let AppContext=useContext(appContext);
  useEffect(()=>{
    AppContext.events.mobileSideBarOFF()
  })

  const acceptOrder=(checkoutId)=>{
    console.log(checkoutId)
    let url=UrlGenerator('az','users/courier/acceptcheckout');
    let token = AppContext.app.token;
    fetch(url,{
      method:'Post',
      body:JSON.stringify({
        checkout_id:checkoutId,
      }),
      headers:{
        'Content-Type':"application/json",
        'Authorization':`${token.token_type} ${token.access_token}`
      }
    }).then(async res=>{
      let data=await res.json();
      console.log(data.data)
    }).catch(err=>console.log(err))
  }

  const declineOrder=(checkoutId)=>{
    let token = AppContext.app.token;
    console.log(checkoutId)
    let url=UrlGenerator('az','users/courier/rejectcheckout');
    fetch(url,{
      method:'Post',
      body:JSON.stringify({
        checkout_id:checkoutId,
      }),
      headers:{
        'Content-Type':"application/json",
        'Authorization':`${token.token_type} ${token.access_token}`
      }
    }).then(async res=>{
      let data=await res.json();
      console.log(data.data)
    }).catch(err=>console.log(err))
  }


 return (
  <div className='container-fluid'>
  <Router>
  <div className='navbar_bottom'>
  <NavLink to='/profile' className='navbar_bottom_link' activeClassName="activeLink" exact>Bütün Sifarişlər</NavLink>
  <NavLink to='/profie/courier-current-orders' className='navbar_bottom_link' activeClassName="activeLink" exact>Cari Sifarişlər</NavLink>
  <NavLink to='/profie/courier-completed-orders' className='navbar_bottom_link' activeClassName="activeLink" exact>Tamamlanmış Sifarişlər</NavLink>
  <NavLink to='/profie/courier-info' className='navbar_bottom_link' activeClassName="activeLink" exact>Tənzimləmələr</NavLink>
  </div>
  <div className='row'>
  <div className='col-lg-12 col-xs-12'>
  <Route exact path='/profile' render={()=><DeliverOrder query='status=0' urlLink={'users/lastDayOrders'} linkFucn={acceptOrder} linkName='Sifarişi qəbul et'/>}/>
  <Route exact path='/profie/courier-current-orders' render={()=><DeliverOrder  query='status=1' status='1' urlLink={'users/courier/orders'} linkFucn={declineOrder} linkName='Sifarişidən imtina et'/>}/>
  <Route exact path='/profie/courier-completed-orders' render={()=><DeliverOrder urlLink={'users/courier/orders'} status='' query='complete_status=2'/>}/>
  <Route exact path='/profie/courier-info' component={Deliveyİnfo}/>
</div>
</div>
  </Router>
  </div>
 )
}

export default Profile
