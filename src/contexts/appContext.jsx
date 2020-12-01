import React,{createContext,useState,useEffect} from 'react'
import UrlGenerator from '../services/url-generator';
import swal from "sweetalert";
const appContext=createContext();

function AppContextProvider(props) {
 const [app,setApp]=useState({
  token:{},
  user:{},
  isAuthorized:false,
  lang:'en',
  currency:'aze',
 })

 const [toggle, setToggle] = useState({
  active: false,
  scrActive:false
  });


 const [basket,setBasket]=useState([]);
 const [total,setTotal]=useState({
    amount:'',
    totalAmount:'',
    totalDeliveryAmount:'',
    taxamount:18,
    checkout:{
      id:'',
      date:''
    },
    user:{
      name:'',
      surname:'',
      email:'',
      phone:'',
      address:'',
      lat:'',
      lng:'',
      note:'',
      payment_type:0,
      edv:'',
      city_id:'',
      region_id:'',
      village_id:''
    }
 })
 const [logoutState,setLogOutState]=useState({})

 function minus(e){
  let totalPrice=0;
  // let totalDelivery=0;
  var id=e.target.getAttribute('data-id');
  let currentBasket=basket.map(x=>{   
      if(x.id==id&& x.count>1){
          x.count--;
      }
      x.discount_price!==0
      ?totalPrice+=(x.discount_price*x.count)
      :totalPrice+=(x.price*x.count);
      //  totalDelivery+=x.delivery_price;
      return x          
  });
   setTotal({
       ...total,
           amount:totalPrice.toFixed(2)
   });
   setBasket([...currentBasket])
  }

  function plus(e){
    let totalPrice=0;
    var id=e.target.getAttribute('data-id');
    let currentBasket=basket.map(x=>{
        if(x.id==id){
            x.count++;
        }
        x.discount_price!==0
        ?totalPrice+=(x.discount_price*x.count)
        :totalPrice+=(x.price*x.count);
        //totalDelivery+=x.deliveryPrice;
        return x
        
    });
     setTotal({
         ...total,
             amount:totalPrice.toFixed(2)
     });
     
     setBasket([...currentBasket])
    }

    
   function checkBasket(id){
     let current=basket.find(x=>x.id==id);
     if(current!==undefined){
       return true
     }
     return false
   }

  function addBasket(e){
    let id=e.target.getAttribute('data');
    let baskets=[];
    if(checkBasket(id)){
      let newBasket=basket;
      newBasket.forEach(x=>{
        if(x.id==id){
          x.console++
        }
      });
      setBasket([...newBasket])
      baskets=[...newBasket];
      window.localStorage.setItem('basket',JSON.stringify(baskets))
    }else{
    let url=UrlGenerator('az','products')
    fetch(`${url}/${id}?include=seller`)
    .then(async res=>{
      let data=await res.json()
      if(res.ok){
        
        setBasket([
          ...basket,
          {...data.data[0],
           count:1
          }
        ])
        baskets=[
          ...basket,
          {...data.data[0],
            count:1
           }
         ];
        window.localStorage.setItem('basket',JSON.stringify(baskets))
      
         swal({
              title: 'Əməliyyat yerinə yetirildi!',
              text: 'Məhsul səbətə əlavə olundu',
              icon: 'success',
              button: 'Ok',
              confirmButtonColor: '#8CD4F5',
            });
      }
      else{
        swal("Təəssüflər", `${data.error}`, "error");
      }
    })
    .catch(err=>console.log(err))
    }
  }

   function getBaskets() {
     let baskets=JSON.parse(window.localStorage.getItem('basket'))
     return baskets;
   }
  function removeFromBasket(e){
    let id=e.target.getAttribute('data-id');
    let bask=basket.filter(x=>x.id!=id)
    setBasket([
        ...bask
    ])

    window.localStorage.setItem('basket',JSON.stringify(bask))
}

  function getCities(){
    let url=UrlGenerator('az','cities');
    fetch(url)
    .then(response => response.json())
    .then(data =>{
      return data;

    });
  }

  function getRegions(e){
    let url=UrlGenerator('az',`regions?city_id=${e.target.value}`)
    console.log(e.target.value);
  fetch(url)
  .then(response => response.json())
  .then(data =>{
    return data;
  });
}

function getUserCredentials() {
  let user=JSON.parse(window.localStorage.getItem('user'))
  console.log(user)
  return user
}

useEffect(()=>{
  let currentUser=getUserCredentials();
  console.log("appUser",currentUser)
  if(currentUser){
    let currentTotal=total;
    currentTotal.user.name = app.user.name;
    currentTotal.user.surname = app.user.surname;
    currentTotal.user.email = app.user.email;
    currentTotal.user.phone = app.user.phones&&app.user.phones['phone'];
    setTotal({
      ...currentTotal
    })
  }
},[app]);

 useEffect(()=>{
   let curBasket=getBaskets();
   console.log(curBasket)
   
   setApp({
     ...app,
     token:getToken(),
     isAuthorized:IsAuthorized(),
     user:getUserCredentials()
    })

    if(curBasket!==null)
       setBasket([...curBasket])
 },[]);

 useEffect(()=>{
   let deliveryAmount=0;
   let tp=0;
   let countEdv=0;
   let totalAmountAll=0;

   basket.forEach(x=>{
    deliveryAmount+=x.delivery_price;
    x.discount_price!==0
    ?tp+=(x.discount_price*x.count)
    :tp+=(x.price*x.count)
   })
     countEdv=((deliveryAmount+tp)*18/100);
    totalAmountAll=(deliveryAmount+tp)+countEdv;
   setTotal({
     ...total,
     amount:tp.toFixed(2),
     totalDeliveryAmount:deliveryAmount,
     totalAmount:totalAmountAll.toFixed(2)
   })
  
},[basket]);

  function setlogoutInterval(){
   let logoutTimeOut= setTimeout(() => {
      logout()
    }, 30000);
    setLogOutState(logoutTimeOut)
  }

 function AddToken(token){
    window.localStorage.setItem('token',JSON.stringify({token_type:token.token_type,access_token:token.access_token}))
    let url=UrlGenerator('az','auth/me');
    fetch(url,{
      method:'Post',
      headers:{
        'Authorization':`${token.token_type} ${token.access_token}`
      }
    }).then(async res=>{
      let data=await res.json();
      if(res.ok){
        window.localStorage.setItem('user',JSON.stringify(data));
        setApp({
          ...app,
          token:token,
          isAuthorized:true,
          user:data
        })
      }
    }).catch(err=>console.log(err))
    setlogoutInterval();
 }

 function getToken(){
   let token=JSON.parse(window.localStorage.getItem('token'))
   return token;
 }
   
 function logout() {
     localStorage.removeItem('token');
     localStorage.removeItem('user')
     setApp({
       ...app,
       token:{},
       isAuthorized:false,
       user:''
     })
     clearTimeout(logoutState)
   }
 function IsAuthorized(){
   let token=JSON.parse(window.localStorage.getItem('token'))
   if(token!==null){
     return true
   }
   return false
 }
 function mobileSideBarOFF(){
  let x=document.getElementsByTagName('body')[0].classList.contains('of-hidden');
  if(x){
      document.getElementsByClassName('menu-container')[0].classList.toggle('change');
      document.getElementById('res-nav-id').classList.toggle('opennav');
      document.getElementsByTagName('body')[0].classList.toggle('of-hidden');
  }
 }

 return (
  <appContext.Provider value={{app,
                              events:{
                                setTotal:setTotal,
                                setBasket:setBasket,
                                setToggle:setToggle,
                               AddToken:AddToken,
                               IsAuthorized:IsAuthorized,
                               getCities:getCities,
                               getRegions:getRegions,
                               getToken:getToken,
                               getUserCredentials:getUserCredentials,
                               logout:logout,
                               addBasket:addBasket,
                               removeFromBasket:removeFromBasket,
                               minus:minus,
                               plus:plus,
                               mobileSideBarOFF:mobileSideBarOFF
                              },
                              basket,
                              total,
                              toggle:toggle
                             }}>
   {props.children}
  </appContext.Provider>
 )
}

export default React.memo(AppContextProvider);
export {appContext};