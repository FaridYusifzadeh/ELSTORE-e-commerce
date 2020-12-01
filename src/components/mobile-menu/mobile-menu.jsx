import React, { useState, useContext } from 'react'
import {Link } from "react-router-dom";
import './mobile-menu.scss'
import { categoryContext } from '../../contexts/category';
import MobileModal from '../categorymobile_modal/mobilemodal'
import Button from '../button/button.component'
import {appContext} from '../../contexts/appContext';


function MobileMenu() {

  const AppContext=useContext(appContext)
 const CategoryContext=useContext(categoryContext)
 const [show,setShow] = useState({
  show: false
})

 function handleClick(){
  setShow({
      show: !show.show
    });
} 
    function menuToggle(params) {
      document.getElementsByClassName('menu-container')[0].classList.toggle('change');
      document.getElementById('res-nav-id').classList.toggle('opennav');
      document.getElementsByTagName('body')[0].classList.toggle('of-hidden');
      document.getElementById('res-nav-id').classList.toggle('of-scroll');
    }

 return (
  <div className='responsive_nav' id='res-nav-id'>
    <MobileModal onClose={handleClick} show={show.show}>
    <div className="tabs">
     {
      Object.keys(CategoryContext.state.categories).map(x=>{ 
        return(
          <div className="tab">
          <input type="radio" id={`rd${CategoryContext.state.categories[x].id}`} name="rd"/>
          <label className="tab-label" for={`rd${CategoryContext.state.categories[x].id}`}>{CategoryContext.state.categories[x].name}</label>
          <div className="tab-content">
          <ul key={x.id}>
            <Link style={{'textDecoration':'none'}}  to={`/search/filter[category_id]=${CategoryContext.state.categories[x].id}`}>
            <li>{CategoryContext.state.categories[x].name}</li>
            </Link>
            { 
                CategoryContext.state.categories[x].children!==null?
               CategoryContext.state.categories[x].children.map(y=>{
                 return  <Link style={{'textDecoration':'none'}}  to={`/search/filter[category_id]=${y.id}`}>
                 <li>{y.name}</li>
                 </Link>
                })
               :null
            }
         </ul>
          </div>
        </div>
        )
      })
     }
    </div>
  </MobileModal>
  
  <div className='responsive_nav_login'>
  <div className='container'>
  <div className='row'>
     <div className='rnl-container'>
     <div className='rnl-pro'>
      <img src={AppContext.app.isAuthorized?`${AppContext.app.user.logo}`:require('../../assets/images/manly.svg')} className='rnl-pro-img' alt=''/>
     </div>
    <img className='rnlc-close' onClick={menuToggle} src={require('../../assets/images/icons/exit-menu.svg')} alt=""/>
     </div>
  </div>
  <div className='row'>
  <div className='responsive_nav_bottom'>
  <div onClick={handleClick} className='responsive_nav_bottom_item ' >Kateqoriyalar <img alt='' src={require('../../assets/images/icons/arrowDown.png')} /></div>
{/*  <Link className='responsive_nav_bottom_item' to='/m-categoriy'>Kateqoriyalar <img alt='' src={require('../../assets/images/icons/arrowDown.png')} /></Link>*/}
  <Link className='responsive_nav_bottom_item' to='/campaigns'>Kampaniyalar</Link>
  <Link className='responsive_nav_bottom_item' to='/shops'>Mağazalar</Link>
  <Link className='responsive_nav_bottom_item' to='/contact'>Əlaqə</Link>
  {
    AppContext.app.isAuthorized&&
    <>
    <Link className='responsive_nav_bottom_item' onClick={AppContext.events.logout}>Çıxış</Link>
    <Link className='responsive_nav_bottom_item' to='/profile'>Profil</Link>
    </>
  }
  {/*<Link className='responsive_nav_bottom_item' to="/profile">Profil</Link>*/}
  </div>
  </div>
  {
    !AppContext.app.isAuthorized&&
    <div className='login-regis-btns'>
    <Link className='responsive_nav_login_log rnll-color' to='/' onClick={()=>{document.getElementById('login__modal').style.display='block';}}>
    <Button className='bg-primary--dark txt--light mbs ' name='Daxil Ol'/>
    </Link>
    <Link className='responsive_nav_login_log rnll-color' to='/' onClick={()=>{document.getElementById('login__modal').style.display='block';}}>
    <Button className='txt--primary mbs' name=' Hesab Yarat'/>
   </Link>
    </div>
  }
  </div>
  </div>
</div>
 )
}

export default MobileMenu
