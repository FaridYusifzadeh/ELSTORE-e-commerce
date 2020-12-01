import React, { useEffect, useState, useContext } from 'react'
import DataTable from '../components/datatable/datatable'
import UrlGenerator from '../services/url-generator'
import {appContext} from '../contexts/appContext'

function DeliverOrder() {
 const [orders,setOrders]=useState([])
 const AppContext=useContext(appContext)
 const td=[
  "checkout_code",
  "buyer_name",
  "buyer_surname",
  "product_name",
  "count",
  "payment_type",
  "status",
  "amount",
  "edv",
  "delivery_price",
  "total_price"
 ]
 const th=[
  "Sifariş Kodu",
  "Alıcı Adı",
  "Alıcı Soyadı",
  "Məhsulun Adı",
  "Məhsulun Sayı",
  "Ödəniş Növü",
  "Statusu",
  "Qiymət",
  "ƏDV",
  "Çatdırılma Qiyməti",
  "Toplam Dəyər"
 ]
 
 useEffect(()=>{
  let url=UrlGenerator('az','users/company/orders');
  let token=AppContext.app.token;
  fetch(url,{
   headers:{
    'Authorization':`${token.token_type} ${token.access_token}`
   },
   method:'Get'
  }).then(async res=>{
    let data=await res.json()
    console.log(data)
    setOrders([...data.data])
  }).catch(err=>console.log(err))
   
 },[])

 return (
  <div>
  <br/>
  <DataTable tbody={orders} thead={th} td={td}/>
  </div>
 )
}

export default DeliverOrder
