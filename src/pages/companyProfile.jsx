import React, { useEffect, useContext } from 'react'
import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom'
import Home from './profile-shop-home'
import Products from './products'
import ProductCreate from './create-product'
import ProductInfo from './product-info'
import StoreProfile from '../components/StoreProfil/StoreProfil.component'
import CompanyOrders from './company-orders'
import {appContext} from '../contexts/appContext'
import '../assets/sass/pages/companyProfile.scss'

function CompanyProfile() {
  let AppContext=useContext(appContext);
  useEffect(()=>{
    AppContext.events.mobileSideBarOFF()
  })
 return (
  <div>
  <Router>
  <div className='navbar_bottom'>
  <NavLink exact to='/profile' className='navbar_bottom_link' activeClassName="activeLink">Mağaza</NavLink>
  <NavLink exact to='/profile/products' className='navbar_bottom_link' activeClassName="activeLink">Məhsullar</NavLink>
  <NavLink exact to='/profile/orders' className='navbar_bottom_link' activeClassName="activeLink">Sifarişlər</NavLink>
 {/*  <NavLink exact to='/profile/companies' className='navbar_bottom_link' activeClassName="activeLink">Kampaniyalar</NavLink>*/}  
 <NavLink exact to='/profile/info' className='navbar_bottom_link' activeClassName="activeLink">Tənzimləmələr</NavLink>
  </div>
  
   <Route exact path='/profile' component={Home}/>
   <Route exact  path='/profile/products' component={Products}/>
   <Route exact  path='/profile/product/create' component={ProductCreate}/>
   <Route path='/profile/product/edit/:id' component={ProductCreate}/>
   <Route exact  path='/product/:id/:name' component={ProductInfo}/>
   <Route path='/profile/orders' component={CompanyOrders}/>
   <Route path='/profile/companies' component={Home}/>
   <Route path='/profile/info' component={StoreProfile}/>

   </Router>
  </div>
  
 )
}

export default CompanyProfile
