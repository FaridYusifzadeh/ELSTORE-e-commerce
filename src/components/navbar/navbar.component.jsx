import React,{useState, useEffect,useContext, useRef} from 'react';
import './navbar.component.scss';
import {useHistory,Link } from "react-router-dom";
import {searchContext} from '../../contexts/search';
import {categoryContext} from "../../contexts/category"
import NavbarMobile from './navbar-mobile/navbar-mobile'
import axios from 'axios'
import LangToggler from "../lang_currency_toggler/lang_currency_toggler";
import Selectbox from "../Select-box/SelectBox.component";
import {appContext} from '../../contexts/appContext'
import $ from 'jquery'
import UrlGenerator from '../../services/url-generator';




const Langs =  [
    {id:1,name:'Azerbaijan'},{id:2,name:'Turkish'},{id:3,name:'Ukranian'}];
const Currency =  ['AZN','EURO','USD'];


function  Navbar(props) {

    const products = useContext(searchContext);
    const [visiblepp,setVisiblepp] =useState(false);
    const AppContext=useContext(appContext);
    const History=useHistory();

    const navbarRef = useRef()

    const CategoryContext = useContext(categoryContext)

    const [categories, setCategories] = useState({
        data:[]
    })

      const [navbarCat, setNavbarCat] = useState({
        data:[]
    })

    const [toggle, setToggle] = useState({
        active: false,
      });


    function showbar(){
        setVisiblepp(!visiblepp)
    }

    
    

   
    function activeSearch(){
        let navbarSearch = document.querySelector('.navbar_search');
        let navbarCenter = document.querySelector('.navbar_center');
        navbarSearch.classList.toggle('showEl');
        navbarCenter.classList.toggle('showHeight');
        // let hasItem = false;
        // if(!hasItem){
        // navbarSearch.style.display = "block";
        // }else if(hasItem){
        // navbarSearch.style.display = "none";
        // }
    }



      window.onclick = function(event) {
        if (!event.target.matches('.navbar_buttons_link profile')) {
      
          var dropdowns = document.getElementsByClassName(".profile_dropwdown");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {  
              openDropdown.classList.remove('show');
            }
          }
        }
      }
      
    // function toggleNav() {
    //     document.getElementsByClassName('menu-container')[0].classList.toggle('change');
    //     document.getElementById('res-nav-id').classList.toggle('opennav');
    //     document.getElementsByTagName('body')[0].classList.toggle('of-hidden');
    //     document.getElementById('res-nav-id').classList.toggle('of-scroll');
        
    //     const currentState = toggle.active;
    //     setToggle({ active: !currentState });
    // }

   function Sign(){
    let modal= document.getElementById("login__modal");
    let signin_view=document.getElementById('signin_view');
    let signup_view=document.getElementById('signup_view');
    let border__size__active= document.querySelector(".border__size--active");
    let border__size=document.querySelector(".border__size")
    border__size__active.style.border="2px solid #6472B8"
    border__size.style.border="2px solid #D0D0D0"
    modal.style.display="block";
    signup_view.style.display="none"
    signin_view.style.display="block"
   }

   function SignUp(){
    let modal= document.getElementById("login__modal");
    let signin_view=document.getElementById('signin_view');
    let signup_view=document.getElementById('signup_view');
    let border__size__active= document.querySelector(".border__size--active");
    let border__size=document.querySelector(".border__size")
    border__size__active.style.border="2px solid #D0D0D0"
    border__size.style.border="2px solid #6472B8"
    modal.style.display="block";
    signup_view.style.display="block"
    signin_view.style.display="none"
}


    useEffect(()=>{
        // let notification = document.getElementById('notification');
        // notification.addEventListener('click',function(){
        //     let notification_wrapper = document.querySelector('.notification_wrapper');
        //     notification_wrapper.style.display = "block";
        // })
        
    },[])

    

    // const myFunction=(event)=>{
    //     event.stopPropagation();
    //     document.querySelector(".notification_wrapper").classList.toggle('show_dropDown');
    // }

    // window.onclick = function(event){
    //     document.querySelector(".notification_wrapper").classList.remove('show_dropDown');
    // }

    useEffect(()=>{
        

        var acc = document.getElementsByClassName("accordion_lang");
            var i;
    
            // for (i = 0; i < acc.length; i++) {
            // acc[i].addEventListener("click", function() {
            //     this.classList.toggle("active");
            //     var panel = this.nextElementSibling;
            //     if (panel.style.height) {
            //     panel.style.height = null;
            //     } else {
            //     panel.style.height = '70px';
            //     } 
            // });

            // }
            
            

            $(function() {
                $(".navbar_bottom_link").click(function() {
                   // remove classes from all
                   $(".navbar_bottom_link").removeClass("activenav");
                   // add class to the one we clicked
                   $(this).addClass("activenav");
                   
                });
                $(".navbar_logo a").click(function() {
                    $(".navbar_bottom_link").removeClass("activenav");
                 });
             });
             
             if(window.location.href.split('/')[3]==='' && window.location.href.split('/')[3] === 'index'){
                $(".navbar_bottom_link").removeClass("activenav");
             }
             

    },[])
   
    let url=UrlGenerator('az','categories')
    useEffect(()=>{
        axios({
            method:'GET',
            url:url,
    
        }).then(res=>{
            setNavbarCat({
                data:res.data.data
            })
        })
        
    },[])


    function scrollScreen(ref){
        console.log(ref.current)
        window.addEventListener('scroll',function (e){ 
            if(this.scrollY > 120){
                ref.current.classList.add('navbar-scroll-pos');
             }else{
                ref.current.classList.remove('navbar-scroll-pos')
             }
             
             })
    }
    useEffect(() => {
        let body=document.getElementsByTagName('body')[0];

     
            body.addEventListener("click",function(e){
                setVisiblepp(visiblepp)
           })

           scrollScreen(navbarRef)
    }, []);
        
     
     useEffect(()=>{
      axios({
          method:'GET',
          url:url,
  
      }).then(res=>{
          setCategories({data:res.data.data});
      })
     },[])
  
    const userProfle=<>
    <Link onClick={showbar} className={`navbar_buttons_link profile login-profile`}>
{/*    <div className='nav-prfile-img'>
    TN
    </div>*/}
    {
        AppContext.app.user!==null?
        <img alt='' src={`${AppContext.app.user.logo}`} /> :
        <div className='nav-prfile-img'>
          <img alt='' src={require('../../assets/images/manly.svg')} />   
        </div>
    }
     </Link>  
