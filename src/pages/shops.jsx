import React,{useContext, useEffect, useState} from 'react'
import GoBack from '../components/go-back/go-back.component'
import Seller from '../components/seller/seller.component.js'
import {appContext} from '../contexts/appContext'
import Category from '../components/Category/Category.component'
import './shops.scss'
import UrlGenerator from '../services/url-generator'
import Pagination from '../components/Pagination/pagination.component'




function Shops(){
    const AppContext=useContext(appContext)

    const [shops, setShops] = useState({
        data:[],
        meta:{}
    });

    let paginationHandling = (e)=>{
       
        let url=`${shops.meta.path}?page=${e.target.innerHTML}`
        fetch(url,{
            method:"GET",
        })
        .then(async res=>{
          let data=await res.json();
         if(res.ok){
             setShops({
               data:data.data,
               meta:data.meta
             })
            
         }
        })
        .catch(
            (err) =>console.log(err)
        )
    }

    useEffect(()=>{
        AppContext.events.mobileSideBarOFF()
      })
      
    useEffect(()=>{
     let url=UrlGenerator('az','getAllStores');
     fetch(url)
     .then(async res=>{
         let data=await res.json();
         if(res.ok){
             setShops({
                 data:[...data.data],
                 meta:data.meta
             })
         }
     })
    },[])
   
  

return(
    <React.Fragment>
   
    <div className="redirect">
    <GoBack link='/' text='ƏSAS SƏHİFƏYƏ GERİ DÖN' />
    <div className="text">
    <h1>Mağazalar</h1>
    <br />
    </div>
    </div>
    <div className='container-fluid'>
                <div className='row'> 
                    <div className=' col-12 col-lg-3 col-md-4 col-xs-12'>
                    <Category/>
                    </div>
                    <div className=' col-12 col-lg-9 col-md-8 col-xs-12'>
                    <div className='row'>
                    {
                        shops.data.map((x,i)=>{
                            return  <div key={i} className='col-lg-6'>
                                    <Seller seller={x}/>
                                    <br/>
                                    </div>
                        })
                    }
                    </div>
                    <Pagination meta={shops.meta} paginationHandling={paginationHandling}  />
                    </div>
                </div>
        </div>
    </React.Fragment>
)}

export default Shops;