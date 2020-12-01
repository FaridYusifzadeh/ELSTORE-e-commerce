import React,{useEffect} from 'react'
import UrlGenerator from '../services/url-generator.js'
import { useHistory } from 'react-router-dom';

function Verify(props) {
  let History=useHistory() 
 useEffect(()=>{
   let url=UrlGenerator('az',`auth/verify/${props.match.params.token}`);
   fetch(url)
   .then(async respons=>{
    let data=await respons.json()
    console.log(data)
    if(respons.ok){
       History.push('/');
    }
   })
   .catch(error=>{console.log(error)})
 },[])
 return (
  <div>
      <h1></h1>
  </div>
 )
}

export default Verify
