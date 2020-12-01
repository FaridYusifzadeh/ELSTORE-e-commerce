import React, { useEffect, useState, useContext } from 'react'
import UrlGenerator from '../services/url-generator'
import {appContext} from '../contexts/appContext'
import SearchResult from '../components/search-result-component/SearchResultComp.component'

function UserLikedProduct() {
 const [likedProducts, setLikedProducts] = useState([])
 let AppContext=useContext(appContext)
 useEffect(()=>{
  let url=UrlGenerator('az','users/getLikedElements/1');
  let token=AppContext.events.getToken();
  fetch(url,{
   headers:{
    'Authorization':`${token.token_type} ${token.access_token}`
  }
  }).then(async res=>{
   let data=await res.json();
   if(res.ok){
    setLikedProducts([...data.data])
   }
   
 })
},[])

 return (
   <SearchResult  catFilter={likedProducts}/>
 )
}

export default UserLikedProduct
