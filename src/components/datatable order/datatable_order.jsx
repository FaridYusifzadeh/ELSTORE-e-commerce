import React,{useEffect,useState} from 'react';
import '../datatable/datatable.jquery.scss';
import '../datatable/datatable.scss';
import InputGroup from '../InputGroup/InputGroup.component'
import SelectBox from '../Select-box/SelectBox.component';
var $  = require( 'jquery' );
var dt = require( 'datatables.net' );

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


function DatatableOrder(params) {
   
    const [filter,SetFilter]  = useState({
        kategories:[],
        SearchName:''
    })

   const  names = [];

    useEffect(()=>{

        $(document).ready(function() {
            $('#example').DataTable();
        } );

       
        params.tbody.map((name)=>{
            names.push(name)
        });

        console.log(names)
        
    })

    const filteredName = params.tbody.filter(name =>
         name.ad.includes(filter.searchName)
      
      );

    function searchName(e){
        SetFilter({
            ...filter,
            SearchName:e.target.value
        })
    }
  
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
                    params.thead.map(head=>{
                        return <th>{head}</th>
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                params.tbody.map(bodyItems=>{
                    return (
                        <tr>
                            <td>{bodyItems.kod}</td>
                            <td>{bodyItems.ad}</td>
                            <td>{bodyItems.say}</td>
                            <td>{bodyItems.qiymət}</td>
                            <td>
                            <SelectBox class='datatable_selectbox_row' firstopt="Seçin" options={kategories}/>
                            </td>
                            <td><a href="#">Duzelish</a> <a href="#">Sil</a></td>
                        </tr>
                    )
                })
            }
           
        </tbody>
    </table>
        </div>
    )
}

export default DatatableOrder

