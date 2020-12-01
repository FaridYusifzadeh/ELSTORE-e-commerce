import React,{useEffect,useState} from 'react'
import Datatable from '../components/datatable/datatable';
import '../App.scss'
import axios from 'axios'
import '../assets/sass/pages/compaign.scss'
import UrlGenerator from '../services/url-generator';
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import {appContext} from '../contexts/appContext';


const th = ['Adı','Xarakteristikası','Qiymət','Endirim','Endirim Qiyməti','Çatdırılma Qiyməti','Status' ];
const td = ['product_name','product_description','price','discount', 'discount_price','delivery_price','Status' ];
function Products({headerText,match}) {
const [product,setProduct] = useState({
  data:[],
  category:[]
})
const [sort,setSort]=useState({
  name:'',
  category:'',
  minPrize:'',
  maxPrize:'' 
});
const AppContext=useContext(appContext);

let producturl = UrlGenerator('az','products?include=seller');
let categoryUrl = UrlGenerator('az','categories');


useEffect(()=>{
  let token=AppContext.events.getToken();
  let id=match.params.id;
  let url=''
id!==undefined?
    url=UrlGenerator('az',`users/company?company_id=${id}&include=products`)
    :url=UrlGenerator('az',`users/company?include=products`)
      fetch(url,{
          headers:{
              'Authorization':token!==null?`${token.token_type} ${token.access_token}`:''
          } 
                })
                .then(async res => {
                    let data =await res.json();
                    console.log(data)
                    if(res.ok){
                     setProduct({
                       ...product,
                       data:[...data.data[0].products]
                     })
                    }
 
                }).catch(err=>console.log(err))
      },[])

const deleteProduct=(e)=>{
  let id =e.target.getAttribute('data-id');
  const newProducts=product.data.filter(x=>x.id!=id);
  console.log(newProducts)
  let url=UrlGenerator('az',`products/${id}`);
  let token=AppContext.app.token;
  console.log(token)
  fetch(url,{
      method:'Delete',
      headers:{
          'Authorization':token!=null?`${token.token_type} ${token.access_token}`:''
      }
  }).then(async res=>{
      let data=await res.json();
      if(res.ok){
        setProduct({
          ...product,
          data:[...newProducts]
        })
      }
  }).catch(err=>console.log(err))
}

function handleSelect(e) {
  // let url=UrlGenerator('az',`search/product?filter[category_id]=${e.target.value}`)
  // axios.get(url)
  // .then(res => {
  //     setProduct({data:res.data.data});
  // })
  let currentSort = {...sort};
      currentSort.category = e.target.value
  setSort({...currentSort})
  fetchSortig(currentSort)
}

function searchName(e){
  // let url=UrlGenerator('az',`search/product?filter[product_name]=${e.target.value}`)
  // axios.get(url)
  // .then(res => {
  //     setProduct({data:res.data.data});
  // })
  let currentSort = {...sort};
  currentSort.name = e.target.value
  setSort({...currentSort})
  fetchSortig(currentSort)
}

const minPrize=(e)=>{
  let currentSort = {...sort};
  console.log('minP',parseInt(e.target.value)>0)
  if(parseInt(e.target.value)>0){
    currentSort.minPrize = e.target.value
  }else{
    currentSort.minPrize=''
  }
  setSort({...currentSort})
  fetchSortig(currentSort)
}
const maxPrize=(e)=>{
  let currentSort = {...sort};
  console.log('maxP',!Number(e.target.value)<0)
  if(!Number(e.target.value)<0){
    currentSort.maxPrize = e.target.value
  }else{
    currentSort.maxPrize=''
  }
  setSort({...currentSort})
  fetchSortig(currentSort)
}

function fetchSortig(sortdata) {
  let url=UrlGenerator('az',`search/product?`)
  console.log("sortdata.name",sortdata.name)
  if(sortdata.name!==''){
     url+=`filter[title]=${sortdata.name}&`
  }
  if(sortdata.category!==''){
    url+=`filter[category_id]=${sortdata.category}&`
  }
  if(sortdata.minPrize!==''){
    url+=`filter[min_price]=${sortdata.minPrize}&`
  }
  if(sortdata.maxPrize!==''){
    url+=`filter[max_price]=${sortdata.maxPrize}`
  }
  axios.get(url)
  .then(res => {
      setProduct({data:res.data.data});
  })
}

    return (
        <div className='container-fluid'>
        <br/>
            <div className="head_compaign">
                <h1>Toplam Məhsul Sayı: {product.data.length}</h1>
                <div className='compaign_buttons'>
                    <Link className='compaignbtn active' style={{width:'186px'}} to='/profile/product/create'><span>+ Məhsul Əlavə Et</span></Link>
                    <div>&nbsp;&nbsp;</div>
                </div>
            </div>
            <br/>
            <Datatable minP={sort.minPrize} maxP={sort.maxPrize} minPrizeSorting={minPrize} maxPrizeSorting={maxPrize} deleteProduct={deleteProduct} searchName={searchName} handleSelect={handleSelect}   thead ={th} td={td} tbody={product.data}/>
        </div>
    )
}

export default Products
