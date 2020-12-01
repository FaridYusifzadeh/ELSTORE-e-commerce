import React,{useState,useEffect} from 'react';
import axios from "axios";
import UrlGenerator from '../services/url-generator';
const chipsContext=React.createContext({});

function ChipsContext(props){
    
    const [chips,setChips]=useState([]);
    
    const url =UrlGenerator('az','products');

    useEffect(()=>{
     axios({
         method:'GET',
         url:url,
 
     }).then(res=>{
      setChips(res.data.data);
      console.log(res.data.data)
     })
    },[])
      
    return (
     <ChipsContext.Provider value={{
         state:{
          chips:chips
         }
         
         }}>
       {props.children}
     </ChipsContext.Provider>
  )
   }
  
  export default ChipsContext
  export {chipsContext}
  


  