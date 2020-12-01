import React, { useEffect, useContext,useState } from 'react'
import Card from '../components/card/card.component'
import Seller from '../components/seller/seller.component'
import UrlGenerator from '../services/url-generator'
import {appContext} from '../contexts/appContext'

function FavoritBrandShops() {
  let AppContext=useContext(appContext)
  const [likedShops, setLikedShops] = useState([])
  useEffect(()=>{
    let url=UrlGenerator('az','users/getLikedElements/2');
    let token=AppContext.events.getToken();
    fetch(url,{
      headers:{
        'Authorization':`${token.token_type} ${token.access_token}`
      }
    }).then(async res=>{
      let data=await res.json();
      if(res.ok){
        setLikedShops([...data.data])
        console.log(data.data);
      }
    })

  },[])
 return (
   <>
{/*   <div className='row'>
    <Card>
     <Card.Header name='Brendler'/>
     <IconSlider/>
    </Card>
 </div>*/}
    <Card className='padding-zero'>
    <Card.Header name='Magaza ve Saticilar'/>
     <div className='row'>
     {
       likedShops.map((x,i)=>{
         return(
          <div key={i} className='col-lg-6'>
          <Seller seller={x}/>
          </div>
         )
       })
     }
     </div>
    </Card>
  </>
 )
}

export default FavoritBrandShops
