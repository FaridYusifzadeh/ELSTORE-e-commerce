import React,{useEffect,useContext} from 'react'
import {Link} from "react-router-dom"
import "../DeliveryRegistr/DeliveryRegistr.scss"
import Input from "../InputGroup/InputGroup.component"
import Button from "../button/button.component"
import {useForm} from 'react-hook-form'
import swal from "sweetalert"
import {appContext} from '../../contexts/appContext'
import UrlGenerator from '../../services/url-generator'
import { useHistory } from "react-router-dom";
import GoBack from '../go-back/go-back.component'

const DeliveryRegistr = () => {
    let history = useHistory();
    const {register:register3,handleSubmit:handleSubmit3,errors:errors3}=useForm();

    const AppContext=useContext(appContext)
   const registerSubmit2=(data)=>{
    let url=UrlGenerator('az',`auth/courier/register`)
   fetch(url,{
       headers:{
         'Content-Type': 'application/json'
       },
       method:"Post",
       body:JSON.stringify(data)
   })
   .then(async res=>{
    let data=await res.json();
       if(res.ok){
        // AppContext.events.AddToken(data)
        document.getElementById("login__modal").style.display="none"
        swal( "Təbriklər","Zəhmət olmasa emailinizi yoxlayin", "success");
        history.push("/");
       }else{
        swal("Təəssüflər", `${data.error}`, "error");
       }

      
   })
   .catch((err) =>console.log(err))
   console.log(errors3.email)
}

    useEffect(()=>{
        let x=document.getElementsByTagName('body')[0].classList.contains('of-hidden');
        if(x){
            document.getElementsByClassName('menu-container')[0].classList.toggle('change');
            document.getElementById('res-nav-id').classList.toggle('opennav');
            document.getElementsByTagName('body')[0].classList.toggle('of-hidden');
        }
    })
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-xs-12">
                <div className="delivery__registr">
{/*                    <div className="redirect__page">
                        <span><img src={require(`../../assets/images/icons/Iconprev.svg`)} alt=""/></span>
                        <Link className="rediretc__text" to="/">gerİ dön</Link>
    </div>*/}
                    <GoBack text='Gerİ dön' link="/"  />
                    <div className="store__registr--text">
                    <h5>Kuryer olaraq çalış</h5>
                    </div>   
                    <form onSubmit={handleSubmit3(registerSubmit2)} >
                    <div className="registr__input">
                        <div>
                            <Input name="name"  type="text" placeholder="Adınız"register={register3({
                required:{value:true,message:'Adınızı daxil etməlisiniz'},
                maxLength:{value:255,message:'max  255 char need'}
            })} helper={errors3.name&&errors3.name.message} />
                        </div>
                        <div>
                            <Input name="surname" type="text" placeholder="Soyadınız" register={register3({
                required:{value:true,message:'Soyadınızı daxil etməlisiniz'},
                maxLength:{value:255,message:'max  255 char need'}
            })} helper={errors3.name&&errors3.surname.message} />
                        </div>
                    </div>  
                    <div className="delivery_phone">
                        <Input name="phones[phone]" placeholder="Telefon nömrəsi" type="number" formIcon={require(`../../assets/images/icons/Frame.svg`)} 
                        register={register3({
                            required:{value:true,message:'Telefonunuzu daxil edin'},
                            maxLength:{value:255,message:'max 255 char need'}
                        })} helper={errors3.name&&errors3.phones['phone'].message}/>
                          
                    </div>   
                    <div className="delivery_phone">
                        <Input name="email" placeholder="Email" type="email" formIcon={require(`../../assets/images/icons/Frame.svg`)}
                        register={register3({
                            required:{value:true,message:'Email daxil etməlisiniz'},
                            pattern:{value:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message:"Email daxil etməlisiniz"}
                            })}
                            helper={errors3.email&&errors3.email.message}
                        />
                    </div>   
                    <div className="delivery_phone">
                        <Input name="password" placeholder="Şıfrə" type="password" formIcon={require(`../../assets/images/icons/Frame.svg`)}
                        register={register3({required:'Şifrə daxil etməlisiniz',minLength:{value:5,message:'cannot be less 8'}})} helper={errors3.password&&errors3.password.message}
                        />
                    </div> 
                    <div className="delivery_info">
                        <Input name="description" placeholder="Haqqınızda əlavə məlumat" type="text" 
                        register={register3({
                            required:{value:true,message:'Haqqınızda məlumatı daxil edin'},
                            maxLength:{value:255,message:'max  255 char need'}
                        })} helper={errors3.name&&errors3.description.message}
                        />
                    </div>  
                          <div className="Delivery__button">
                            <Button className="btn__Delivery" name="Daxil ol"/>
                          </div>
                     </form>
                          <br/>
                        
                </div>
                </div>
            </div>
        </div>
        
    )
}

export default DeliveryRegistr;
