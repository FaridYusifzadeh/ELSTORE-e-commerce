import React,{useState,useEffect, useContext} from 'react'
import axios from "axios"
import UrlGenerator from '../services/url-generator';
import {appContext} from './appContext';

const searchContext=React.createContext({});



function SearchContext({children}){
  const AppContext=useContext(appContext)
  const [catFilter, setCatFilter] = useState({
    data:[],
    meta:{}
})

// const [currenOrder, setcurrenOrder] = useState({
//   data:[],
//   meta:{}
// })
  
   const [state,setState] = useState({
    'searchKey':"",
    "data":[] ,
    "filteredData":[]
  })

  const [filter, setFilter] = useState({
    priceFrom:'',
    queryParams:[],
    priceTo:'',
    order:''
  })

useEffect(() => {
  let url=UrlGenerator('az','products?include=seller,images')
  axios.get(url)
  .then(res => {
       setState({data: res.data.data});
  })
}, []);


    const filterCategory =(e)=>{
      let url=UrlGenerator('az',`search/product?filter[category_id]=${e.target.value}`)
      console.log("fitercategory",e.target.value)
    setState({
      filterCat : Number(e.target.value)
    });
    axios.get(url)
    .then(res => {
        setState({ filteredData: res.data.data});
        console.log(res.data.data)
    })
  }

    const PagenationHandling=(e,prop)=>{

      let filterQuery='';
      let sellerId='';
      let pageUrl=document.location.pathname;
      
    if(pageUrl.includes('company')){
        sellerId=Object.keys(prop.match.params).length!==0
        ?prop.match.params.id:null;
        filterQuery+=filterQuery!==''?`&filter[company_id]=${sellerId}`:`filter[company_id]=${sellerId}`
    }
    if(pageUrl.includes('profile')){
        sellerId=AppContext.app.user.id;
        filterQuery+=filterQuery!==''?`&filter[company_id]=${sellerId}`:`filter[company_id]=${sellerId}`
    }
    if(filter.queryParams.length>0){
        filterQuery+=filterQuery!==''?`&filter[category_id]=`:`filter[category_id]=`
        filter.queryParams.forEach((x,k)=>{
           console.log(k)
           k===filter.queryParams.length-1
           ?filterQuery+=`${x}`
           :filterQuery+=`${x},`
       })
    }
    if(filter.order!==''){
        filterQuery+=filterQuery!==''?`&filter[order]=${filter.order}`:`filter[order]=${filter.order}`
    }
    if(filter.priceFrom!=''){
      filterQuery+=filterQuery!==''?`&filter[min_prize]=${filter.priceFrom}`:`filter[min_prize]=${filter.priceFrom}`
    }
    if(filter.priceTo!=''){
        filterQuery+=filterQuery!==''?`&filter[max_price]=${filter.priceTo}`:`filter[max_price]=${filter.priceTo}`
    }


    let url=`${catFilter.meta.path}?${filterQuery}&page=${e.target.innerHTML}`
    fetch(url,{
        method:"GET",
    })
    .then(async res=>{
      let data=await res.json();
     if(res.ok){
         setCatFilter({
           data:data.data,
           meta:data.meta
         })
        
     }
    })
    .catch(
        (err) =>console.log(err)
    )
     
    } 


    const PagenationHandling1=(e)=>{
      let url=UrlGenerator('az',`users/buyer/orders/0`)
 fetch(url,{
     method:"GET",
 })
 .then(async res=>{
   let data=await res.json();
  if(res.ok){
    setCatFilter({
        data:data.data,
        meta:data.meta
      })
     
  }
 })
 .catch(
     (err) =>console.log(err)
 )
  
 } 

   const searchForm=(e)=>{
    //  e.preventDefault();
    //  e.stopPropagation()
    var search =  e.target.value;
     setState((prevState)=>({
        ...prevState,
        searchKey:search,
        value:search
     }))
 }

  
    return (
     <searchContext.Provider value={{
         state:state,
         catFilter:catFilter,
         filter:filter,
         events:{
           setCatFilter:setCatFilter,
           setFilter:setFilter,
           searchForm:searchForm,
           filterCategory:filterCategory,
           setState:setState,
           PagenationHandling:PagenationHandling,
           PagenationHandling1:PagenationHandling1
         }
         }}>
       {children}
     </searchContext.Provider>
  )
   }
 
  
  export default SearchContext
  export {searchContext}
  


  