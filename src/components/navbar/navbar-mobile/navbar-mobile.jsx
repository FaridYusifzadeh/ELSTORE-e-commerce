import React, { useState, useContext, useRef, useEffect } from 'react'
import './navbar-mobile.scss'
import {appContext} from '../../../contexts/appContext';
import {searchContext} from '../../../contexts/search'
import {Link } from "react-router-dom";
import LangToggler from "../../lang_currency_toggler/lang_currency_toggler";

function NavbarMobile({ref,scrollEvent}) {
 const [toggle, setToggle] = useState({
  active: false,
  scrActive:false
  });

  const MobilenavbarRef = useRef()
  const mobileNavbarSrcRef = useRef();
  let   mobileNavbarSrcRefEvent = (active) =>{
   setToggle({
        ...toggle,
        scrActive:active
     })
   mobileNavbarSrcRef.current.classList.toggle('mns-active');
  }
  const AppContext=useContext(appContext);
  const products = useContext(searchContext);

 function toggleNav(){
  document.getElementsByClassName('menu-container')[0].classList.toggle('change');
  document.getElementById('res-nav-id').classList.toggle('opennav');
  document.getElementsByTagName('body')[0].classList.toggle('of-hidden');
  document.getElementById('res-nav-id').classList.toggle('of-scroll');
  
  setToggle({ 
     ...toggle,
     active: !toggle.active,
    });
}


// const myFunction=(event)=>{
//    event.stopPropagation();
//    document.querySelector(".mobile_notification_wrapper").classList.toggle('show_dropDown');
// }

// window.onclick = function(event){
//    document.querySelector(".mobile_notification_wrapper").classList.remove('show_dropDown');
// }
  
  useEffect(()=>{
     console.log(ref)
     scrollEvent(MobilenavbarRef)
  },[])

 return (
  <div className='navbar-mobile' ref={MobilenavbarRef}>
     <div className='navbar-mobile-top'>
        <div className='navbar-mobile-top-container'>
                   <div className='navbar-mobile-top-left'>
                    <Link className="navbar_top_link" to='/worked-delivery'>Kuryer olmaq istəyirsiniz?</Link>
                    <Link className="navbar_top_link navbar_top_link--end " to='/open-store'>Mağaza aç</Link>
        </div>
         <div className='navbar-mobile-top-right'>
{/*            <div className='navbar_select'>
               <LangToggler firstopt="Azərbaycan"/>
 </div>*/}
        </div>
        </div>
     </div>
     <div className='navbar-mobile-bootom'>
       <div className='navbar-mobile-bootom-container'>
          <div className='navbar-mobile-bootom-container-left'>
             <div className={`menu-container navbaroutside`} onClick={toggleNav}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
             </div>
             <div className='navbar-mobile-logo'>
                <Link to='/'><img alt='' src={require('../../../assets/logo/logo_1.svg')} /></Link>
             </div>
          </div>
          <div className='navbar-mobile-bootom-container-right'>
               <div className='nmbcr-src' onClick={()=>mobileNavbarSrcRefEvent(!toggle.scrActive)}>
                  <img src={!toggle.scrActive?
                            require('../../../assets/images/icons/m-search.svg'):
                            require('../../../assets/images/icons/m-close.svg')
                            } alt=''/>
               </div>
               <div className='navbar-mobile-notification'>
                  <img alt='' src={require('../../../assets/images/ringbells.svg')} />
                  <span>0</span>
               </div>
               {/* <div id="notificationDrop" className="mobile_notification_wrapper">
                        <ul>
                            <li>
                                <h4>Yeni sifariş</h4>
                                <p>body of not. body of not. body of not. body of not. body of not. body of not.</p>
                            </li>
                            <li>
                                <h4>Yeni sifariş</h4>
                                <p>body of not. body of not. body of not. body of not. body of not. body of not.</p>
                            </li>
                            <li>
                                 <h4>Yeni sifariş</h4>
                                <p>body of not. body of not. body of not. body of not. body of not. body of not.</p>
                            </li>
                            <li>
                                <h4>Yeni sifariş</h4>   
                                <p>body of not. body of not. body of not. body of not. body of not. body of not.</p>
                            </li>
                            <li>
                                <h4>Yeni sifariş</h4>
                                <p>body of not. body of not. body of not. body of not. body of not. body of not.</p>
                            </li>
                        </ul>
                    </div> */}
              <Link className='navbar_buttons_link bag basket' to='/basket'>
                 <img alt='' src={require('../../../assets/images/bagins.svg')} />
                   <span>{AppContext.basket.length}</span>
              </Link> 
          </div>
       </div>
     </div>
     <div className='m-navbar-src' >
     <form onSubmit={(e)=>{e.preventDefault();History.push(`/search/filter[title]=${products.state.searchKey}`)}}  className="search-input" >
     <div className="withicon" ref={mobileNavbarSrcRef}>
             <input onChange={products.events.searchForm}  value={products.state.searchKey} className='search-input-text' type="text" placeholder="Axtarış.." name="search" />
             <Link to={`/search/filter[title]=${products.state.searchKey}`} className='search-input-submit' type="submit"><img alt='' src={require('../../../assets/images/Iconka.svg')} /></Link>
     </div>
     </form>
     </div>
  </div>
 )
}

export default NavbarMobile
