import React, { useContext, useEffect,useRef } from 'react'
import GoBack from '../components/go-back/go-back.component'
import Button from '../components/button/button.component'
import InputGroup from '../components/InputGroup/InputGroup.component'
import { appContext } from '../contexts/appContext'
import Card from '../components/card/card.component'
import './contact.scss'
import {useForm} from 'react-hook-form'
import UrlGenerator from '../services/url-generator'




function Contact() {
    const AppContext = useContext(appContext)

    const {handleSubmit,register,errors} = useForm();

    const contactRef = useRef();

    useEffect(()=>{
        AppContext.events.mobileSideBarOFF()
      })


    let send = (data) => {
        
        let url=UrlGenerator('az','contact-message');

        fetch(url,{
            method:'Post',
            body  : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(async res => {

            let data = await res.json();

            console.log(data);
            
        }).catch(err => {

            console.log(err)
        })
        
        contactRef.current.reset()
    }

    return (
        <React.Fragment>
            <div className='container-fluid'>
                <div className="row">
                    <div class="col-lg-12 col-md-12 col-xs-12 ">
                        <div className="redirect">
                            <GoBack link='/' text='ƏSAS SƏHİFƏYƏ GERİ DÖN' />
                        </div>
                        <div className="contact_content">
                            <div className="text">
                                <h1>Əlaqə</h1>
                            </div>
                            <Card>
                                <div className="basket__cart">
                                    <h3>Mesaj göndər</h3>
                                    <br />
                                    <form ref={contactRef} onSubmit={handleSubmit(send)}>
                                    <InputGroup name='name' placeholder='Adınız' register={register({
                                        required: { value: true, message: 'Adınızı daxil etməlisiniz' },
                                        maxLength: {
                                          value: 255,
                                          message: 'maksimum  255 simvol qeyd oluna bilər',
                                        },
                                      })}
                                      helper={errors.name && errors.name.message} />
                                    <br />
                                    <InputGroup name='email' type='email' placeholder='E-poçt adresi' register={register({
                                        required: { value: true, message: 'Email daxil etməlisiniz' },
                                        pattern: {
                                          value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                          message: 'email düzgün deyil',
                                        },
                                      })}
                                      helper={errors.email && errors.email.message}/>
                                    <br />
                                    <InputGroup name='message' type='textarea' placeholder='Mesajınız'  register={register({
                                        required: { value: true, message: 'mesaj daxil etməlisiniz' },
                                        maxLength: {
                                          value: 255,
                                          message: 'maksimum  255 simvol qeyd oluna bilər',
                                        },
                                      })}
                                      helper={errors.message && errors.message.message}/>
                                    <Button type='submit' className='bg-primary--light'>GÖNDƏR</Button>
                                    </form>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Contact;