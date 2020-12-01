import React,{useState,useContext,useEffect} from 'react';
import './filter.style.scss';
import axios from 'axios'
import {categoryContext} from '../../contexts/category'
import {searchContext} from '../../contexts/search';
import UrlGenerator from '../../services/url-generator';



function Filter({clickHandler,Pricefrom,Priceto,currentCategorieId}) {

    const categoriesContex = useContext(categoryContext);
    const [market,setMarket] = useState({
        brends:[],
        products:[],
        
    })
    const [searchMarket, setSearch]=useState({
        searchField:""
    })
     
    const filteredMerkets = market.brends.filter(item=> item.name.toLowerCase().includes(searchMarket.searchField.toLowerCase()));
    const [passiveCat, setpassiveCat] = useState({
        toggle:false
    })



    useEffect(()=>{

        console.log('brands')
        let url=UrlGenerator('az','brands');
           fetch(url)
           .then(async res=>{
               let data=await res.json();
               console.log(data)
               setMarket({
                   ...market,
                   brends:data.data
               })
           }).then(err=>console.log(err))


          
       },[])


    function setTogglepassive(){
        setpassiveCat({
            toggle:!passiveCat.toggle
        })
    }
    
    return (
        
        <div className='filter'>
            
             <p onClick={setTogglepassive} className='filter_head drop '>Filter <div>-</div></p>
      
            <div className={`panelkategory ${passiveCat.toggle?'panel_cat_passsive':''}`} >
        <div className='category_list'>
        <div className='panel2'>
            <br/>
        <ul>
        {
         categoriesContex.state.categories.map(x => {
             console.log('categories.state.categories',categoriesContex.state.categories.children)
            return (
                
            <div>
                
                <li> 
                
                <div className="tabs">
                    <div className="tab">
                            <input type="checkbox"  onClick={(e)=>clickHandler(e)} value={x.id} id={`chck${x.id}`}/>
                         <label className="tab-label" for={`chck${x.id}`}>{x.name}</label>
                         <div className="borders_categ"></div>
                     <div className="tab-content">
                     {(x.children != null) ? x.children.map(item => { return(<li className='category_list_under'>
                    <label class="container-check">{item.name}
                    <input  value={item.id}   onClick={(e)=>clickHandler(e)} type="checkbox" />
                    <span class="checkmark"></span>
                    </label>
                    
                    {
                        (item.children!=null)?
                            item.children.map(itemchildren=>{
                            return (<li className='category_list_under_under'>
                                <label class="container-check">{itemchildren.name}
                            <input  value={itemchildren.id}   onClick={(e)=>clickHandler(e)} type="checkbox" />
                            <span class="checkmark"></span>
                            </label> 
                            </li>
                            )
                        }):
                        ''
                    }

                </li>)}) : ''}
                    </div>
                </div>
             </div>
                {/* <label class="container-check">{x.name}
                    <input value={x.id}  onClick={(e)=>clickHandler(e)}    type="checkbox" />
                    <span class="checkmark"></span>
                    </label> */}
                </li>
                {/* {(x.children != null) ? x.children.map(item => { return(<li className='category_list_under'>
                    <label class="container-check">{item.name}
                    <input  value={item.id}   onClick={(e)=>clickHandler(e)} type="checkbox" />
                    <span class="checkmark"></span>
                    </label>
                    
                    {
                        (item.children!=null)?
                            item.children.map(itemchildren=>{
                            return (<li className='category_list_under_under'>
                                <label class="container-check">{itemchildren.name}
                            <input  value={itemchildren.id}   onClick={(e)=>clickHandler(e)} type="checkbox" />
                            <span class="checkmark"></span>
                            </label> 
                            </li>
                            )
                        }):
                        ''
                    }

                </li>)}) : ''} */}

            </div>
            )
        })
        }

            </ul>
        </div>
        </div>
        <p className='filter_head'>Brendlər</p>
        <div className='form_filter'>
            <form className="search-input">
                <input 
                onChange={e => {
                    setSearch({searchField:e.target.value});
                }} 
                className='search-input-text' 
                type="search" 
                placeholder="Axtarış" 
                name="search" />
            </form>
        </div> 
        <div className="filter_markets">
        <div className='row'>
        {
            filteredMerkets.filter((item,idx)=>idx < 4 )
            .map(({name}) => {
                return (
                <div className='col-lg-6 col-md-3 col-sm-3 col-6 center'>
                    <img alt='' src={require('../../assets/images/market.svg')} />
                    <p className='filter_market_title'>{name}</p>
                </div>
                )
            })
        }
        </div>
        </div>
        <p className='filter_head'>qİymət aralığı</p>
        <div className='filter_price_div'>
        <div>
            <form className="search-input">
                <input 
                className='search-input-text' 
                type="number"
                min={1}
                max={9999}
                onChange={Pricefrom}
                placeholder="0" 
                name="search" />
                <button className='search-input-submit azn' type="submit"><img alt='' src={require('../../assets/images/azn.svg')} /></button>
            </form>
        </div>
        <div className='line_price'>

        </div>
        <div>
            <form className="search-input" >
                <input 
                className='search-input-text'
                type="number"
                min={1}
                max={9999}
                placeholder="0"
                name="search"
                onChange={Priceto}  
                    />
                <button className='search-input-submit azn' type="submit"><img alt='' src={require('../../assets/images/azn.svg')} /></button>
            </form>
        </div>
        
        </div>

            </div>
        </div>
    )
}

export default Filter