<div className={`profile_dropwdown ${visiblepp ? 'active':''}`} >
    <ul className='profile_dropwdown_ul'>
        <li className='profile_dropwdown_li'> <Link to='/profile'>Profil</Link></li>
        <li className='profile_dropwdown_li_a'><Link onClick={AppContext.events.logout}>Çıxış</Link></li>
    </ul>
</div>

</>;

const loginRegister = <>
<Link onClick={showbar} className={`navbar_buttons_link profile`}>
<img alt='' src={require('../../assets/images/manly.svg')} /> </Link>
<div className={`profile_dropwdown ${visiblepp ? 'active':''}`} >
    <ul className='profile_dropwdown_ul'>
        <li className='profile_dropwdown_li'> <Link onClick={Sign}>Daxil ol</Link></li>
        <li className='profile_dropwdown_li_a'><Link onClick={SignUp}>Hesab Yarat</Link></li>
    </ul>
</div>
    </> 

    console.log(AppContext.app.user)

    return (
        <>
        <div className='navbar' ref={navbarRef}>
            <div className='navbar_top'>
            <div className='navbar_top_container'>
                <div className='left_navbar__top'>
                    <Link to = '/campaigns' className="navbar_top_link">Kampaniyalar</Link>
                    <Link  to = '/shops' className="navbar_top_link">Mağazalar</Link>
                   {/* <Link to='faq' className="navbar_top_link">Tez-tez verilən suallar</Link>*/}
                     <Link to = '/contact' className="navbar_top_link">Əlaqə</Link>
                </div>
                <div className="right_navbar__top">
                    <Link className="navbar_top_link" to='/worked-delivery'>Kuryer olmaq istəyirsiniz?</Link>
                    <Link className="navbar_top_link navbar_top_link--end " to='/open-store'>Mağaza aç</Link>
                    <div className='navbar_select'>
                    {/*<LangToggler firstopt="Azərbaycan"/>*/}
                    </div>

                </div>
                </div>
            </div>
            <div className='navbar_center'> 
               <div className='navbar_center_container'>
                <div className='navbar_logo'>
                    <Link to='/'><img alt='' src={require('../../assets/logo/logo_1.svg')} /></Link>
                </div>
                <div className='navbar_search'>
                <form onSubmit={(e)=>{e.preventDefault();History.push(`/search/filter[title]=${products.state.searchKey}`)}}  className="search-input" >
                <div className="withicon">
                        <input onChange={products.events.searchForm}  value={products.state.searchKey} className='search-input-text' type="text" placeholder="Axtarış.." name="search" />
                        <Link to={`/search/filter[title]=${products.state.searchKey}`} className='search-input-submit' type="submit"><img alt='' src={require('../../assets/images/Iconka.svg')} /></Link>
                </div>
                </form>
                </div>
                <div className='navbar_buttons'>
                    {/* <div id="notificationDrop" className="notification_wrapper">
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
                <Link id="notification"  className='navbar_buttons_link bag notification'> <img alt='' src={require('../../assets/images/ringbells.svg')} /> <span>0</span></Link>
                <Link   className='navbar_buttons_link bag basket' to='/basket'><img alt='' src={require('../../assets/images/bagins.svg')} /><span>{AppContext.basket.length}</span></Link> 
                     
                    {
                        AppContext.app.isAuthorized?
                            userProfle:
                            loginRegister
                    }
                    <div>
                    </div>
                </div>
            </div>
            </div>
            {/*------------------responsive nav*/}
        </div>
        <NavbarMobile scrollEvent={scrollScreen}/>
        </>
    )
}
export default Navbar



