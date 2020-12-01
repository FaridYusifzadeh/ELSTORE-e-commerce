import React, {useEffect, useState, useContext } from 'react';
import GoBack from '../components/go-back/go-back.component'
import  MehsulCard from '../components/mehsulCard/mehsul_card.component'
import {appContext} from '../contexts/appContext'
import Category from '../components/Category/Category.component'
import './campaign.scss'
import UrlGenerator from '../services/url-generator';
import {Link} from 'react-router-dom';





function Campaign(){
//     const AppContext=useContext(appContext)
    
const data=[1,2,3]
const [state, setstate] = useState([])
const AppContext=useContext(appContext);

useEffect(()=>{
    AppContext.events.mobileSideBarOFF()
  })
useEffect(()=>{
  let url=UrlGenerator('az','stores');
  fetch(url)
  .then(async res=>{
    let data=await res.json();
    console.log(data)
    setstate(data.data)
    console.log(data)
  }).catch(err=>console.log(err))

},[])
return (
    <div >

    <div className = "container-fluid">
    <div className='row'>
    <div className="row-left">
    <div className="redirect">
    <GoBack link='/' text='ƏSAS SƏHİFƏYƏ GERİ DÖN' />
    <div className="text">
    <h1>Kampaniyalar</h1>
    <br />
    </div>
    </div>
    </div>
    </div>
        <div className='row'>
    
        {
            state.map((x,i)=>{
                return(
                    <div key={i} className='col-lg-6 col-md-12 '>
                    
                <div className="e-card">
                <img className="bg-card-img" alt='' src={x.cover_image}/>
                    <div className="e-card-overlay">
                        <p className="e-card-head">{x.name}</p>
                        <div className="e-card-info">
                            <img alt='' className="e-card-info-name" src={x.logo} />
                            <p className='e-card-info-text'>{x.name}</p>
                            <div>
                                <Link to={`/company/${x.id}/${x.name}/discount`} className='e-card-go'>Məhsullara bax <img alt='' src={require('../assets/images/icons/right.svg')} /></Link>
                            </div>
                        </div>
                    </div>
                    
                </div>



            </div>
            

            
                )                       
            })
        }

          
        </div>
        </div>
    </div>
);
}


// return(
//     <React.Fragment>
   

//     <div className='container-fluid'>
//                 <div className='row'> 
                
                

                  

//                     <div className=' col-12 col-lg-12 col-md-12 col-xs-12'>

//                     <MehsulCard />
                
                    
//                     </div>
                  
                    
                    
                    
//                 </div>
//         </div>

//     </React.Fragment>
// )}

export default Campaign;