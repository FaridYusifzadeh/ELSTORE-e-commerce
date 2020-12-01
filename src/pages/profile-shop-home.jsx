import React,{useEffect, useContext,useState} from 'react'
import './profile-shop-home.scss'
import CompanyMiniImage from '../components/Compony-mini-image/CompanyMiniImage';
import ButtonRating from '../components/button-rating/buttonRating.component';
import ButtonDropDown from '../components/button-dropdown/ButtonDropDown.component';
import Filter from '../components/filter/filter.component';
import UrlGenerator from '../services/url-generator';
import { appContext } from '../contexts/appContext';
import { searchContext } from '../contexts/search';
import SearchResultComp from '../components/search-result-component/SearchResultComp.component';
import SearchResultFilt from '../components/Search-reasult-page/SearchResult.component'
import Chips from '../components/chips/chips.component'


function ProfileShopHome(props) {
    let AppContext=useContext(appContext)
    let SearchContext = useContext(searchContext);
    const [product, setproduct] = useState({})
    const [queryParams, setQueryParams] = useState([])
    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('')
    const [like,setLike]=useState(false)                                                        

    useEffect(()=>{
        let token=AppContext.events.getToken();
        let id=props.match.params.id;
      let url=''
      window.location.pathname.includes('discount')
      ? url=UrlGenerator('az',`users/company?company_id=${id}&include=products&with=discounts`)
      :id!==undefined?
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
                           setproduct({
                               ...data.data[0],
                           })
                          }
       
                      }).catch(err=>console.log(err))
            },[])
            
            const selectHandle = (e) => {
                let pageUrl = window.location.pathname;
                let filterQuery = '';
                let sellerId = '';
                if (pageUrl.includes('company')) {
                  console.log('selectHandler');
                  sellerId =
                    Object.keys(props.match.params).length !== 0
                      ? props.match.params.id
                      : null;
                  filterQuery +=
                    filterQuery !== ''
                      ? `&filter[company_id]=${sellerId}`
                      : `filter[company_id]=${sellerId}`;
                }
                if (pageUrl.includes('profile')) {
                  sellerId = AppContext.app.user.id;
                  filterQuery +=
                    filterQuery !== ''
                      ? `&filter[company_id]=${sellerId}`
                      : `filter[company_id]=${sellerId}`;
                }
                if (SearchContext.filter.queryParams.length > 0) {
                  filterQuery +=
                    filterQuery !== '' ? `&filter[category_id]=` : `filter[category_id]=`;
                  SearchContext.filter.queryParams.forEach((x, k) => {
                    console.log(k);
                    k === SearchContext.filter.queryParams.length - 1
                      ? (filterQuery += `${x}`)
                      : (filterQuery += `${x},`);
                  });
                }
                if (SearchContext.filter.priceFrom != '') {
                  filterQuery +=
                    filterQuery !== ''
                      ? `&filter[min_prize]=${SearchContext.filter.priceFrom}`
                      : `filter[min_prize]=${SearchContext.filter.priceFrom}`;
                }
                if (SearchContext.filter.priceTo != '') {
                  filterQuery +=
                    filterQuery !== ''
                      ? `&filter[max_price]=${SearchContext.filter.priceTo}`
                      : `filter[max_price]=${SearchContext.filter.priceTo}`;
                }
                SearchContext.events.setFilter({
                  ...SearchContext.filter,
                  order: e.target.value,
                });
            
                filterQuery +=
                  filterQuery !== ''
                    ? `&filter[order]=${e.target.value}`
                    : `filter[order]=${e.target.value}`;
                console.log(filterQuery);
                let url = UrlGenerator('az', `search/product?${filterQuery}`);
                fetch(url)
                  .then(async (res) => {
                    let data = await res.json();
                    console.log(data);
                    //   SearchContext.events.setFilter({
                    //     ...SearchContext.filter,
                    //     queryParams:[...queries]
                    //   })
                    SearchContext.events.setCatFilter({
                      ...SearchContext.catFilter,
                      meta: data.meta,
                      data: data.data,
                    });
                  })
                  .catch((err) => console.log(err));
              };

     function coverHandler(e) {
         let img=e.target.files[0];
         console.log(img)
         let reader=new FileReader();
         reader.onload=()=>{
             setproduct({
                 ...product,
                 store:{
                     ...product.store,
                     cover_image:reader.result
                 }
             })
             let url=UrlGenerator('az','users/update');
             let token=AppContext.events.getToken()
             let formdata=new FormData();
             formdata.append('cover_image',img)
             fetch(url,{
                 method:'Post',
                 headers:{
                     'Authorization':`${token.token_type} ${token.access_token}`
                 },
                 body:formdata
             }).then(async res=>{
                 let data=await res.json();
                 console.log(data)
             }).then(err=>console.log(err))
         }
         reader.readAsDataURL(img)
     }

     function thumbHandler(e) {
        let img=e.target.files[0];
        console.log(img)
        let reader=new FileReader();
        reader.onload=()=>{
            setproduct({
                ...product,
                store:{
                    ...product.store,
                    logo:reader.result
                }
            })
            let url=UrlGenerator('az','users/update');
            let token=AppContext.events.getToken()
            let formdata=new FormData();
            formdata.append('logo',img)
            fetch(url,{
                method:'Post',
                headers:{
                    'Authorization':`${token.token_type} ${token.access_token}`
                },
                body:formdata
            }).then(async res=>{
                let data=await res.json();
                console.log(data)
            }).then(err=>console.log(err))
        }
        reader.readAsDataURL(img)
    }

     function clickHandler(e) {
         console.log(e.target.checked)
         let id=e.target.value;
         let queries=queryParams;
         let store_id=AppContext.app.user.id
         let query=`filter[company_id]=${store_id}&filter[category_id]=`;
         if(e.target.checked){
             queries.push(`${id}`)
        }else{
            let newqueries=queries.filter(x=>x!==`${id}`);
            queries=newqueries
            console.log(newqueries)
        }
        queries.forEach((x,k)=>{
            console.log(k)
            k===queries.length-1
            ?query+=`${x}`
            :query+=`${x},`
        })
        if(priceFrom!==''){
            query+=`&filter[min_prize]=${priceFrom}`
          }
        if(priceTo!==''){
              query+=`&filter[max_price]=${priceTo}`
          }
        let url=UrlGenerator('az',`search/product?${query}`)
        fetch(url)
        .then(async res=>{
            let data=await res.json();
            console.log(data)
            setQueryParams([
               ...queries
            ])
            setproduct({
                ...product,
                products:data.data
            })

        }).catch(err=>console.log(err))
     }
      
     function Pricefrom(e){
        setPriceFrom(e.target.value)
        let store_id=AppContext.app.user.id;
        let filteQuery=`filter[company_id]=${store_id}&filter[category_id]=`;
        queryParams.forEach((x,k)=>{
            console.log(k)
            k===queryParams.length-1
            ?filteQuery+=`${x}`
            :filteQuery+=`${x},`
        })
        filteQuery+=`&filter[min_price]=${e.target.value}`

        if(priceTo!=='')
        filteQuery+=`&filter[max_price]=${priceTo}`
        
        let url=UrlGenerator('az',`search/product?${filteQuery}`)
        fetch(url)
        .then(async res=>{
            let data=await res.json();
            console.log(data)
            setproduct({
                ...product,
                products:data.data
            })
 
        }).catch(err=>console.log(err))

    }

    function Priceto(e){
        setPriceTo(e.target.value);
        let store_id=AppContext.app.user.id;
        let filteQuery=`filter[company_id]=${store_id}&filter[category_id]=`;
        queryParams.forEach((x,k)=>{
            console.log(k)
            k===queryParams.length-1
            ?filteQuery+=`${x}`
            :filteQuery+=`${x},`
        })

        filteQuery+=`&filter[max_price]=${e.target.value}`

        if(priceFrom!=='')
        filteQuery+=`&filter[min_price]=${priceFrom}`
        let url=UrlGenerator('az',`search/product?${filteQuery}`)
        fetch(url)
        .then(async res=>{
            let data=await res.json();
            console.log(data)
            setproduct({
                ...product,
                products:data.data
            })
 
        }).catch(err=>console.log(err))
    }

    const likeShop=()=>{
        let url=UrlGenerator('az','users/like');
        let token=AppContext.events.getToken();
        let id=props.match.params.id;
        fetch(url,{
            headers:{
             'Content-Type':'application/json',
             'Authorization':`${token.token_type} ${token.access_token}`
            },
            method:'Post',
            body:JSON.stringify({type:'company',liketable_id:id,action_type:like?'dislike':'like'})
        }).then( response=>{
            if(!response.ok){
                document.getElementById('login__modal').style.display='block'
            }else{
                setLike(!like);
            }
        })
        .catch(()=>document.getElementById('login__modal').style.display='block')
    }
      

         console.log(product)
    return (
        <section className="profile_shop__home__section">
            <div className="profile_shop__home__image">
              <img src={product.store!==undefined?`${product.store.cover_image}`:null} alt=''/>
                <div className="profile_shop__home__image__content button_drop__down">
                   {
                       product.edit
                       ?<ButtonDropDown onchange={(e)=>{coverHandler(e)}}/>
                       :null
                   }
                    
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="all_sides__contents">
                            <div className="left_side">
                            <CompanyMiniImage   thum_img={product.store!==undefined?product.store.logo:null}>
                              {
                                  product.edit
                                  ?<CompanyMiniImage.ButtonDropDown onchange={thumbHandler}/>
                                  :null
                              }
                              
                            </CompanyMiniImage>
                            </div>
                            <div className="middle_side_text__content">
                                    <h4>{product.store!==undefined?product.name:null}</h4>
                                    <p>{product.store!==undefined?product.store.description:null}</p>
                                    <Chips store={product.store}/>
                                    <ButtonRating name='Yuksek rating' icon={require('../assets/images/icons/star.svg')} class='bg-gold'/>
                            </div>
                            <div className="right_side">
                                <div className="right_side__content">
                                    <h6>Əlaqə</h6>
                                    <p>{product.store!==undefined?product.email:null}</p>
                                    <p>{product.store!==undefined?product.store.phones.phone:null}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="add_button__section">
                            <ButtonRating click={likeShop}  name='əlavə et' icon={require('../assets/images/index/Union.svg')} class=''/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                        <div className="profil_filter_content">
                            <Filter clickHandler={clickHandler} Pricefrom={Pricefrom} Priceto={Priceto}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                    <div className="changed__filter">
                    <SearchResultFilt  
                        handleSelect={selectHandle}
                        catFilter={SearchContext.catFilter.data} />
                    </div>
                     <SearchResultComp data={product.products} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileShopHome
