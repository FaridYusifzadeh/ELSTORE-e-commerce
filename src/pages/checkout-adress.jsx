import React,{useState, useContext} from 'react'

import CheckoutFrist from '../components/checkout_first/checkout_firt'
import CheckoutSecond from '../components/checkout_second/checkout_second'
import CheckoutThird from "../components/checkout_third/checkout_third";

import IconDeliverySafetyPayback from '../components/Icon-delivery-safety-payback/IconDeliverySafetyPayback.component'
import TotalSum from '../components/total_sum/tootal_sum.component'
import {appContext} from '../contexts/appContext';
function CheckoutAddress() {
          const AppContext=useContext(appContext)
         // Proceed to next step
         const  nextStep = () => {
              setStep(step+1)
           
          };
          const backFirst=()=>{
            setStep(step-2)
          }
            
          function stepTwo(){
            setStep(2)
          }
          function stepOne(){
            setStep(1)
          }
          // Go back to prev step
          const prevStep = () => {
            setStep(step-1)
          };

    const [step,setStep] = useState(1);


    const [state,setState] = useState({
        firstName:'',
        lastName:'',
        number:'',
        country:'',
        states:'',
        village:'',
        adress:'',
        odenisusulu:'',
        bitmetarixi:'',
        cvv:'',
        kartnomresi:'',
    })
    const {firstName,lastName, states ,village,adress,country,odenisusulu,bitmetarixi,cvv,kartnomresi} = state;
    const values = {states, firstName,lastName,village,adress,country,odenisusulu,bitmetarixi,cvv,kartnomresi};

    function renderCheckout() {
        switch (step) {
            case 2:
                return  <CheckoutSecond value={values} nextStep = {nextStep} prevStep = {prevStep} />

            case 3:
                    return   <CheckoutThird value={values} nextStep = {nextStep} prevStep = {backFirst}  />
            
            case 1: 
                 return    <CheckoutFrist value={values} stepTwo={stepTwo} stepOne={stepOne}  nextStep = {nextStep} prevStep = {prevStep} />
        }
    }

    return (
        <div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-8'>
            {renderCheckout()}
            </div>
            <div className='col-lg-4'>
            <TotalSum class='card-border' amount="Məbləğ" delivery="Catdirilma" deliveryAmount={AppContext.total.totalDeliveryAmount} tax={AppContext.total.taxamount} total="Ümumi" totalPrice={AppContext.total.amount} totalCount={AppContext.total.totalAmount} />
                <br/>
                <IconDeliverySafetyPayback/>
            </div>
            
        </div>
        </div>
    )
 
    

}

export default CheckoutAddress
