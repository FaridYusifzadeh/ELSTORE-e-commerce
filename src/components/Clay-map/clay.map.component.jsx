import React,{useEffect, useState} from 'react';
import  '../../App.scss';
import './clay.style.scss'
import {Link} from 'react-router-dom';
import UrlGenerator from '../../services/url-generator';


function Clay(){
const data=[1]
const [state, setstate] = useState([])
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
  return(
    <div className='row'>

    {
        state.map((x,i)=>{
            return(
                <div key={i} className='col-lg-4 col-md-6 col-sm-6 col-12'>
                   <div className="card">
                <img className='bg-card-img' alt='' src={x.cover_image}/>
                    <div className="card-overlay">
                    <div className="card-info">
                    <img alt='' src={x.logo} className="card-info-name"  />
                      <h1 className='card-info-text'>{x.name}</h1>
                        <p className='card-head'>{x.description}</p>
                        <div className='card-link'>
                            <Link to={`/company/${x.id}/${x.name}`} className='card-go'>Məhsullara bax <img alt='' src={require('../../assets/images/icons/right.svg')} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )                       
        })
    }

      
    </div>
);
}
  

export default Clay;
