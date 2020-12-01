import React,{useEffect,useState} from 'react';
import '../datatable/datatable.jquery.scss';
import '../datatable/datatable.scss';
import InputGroup from '../InputGroup/InputGroup.component'
import SelectBox from '../Select-box/SelectBox.component';
import Checkbox from '../checkbox/checkbox'
var $  = require( 'jquery' );
var dt = require( 'datatables.net');

const kategories = [
    {
        name:'Search'
    },
    {
        name:'Search'
    },
    {
        name:'Search'
    },
    {
        name:'Search'
    }
]


function DatatableCheck(props) {
   
    const [filter,SetFilter]  = useState({
        kategories:[],
        SearchName:''
    })

   const  names = [];

    useEffect(()=>{

        $(document).ready(function() {
            $('#example').DataTable();
        } );


        
    })


    function searchName(e){
        SetFilter({
            ...filter,
            SearchName:e.target.value
        })
    }
    console.log(filter.SearchName);
    return(
        <div>
            <div className='datatable_search'>
                <InputGroup onChange={searchName}  placeholder='Məhsul axtar' formIcon={require('../../assets/images/icons/search.svg')} />
                <SelectBox class='datatable_selectbox' options={kategories}/>
                <label >
                <span> Sıra aralığı:</span>
                   <div className="moneydiv">
                   <InputGroup classinout='money_search' />
                   <span>-</span>
                   <InputGroup classinout='money_search'/>
                   </div>
                </label>
            </div>
            <table id="example" class="display" >
        <thead>
            <tr>
                {
                    props.thead.map(head=>{
                        return <th>{head}</th>
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                props.tbody!=undefined?
                props.tbody.map(bodyItems=>{
                    return (
                        <tr>
                            <td>
                               <Checkbox value={bodyItems.id} onClick={searchName}/>
                            </td>
                            <td>{bodyItems.product_name}</td>
                            <td>{bodyItems.price}</td>
                        </tr>
                    )
                }):''
            }
           
        </tbody>
    </table>
        </div>
    )
}

export default DatatableCheck

