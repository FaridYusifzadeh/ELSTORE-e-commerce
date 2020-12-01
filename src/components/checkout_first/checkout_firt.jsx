import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import './checkout_first.style.scss';
import Badge from '../step-badge/badge.component'
import Card from '../card/card.component'
import InputGroup from "../InputGroup/InputGroup.component";
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import Selectbox from '../Select-box/SelectBox.component'
import {appContext} from '../../contexts/appContext'
import UrlGenerator from '../../services/url-generator'
import TextArea from '../textarea/textarea'
import Button from '../button/button.component';
import TTAutoInput from '../tomtom-autocomplete-input/tt-autocomplete-input'

function CheckoutFrist(props) {
    const AppContext=useContext(appContext)
    
    const {register,handleSubmit,errors}=useForm();

    const [write,setWrite]=useState({})

    

    const {values,handleChange} = props
    const [cities,setCities] = useState({
        data:[]
    })
    const [region,setRegion] = useState({
        data:[]
    })
    const [village,setVillage] = useState({
        data:[]
    })


    // const sherler = ['Baku','Ganja','Mingechevir']

    // const rayonlar = ['Sirvan','Ucar','Kurdamir']
    // const kend = ['Bilge','Kurdakhani','Mastaga']


    useEffect(() => {
            let url=UrlGenerator('az','cities');
            fetch(url)
            .then(response => response.json())
            .then(data =>{
              setCities({data:data})
            });

            
    }, [])

    function getRegions(e){
        let url=UrlGenerator('az',`regions?city_id=${e.target.value}`);
      fetch(url)
      .then(response => response.json())
      .then(data =>{
       setRegion({data:data})
      });

      AppContext.events.setTotal({
          ...AppContext.total,
          user:{
              ...AppContext.total.user,
              city_id:e.target.value
          }
      })
    }
   
    useEffect(() => {
        let url=UrlGenerator('az',`auth/me`)
        let token=AppContext.events.getToken();
       fetch(url,{
           headers:{
            "Authorization":token!==null?`${token.token_type} ${token.access_token}`:null,
           },
           method:"POST",
       })
       .then(async res=>{
        if(res.ok){
            let data1=await res.json();
            setWrite({
                ...data1
            })
        }
       })
       .catch(
           (err) =>console.log(err)
       )
    }, []);
   
    

    function goNextPage(e){
        let input__checks = document.getElementById("input__checks");
        let input__checks2 = document.getElementById("input__checks2");
        let input__checks3 = document.getElementById("input__checks3");
        let input__checks4 = document.getElementById("input__checks4");
        let input__checks5 = document.getElementById("input__checks5");

        if(input__checks.value.length>0 && input__checks2.value.length>0 && input__checks3.value.length>0 && input__checks4.value.length && input__checks5.value.length  ){
            e.preventDefault();
            props.nextStep();
        }
    };
    function nameEventHandler(e){
      AppContext.events.setTotal({
        ...AppContext.total,
        
        user:{
            ...AppContext.total.user,
            name:e.target.value
        } 
        
      })
      setWrite({
          ...write,
          name:e.target.value
      })
    }
    
    function phonenameEventHandler(e){
        AppContext.events.setTotal({
            ...AppContext.total,

            user:{
                ...AppContext.total.user,
                phone:e.target.value
            } 

          })
          setWrite({
            ...write,
            phones:e.target.value
        })
    }

    function emailEventHandler(e){
        AppContext.events.setTotal({
            ...AppContext.total,
            user:{
                ...AppContext.total.user,
                email:e.target.value
            } 
          })
          setWrite({
            ...write,
            email:e.target.value
        })
    }

    function surnameEventHandler(e){
        AppContext.events.setTotal({
            ...AppContext.total,
            user:{
                ...AppContext.total.user,
                surname:e.target.value
            } 
          })
          setWrite({
            ...write,
            surname:e.target.value
        })
    }

    function regionEventHandler(e){
        let url=UrlGenerator('az',`villages?region_id=${e.target.value}`);
        fetch(url)
        .then(response => response.json())
        .then(data =>{
         setVillage({data:data})
        });

        AppContext.events.setTotal({
            ...AppContext.total,
            user:{
                ...AppContext.total.user,
                region_id:e.target.value
            } 
          })    
    }
    function villageEventHandler(e) {
        AppContext.events.setTotal({
            ...AppContext.total,
            user:{
                ...AppContext.total.user,
                village_id:e.target.value
            } 
          })
    }

    function addressEventHandler(e) {
        AppContext.events.setTotal({
            ...AppContext.total,
            user:{
                ...AppContext.total.user,
                address:e.target.value
            } 
          })
    }

    const getPosition = (name, position) => {
        console.log("position",position)
        AppContext.events.setTotal({
            ...AppContext.total,
            user:{
                ...AppContext.total.user,
                address:name,
                lat:position.lat,
                lng:position.lon
            } 
          })
      }

    function secoundAddres(e) {
        AppContext.events.setTotal({
            ...AppContext.total,
            user:{
                ...AppContext.total.user,
                note:e.target.value
            } 
          })
    }
     console.log("total",AppContext.total)
    return (
        
        <>
            <Link className='goBasket' to='/basket' ><img src={require('../../assets/images/icons/next-icon.svg')} /> səbətə gerİ dön</Link>
            <br/>
            <h2 className='complateordertxt'>Sifarişi tamamla</h2>
            <br/>
            <br/>
            <div className='checkout_header'>
            <Badge class='badge badge-active' icon={require('../../assets/images/icons/Box.svg')} name='Catdirilma'/>
            <div className='badge_href' />
            <Badge class='badge ' icon={require('../../assets/images/icons/Payment.svg')} name='Ödəniş'/>
            <div className='badge_href' />
            <Badge class='badge ' icon={require('../../assets/images/icons/Verify.svg')} name='Sifariş et'/>
            </div>
            <br/>
            <Card>
            <Card.Header name='Əlaqə Melumatları' />
            <br/>
                <div className='row'>
                    <div className='col-sm-12 col-lg-6'>
                   
                        <InputGroup id="input__checks" value={AppContext.total.user.name} onChange={(e)=>{nameEventHandler(e)}} placeholder='Adınız'
                        register={register({
                            required:{value:true,message:'Adinizi daxil etməlisiniz'},
                            maxLength:{value:255,message:'maksimum  255 simvol qeyd oluna bilər'}
                        })} helper={errors.name&&errors.name.message} 
                        />
                        <br/>
                         <InputGroup id="input__checks2" value={AppContext.total.user.phone&&AppContext.total.user.phone} onChange={(e)=>phonenameEventHandler(e)} formIcon={require('../../assets/images/icons/Frame.svg')} type='number' name='phones[phone]' placeholder='Telefon nömrəsi'
                         register={register({
                            required:{value:true,message:'Soyadınızı daxil etməlisiniz'},
                            maxLength:{value:255,message:'maksimum  255 simvol qeyd oluna bilər'}
                        })} helper={errors.surname&&errors.surname.message} />
                        <br/>
                         <InputGroup id="input__checks3" value={AppContext.total.user.email} onChange={(e)=>emailEventHandler(e)} formIcon={require('../../assets/images/icons/Frame.svg')} type='email' placeholder='E-poçt adresi'
                         register={register({
                            required:{value:true,message:'Email daxil etməlisiniz'},
                           pattern:{value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message:"email düzgün deyil"}
                         })}
                          helper={errors.email&&errors.email.message} />
                       
                    </div>
                    <div className='col-lg-6 col-sm-12'>
                        <InputGroup id="input__checks4" value={AppContext.total.user.surname} onChange={(e)=>surnameEventHandler(e)} cls='surname' placeholder='Soyadınız' />
                    </div>
                </div>
            </Card>
            <br/>
            <Card>
            <Card.Header name='Çatdırılma ünvanı' />
                <div className='row'>
                    <div className='col-sm-12 col-lg-6'>
                    <TTAutoInput
                    id="input__checks5"
                    name="location_name"
                    getPosition={getPosition}
                    validation={register({
                      required: {
                        value: true,
                        message: 'adres daxil etməlisiniz',
                      }
                    })}
                    helper={errors.address && errors.address.message}
                  />
                      <Selectbox firstopt='Şəhərlər' handleChange={getRegions} class='selectboxcheckout' options={cities.data.data} />
                        <br/>
                        <Selectbox handleChange={regionEventHandler} firstopt='Region' class='selectboxcheckout' options={region.data.data} />
                        <br/>
                        <Selectbox handleChange={villageEventHandler}  class='selectboxcheckout' options={village.data.data} />
                        <br/>
                        <br/>
                        <InputGroup id="input__checks5" value={AppContext.app.user&&AppContext.app.user.address} onChange={(e)=>{addressEventHandler(e)}}  placeholder='Ünvan' />
                    </div>
                    <div className='col-lg-6 col-sm-12'></div>
                </div>
                <p className='checkout_bottomcardtext'>
                    <h5>Əlavə məlumat (istəyə görə)</h5>
                    Zəhmət olmasa, ünvanı rahat tapmaq üçün ətrafdakı obyektlər və ya ünvana daxil olmaq üçün lazım olan qapı şifrəsi kimi məlumatları bildirin.
                </p>
                <br/>
                <div>
                    <TextArea value={AppContext.total.user.note} onChange={(e)=>secoundAddres(e)} countertext='0/256' type="textarea"  placeholder='Ünvan' />  
                </div>
            </Card>
            <br/>
            <Button className='form_button_multiple bg-primary' onClick={goNextPage} name='ÖDƏNİŞ ÜSULU ƏLAVƏ ET'/>
            
       </>
    )
}
export default CheckoutFrist