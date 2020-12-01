import React,{useEffect,useState} from 'react'
import DatatableCompaign from '../components/datatable compaign/datatable_compaign';
import '../App.scss'
import axios from 'axios'
import '../assets/sass/pages/compaign.scss'
import Button from '../components/button/button.component';
import {Link} from 'react-router-dom'
import UrlGenerator from '../services/url-generator';


const th = ['kampanİya ADI','məhsulların sayı', 'Status', 'Düzəlİş' ];
var sifaris = [
  {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Aktiv',
  },
  {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Gözləmədə',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Hazırlanır',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  }, {
    'ad':'Nümunə məhsul adı məhsul adı məhsul adı',
    'say': '1',
    'status': 'Qəbul edilmədi',
  } 
  
]

function Compaign(){
let url=UrlGenerator('az','products?include=seller,images')
const [product,setProduct] = useState({
  data:[]
})

useEffect(()=>{
  axios.get(url,{headers:{
  }})
  .then(res=>{
      // setProduct(res.data.data)
      setProduct({data:res.data.data});
      console.log(res.data.data)
  })
  
},[])



    return (
        <div className='container-fluid'>
            <div className="head_compaign">
                <h1>Toplam kampaniya sayı: 76</h1>
                <div className='compaign_buttons'>
                    <Link to='profile/create-product' className='compaignbtn active' name='+ Kampanİya əlavə et'/>
                    <div>&nbsp;&nbsp;</div>
                    <Button className='compaignbtn' name='yadda saxla'/>
                </div>
            </div>
            <br/>
            <DatatableCompaign thead ={th} tbody={sifaris}/>
        </div>
    )
}

export default Compaign
