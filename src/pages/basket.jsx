import React,{useState,useEffect, useContext} from 'react'
import BasketCard from '../components/basket-card/basket_card.component'
import TotalSum from '../components/total_sum/tootal_sum.component'
import IconDeliverySafetyPayback from '../components/Icon-delivery-safety-payback/IconDeliverySafetyPayback.component'
import Button from '../components/button/button.component';
import {appContext} from '../contexts/appContext';
import { Link } from 'react-router-dom';
import GoBack from '../components/go-back/go-back.component'
import UrlGenerator from '../services/url-generator';



function Basket(props) {
     let AppContext=useContext(appContext);
    useEffect(() => {
        AppContext.events.mobileSideBarOFF();
        var acc = document.getElementsByClassName("accordion");
        var i;
        
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.height) {
              panel.style.height = null;
            } else {
              panel.style.height = panel.scrollHeight + "px";
            } 
          });
        };

    },[]);

    useEffect(()=>{
        console.log()
       let id=props.match.params.id;
       if(id!==undefined){
        let url=UrlGenerator('az',`products/${id}?include=seller`)
        let token=AppContext.events.getToken();
        if(token!==null){
            fetch(url,{
                headers:{
                    'Authorization':`${token.token_type} ${token.access_toen}`
                }
            })
            .then(async res=>{
                let data=await res.json();
                console.log(data.data)
                AppContext.events.setBasket([
                    ...AppContext.basket,
                    {...data.data[0],
                        count:1
                    }
                ])
            })
            .catch(err=>console.log(err))
        }else{
            document.getElementById('login__modal').style.display='block';
        }
       }
    },[])
    


    

            console.log(AppContext.basket)
    return (
        <section>
           <div className="container-fluid">
               <div className='row'>

                   <div className='col-lg-8 col-md-12 col-sm-12'>
                        <div>
                            {
                                AppContext.basket.length>0?
                                AppContext.basket.map((x)=>{
                                    return <BasketCard product={x} key={x.id} id={x.id} minus={AppContext.events.minus} plus={AppContext.events.plus}/>
                                }):
                                <div>
                                <GoBack link='/' text='Ana səhifəyə qayıt'/>
                                <p style={{'textAlign':"center"}}>
                                <h1 style={{'color':'red'}}>Səbət Boşdur</h1>
                                </p>
                                </div>
                            }
                        </div>
                   </div>
                   <div className='col-lg-4 col-md-12 col-sm-12'>
                    
                         <div className="row">
                             <div className="col-lg-12 col-md-12 col-sm-12">
                           
                                    <div className="row">
                                        <div className="col-lg-12 col-md-6 col-sm-12">
                                            <TotalSum class='card-border' amount="Məbləğ" delivery="Catdirilma" deliveryAmount={AppContext.total.totalDeliveryAmount} tax={AppContext.total.taxamount} total="Ümumi" totalPrice={AppContext.total.amount} totalCount={AppContext.total.totalAmount} />
                                        </div>
                                        <div className="col-lg-12 col-md-6 col-sm-12">
                                            <IconDeliverySafetyPayback />
                                        </div>
                                        <div className='col-lg-12 col-md-12 col-sm-12'>
                                        {
                                            AppContext.app.isAuthorized && AppContext.basket.length>0?
                                            <Link style={{'textDecoration':'none'}} to='/checkout'><Button className='bg-primary--light'>Sifaris ver</Button></Link>
                                             :AppContext.app.isAuthorized && AppContext.basket.length===0
                                               ?null
                                                :!AppContext.app.isAuthorized && AppContext.basket.length>0
                                                  ?<Button onClick={()=>{document.getElementById('login__modal').style.display='block';}} className='bg-primary--light'>Sifaris ver</Button>
                                                  :null

                                        }
                                    </div>
                                    </div>
                             <div className="col-lg-12 col-md-6 col-sm-12">
                                 
                             </div>
                         </div>
                         </div>
                    </div>
               </div>
               </div> 
        </section>
    )
}
// <Link onClick={()=>{
//     document.getElementById('login__modal').style.display='block';
//  }} style={{'textDecoration':'none'}}><Button className='bg-primary--light'>Sifaris ver</Button></Link>
export default Basket