// <div className='responsive_nav' id='res-nav-id'>
// <div className='responsive_nav_top'>
// {/*<Selectbox  value={Langs} class='accordion_select'  options={Langs}/>*/}
// {/* <Selectbox   value={Currency} class='accordion_select'  options={Currency}/> */}
// </div>
// <div className='responsive_nav_login'>
// {
// //     AppContext.app.isAuthorized?
// //    <>
// //     <Link   className='responsive_nav_login_log  ' >0 ₼ </Link> 
// //         <Link   className='responsive_nav_login_log' to='/notification'> <img alt='' src={require('../../assets/images/Not.svg')} /></Link>
// //     </>:null
// }
// </div>
// <MobileModal onClose={handleClick} show={show.show}>
//     <div className="main__category--tel">
//         <ul>  
//         {
           
//            Object.keys(CategoryContext.state.categories).map(x=>{
               
//                 return(  <li onclick={(e)=>{CategoryContext.event.getSubCat(e) }}  data-id={CategoryContext.state.categories[x].id}  className="category__items"    key={CategoryContext.state.categories[x].id}>{CategoryContext.state.categories[x].name} <span ><img  className="icon"   src={require(`../../assets/images/slider/Icon.svg`)} alt=""/></span>
//                 <div className="submenu">
//                             <ul key={x.id}>
//                              { 
//                                  CategoryContext.state.categories[x].children!==null?
//                                 CategoryContext.state.categories[x].children.map(y=>{
//                                   return  <Link to={`/search/filter[category_id]=${y.id}`}><li>{y.name}</li></Link>
//                                  })
//                                 :null
//                              }
//                             </ul>
//                     </div>
//                 </li>
//                 )
//             })
            
//         }
//         </ul>
//     </div>
//     {/* {categories.data.map(category=>{
//         return (<><br/><Link to={`/search/filter[category_id]=${category.id}`}>{category.name}</Link><br/></>)
//     })} */}
    
// </MobileModal>

// <div className='responsive_nav_login'>
// <div className='container'>
// <div className='row' style={{'justifyContent':'space-between'}}>
// <Link className='responsive_nav_login_log' to='/open-store'>Magaza Qeydiyyat</Link>
// <Link className='responsive_nav_login_log' to='/worked-delivery'>Kuryer Qeydiyyat</Link>                    
// </div>
//  <br/>
// <div className='row' style={{'justifyContent':'space-between'}}>
// <Link className='responsive_nav_login_log' onClick={()=>{document.getElementById('login__modal').style.display='block';}}>Qeydiyyat</Link>
// <Link className='responsive_nav_login_log' onClick={()=>{document.getElementById('login__modal').style.display='block';}}>Daxil Ol</Link>
// </div>
// </div>
// </div>

// <div className='responsive_nav_bottom'>
//         <Link className='responsive_nav_bottom_item' to="/profile">Profil <img alt='' src={require('../../assets/images/icons/arrowDown.png')} /> </Link>
//         <div onClick={handleClick} className='responsive_nav_bottom_item ' >Kateqoriyalar <img alt='' src={require('../../assets/images/icons/arrowDown.png')} /></div>
// </div>
// </div>