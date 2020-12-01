import React, { useContext, useEffect,useState } from 'react'
import './checkout_third.scss';
import Badge from '../step-badge/badge.component'
import Card from '../card/card.component'
import {Link, useHistory} from 'react-router-dom';
import swal from "sweetalert"
import {appContext} from '../../contexts/appContext';
import UrlGenerator from '../../services/url-generator';
import Button from '../button/button.component';
import {key} from '../../config/enviroment/map-config'


function CheckoutThird(props) {

    const AppContext=useContext(appContext);
    const History=useHistory();
     const [state,setState]=useState({
         city:'',
         region:'',
         village:''
     })
    

    useEffect(()=>{
        let c_id=AppContext.total.user.city_id;
        let c_url=UrlGenerator('az',`cities/${c_id}`);
        let c=''
        let r=''
        let v=''
        fetch(c_url)
        .then(async res=>{
            let data=await res.json();
            c=data.data[0].name
        })
        .catch(err=>console.log(err))

        let r_id=AppContext.total.user.region_id;
        let r_url=UrlGenerator('az',`regions/${r_id}`);
        fetch(r_url)
        .then(async res=>{
            let data=await res.json();
            r=data.data[0].name
        })
        .catch(err=>console.log(err))

        let v_id=AppContext.total.user.village_id;
        let v_url=UrlGenerator('az',`villages/${v_id}`);
          
        
        fetch(v_url)
        .then(async res=>{
            let data=await res.json();
            v=data.data[0].name
            setState({
                city:c,
                region:r,
                village:v
            })
        })
        .catch(err=>console.log(err))
    },[])

    function order(){

        let products=AppContext.basket.map(x=>{
            return {id:x.id,count:x.count,product_price:x.price}
        })

        var DeliveryPrice='';
           let Locations=AppContext.basket.map(x=>[x.seller.address.lng,x.seller.address.lat])
           Locations.unshift([AppContext.total.user.lng,AppContext.total.user.lat]) 
        let tt=window.tt;
        tt.services.calculateRoute({
            key:key,
            locations: Locations,
            computeBestOrder:true
          })
            .go()
            .then(function(routeData) {
                let RoutData = routeData.toGeoJson();
                  DeliveryPrice = (RoutData.features[0].properties.summary.lengthInMeters / 1000) * 1;


                  let order={
                    name:AppContext.total.user.name,
                    surname:AppContext.total.user.surname,
                    email:AppContext.total.user.email,
                    payment_type:AppContext.total.user.payment_type,
                    amount:AppContext.total.amount,
                    edv:18,
                    delivery_price:DeliveryPrice,
                    total_price:AppContext.total.totalAmount,
                    city_id:AppContext.total.user.city_id,
                    region_id:AppContext.total.user.region_id,
                    village_id:AppContext.total.user.village_id,
                    address:AppContext.total.user.address,
                    lat:AppContext.total.user.lat,
                    lng:AppContext.total.user.lng,
                    note:AppContext.total.user.note,
                    products:[
                    ]
                };
        
        
                order.products=JSON.stringify(products);
                let data = JSON.stringify(order);
                console.log(data)
                let url=UrlGenerator('az','checkout');
                let token=AppContext.events.getToken();
                fetch(url,{
                    method:'Post',
                    body:data,
                    headers:{
                        'Authorization':`${token.token_type} ${token.access_token}`,
                        'Content-Type':'application/json'
                    }
                })
                .then(async res=>{
                    let data=await res.json();
                    if(res.ok){
                        AppContext.events.setTotal({
                           ...AppContext.total,
                           checkout:{
                             id:data.data.checkout_code,
                             date:data.data.created_at
                           }       
                        });
                        History.push('/order-check')
                        swal( "","Sifarişiniz qeydə alındı", "success");
                    }else{
                        if(data.message=='These credentials do not match our records.'){
                            document.getElementById('login__modal').style.display='block';
                        }else{
                            swal( "Təəssüf!",`${data.error}`, "error");
                        }
                        
                    }
                })
                .catch(err=>console.log(err))
              
            });

    }

    
  
    return (
        
        <>
        <Link className='goBasket' to='/basket' ><img alt='' src={require('../../assets/images/icons/next-icon.svg')} /> səbətə gerİ dön</Link>
            <br/>
            <h2  className='complateordertxt'>Sifarişi tamamla</h2>
            <br/>
            <br/>

             <div className='checkout_header'>
            <Badge class='badge badge-done' icon={require('../../assets/images/icons/box white.svg')} name='Catdirilma'/>
            <div className='badge_href' />
            <Badge class='badge badge-done' icon={require('../../assets/images/icons/Payment white.svg')} name='Ödəniş'/>
            <div className='badge_href' />
            <Badge class='badge badge-active' icon={require('../../assets/images/icons/Verify.svg')} name='Sifariş et'/>
            </div>

            <br/>

            <Card>
           <div className='card_head_flex'>
            <div><Card.Header name='Çatdırılma ünvanı' /></div>
            <div>
                <button onClick={props.prevStep} id="edited_checkout">Düzəlİş at</button>
                
            </div>

           </div>
            
            <br/>
                <div className='row'>
                    <div className='col-sm-12 col-lg-6'>
                        <p className='latest_section_checkout_p'>{`Ad : ${AppContext.total.user.name}`}</p>
                        <p className='latest_section_checkout_p'>{`Soyad : ${AppContext.total.user.surname}`}</p>
                        <p className='latest_section_checkout_p'>{`Telefon : ${AppContext.total.user.phone}`}</p>
                        <p className='latest_section_checkout_p'>{`Email : ${AppContext.total.user.email}`}</p>
                    </div>
                    <div className='col-lg-6 col-sm-12'>
{/*                        <p className='latest_section_checkout_p'>{state.city}</p>
                        <p className='latest_section_checkout_p'>{state.region}</p>
    <p className='latest_section_checkout_p'>{state.village}</p>*/}
                        <p className='latest_section_checkout_p'>{`Adres : ${AppContext.total.user.address}`}</p>
                        <p className='latest_section_checkout_p'>{AppContext.total.user.region}</p>
                    </div>
                </div>
                <p className='checkout_bottomcardtext'>
                <Card.Header name='Elave Melumatlar' />
                {AppContext.total.user.note}
                </p>
            </Card>
            <br/>
            <br/>
            <Button className='form_button_multiple bg-primary' onClick={order} name='SİFARİŞ ET'/>
       </>
    )
}

export default CheckoutThird
