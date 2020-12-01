import React,{useEffect,useState, useContext} from 'react';
import './datatable.jquery.scss';
import './datatable.scss';
import InputGroup from '../InputGroup/InputGroup.component'
import SelectBox from '../Select-box/SelectBox.component'
import UrlGenerator from '../../services/url-generator';
import axios from 'axios'
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser'; 
var $  = require( 'jquery' );
var dt = require( 'datatables.net' );


function Datatable({minP,maxP,minPrizeSorting,maxPrizeSorting,thead,tbody,deleteProduct,handleSelect,searchName,td}) {


    const [category,setCategory] = useState({
        category:[]
      })
         
    const [searchMarket, setSearch]=useState({
        searchField:""
    })
    const [state,setState] = useState({
        filteredData:[]
    })


      useEffect(()=>{
        let categoryUrl = UrlGenerator('az','categories');
              axios.get(categoryUrl,{headers:{
              }})
              .then(cat=>{
                  // setProduct(res.data.data)
                  setCategory({category:cat.data.data});
              })
      },[])
      
   const  names = [];
    useEffect(()=>{
            $(document).ready(function() {
                $('#databasic').dataTable().api({
                    "scrollX": true,
                    "scrollY": true
                });
            } );
        tbody.forEach((name)=>{
            names.push(name)
        });
    })


    return(
        <div className='dtable'>
            <div className='datatable_search'>
                <InputGroup onChange={searchName}  placeholder='Məhsul axtar' formIcon={require('../../assets/images/icons/search.svg')} />
                <SelectBox class='datatable_selectbox' handleChange={handleSelect} value={category.category.id} options={category.category}/>
                <label >
                <span> Qiymət aralığı:</span>
                   <div className="moneydiv">
                   <InputGroup min='0' type='number' value={minP} onChange={minPrizeSorting} classinout='money_search' />
                   <span>-</span>
                   <InputGroup min='0' type='number' value={maxP}  onChange={maxPrizeSorting} classinout='money_search'/>
                   </div>
                </label>
            </div>
            <table id="databasic" class="display nowrap" style={{'width':'100%','height':'800px'}} >
        <thead>
            <tr>
                {
                    thead!=null?
                    thead.map(head=>{
                        return <th>{head.toLocaleLowerCase()}</th>
                    }):''
                }
                <th>Edit</th>
            </tr>
        </thead>
        <tbody>
                
            {
                 (tbody.length>0)?
                tbody.map(bodyItems=>{
                    return (
                        <tr>
                        {
                            Object.keys(td).map((x,i)=>{
                                console.log(td[x])
                                return td[x]=='Status'
                                ?<td><SelectBox firstopt={bodyItems.status}/></td>
                                :td[x]=='product_description'?
                                 <td style={{'overflowX':'scroll'}}>{ReactHtmlParser(bodyItems[`${td[x]}`])}</td>
                                 :<td>{bodyItems[`${td[x]}`]}</td>
                            })
                        }

                            <td>
                            {
                                    //window.location.pathname==='profile/products'&&
                                    <><Link to={`/profile/product/edit/${bodyItems.id}`}>Duzelish</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a data-id={bodyItems.id} onClick={deleteProduct} href="javascript:void(f1())">Sil</a></>
                            }
                            </td>
                        </tr>
                    )
                })
                :null 
                // : state.filteredData.map((bodyItems,i)=>{
                //     return (
                //         <tr>
                //             <td>{bodyItems.product_name}</td>
                //             <td>{bodyItems.Kateqorİya}</td>
                //             <td>{bodyItems.say}</td>
                //             <td><InputGroup value={bodyItems.price} /></td>
                //             <td><SelectBox firstopt='Status' name={bodyItems.status} /></td>
                //             <td><a href="#">Duzelish</a> <a href="#">Sil</a></td>
                //         </tr>
                //     )
                // })
            }

            {
               
            }
           
        </tbody>
    </table>
        </div>
    )
}

export default Datatable

