import React,{useState,useEffect} from 'react'
import axios from "axios"
import UrlGenerator from '../services/url-generator';
const categoryContext=React.createContext({});
const categoryContextConsumer=categoryContext.Consumer



function CategoryContext(props){
    
    const [categories,setCategories]=useState([]);
    
    const [childrens,setChildrens]=useState([]);


    function getSubCat(e){
        let children=[];
        let id=e.target.getAttribute('data-id');
        console.log(id)
        categories.forEach(x=>{
            if(x.id==id && x.children!=null ){
                children= x.children
                
            }});
            setChildrens({children});
            
    }

    console.log(childrens)
  let url=UrlGenerator('az','categories')
   useEffect(()=>{
    axios({
        method:'GET',
        url:url,

    }).then(res=>{
        console.log(res.data.data)
        setCategories(res.data.data);
    }).catch(err=>{console.log(err)})
   },[])

      
    return (
     <categoryContext.Provider value={{
         state:{
            categories:categories,
            childrens:childrens,
         },
         event:{
            getSubCat:getSubCat
         }
         }}>
       {props.children}
     </categoryContext.Provider>
  )
   }
  
  export default CategoryContext
  export {categoryContext}
  


  