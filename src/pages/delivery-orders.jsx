import React,{useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ButtonRating from '../components/button-rating/buttonRating.component'
import _ from 'lodash'
import Button from '../components/button/button.component';
import SelectBox from '../components/Select-box/SelectBox.component';
import Label from '../components/label/label.component'
import UrlGenerator from '../services/url-generator';
import {appContext} from '../contexts/appContext';
import InputGroup from '../components/InputGroup/InputGroup.component';
import Pagination from '../components/Pagination/pagination.component'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       { date: '2020-01-05', customerId: '11091700', amount: 3 },
//       { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//     ],
//   };
// }



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
  console.log(row)
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{'textAlign':'center!important'}}>{row.checkout_code}</TableCell>
        <TableCell align="center">
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          Adresler Bax {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
        <TableCell align="center">
         <p>{row.buyer_address.city_name}</p>
         <p>{row.buyer_address.region_name}</p>
         <p>{row.buyer_address.village_name}</p>
        </TableCell>
        <TableCell align="center">{row.payment_type===0?'Nağd':'Kredit kart'}</TableCell>
        <TableCell align="center">{`${row.price} AZE`}</TableCell>
        <TableCell align="center">
        {
          row.status===0?
          <Label className='lbl-waiting' name='Gözləmədə' />
          : row.status===1?
          <Label className='lbl-waiting' name='Hazırlanır'/>
          : row.status===1?
          <Label className='lbl-waiting' name='Tamamlanıb'/>
          : null
        }
        </TableCell>
        <TableCell align="center">
         <a className='navbar_bottom_link' href="javascript:void(0)" onClick={()=>props.linkFucn(row.id)}>{props.linkName}</a>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Magaza Adi</TableCell>
                    <TableCell align="center">Magaza Adresi</TableCell>
                    <TableCell align="center">Mehsul Adi</TableCell>
                    <TableCell align="center">Mehsul Sayi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.order_addresses!==undefined&&row.order_addresses.map((hr,i) => (
                    <TableRow key={i}>
                      <TableCell align="center">
                        {hr.shop_name}
                      </TableCell>
                      <TableCell align="center">
                      {hr.shop_address.address}<br/>
                      {hr.shop_address.city_name}<br/>
                        {hr.shop_address.region_name}<br/>
                       { hr.shop_address.village_name}<br/>
                      </TableCell>
                      <TableCell align="right" style={{'textAlign':'center'}}>{hr.product_name}</TableCell>
                      <TableCell align="right">{hr.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable({query,urlLink,linkName,linkFucn}) {

 const [state, setState] = useState({
  data:[
  {
   checkout_code: 44545,
   buyer_address: {
     city_name: 'baki',
     region_name: "Sebail",
     village_name: "20-sahe"
   },
   payment_type: 0,
   price: 24,
   status:'Gözlənilir',
   order_adresses: [
     {
       shop_name: "Contact az",
       shop_address:{
         city_name: 'baki',
         region_name: "Sebail",
         village_name: "20-sahe"
       },
       product_name: "sefsefesf",
       product_count: 2
     },
     {
       shop_name: "efsefse",
       shop_address:{
         city_name: 'baki',
         region_name: "Sebail",
         village_name: "20-sahe"
       },
       product_name: "Ayaqqabi",
       product_count: 2
     }
   ]
 },
 {
  checkout_code: 44545,
  buyer_address: {
    city_name: 'baki',
    region_name: "Sebail",
    village_name: "20-sahe"
  },
  payment_type: 0,
  price: 24,
  status:'Gözlənilir',
  order_adresses: [
    {
      shop_name: "Contact az",
      shop_address:{
        city_name: 'baki',
        region_name: "Sebail",
        village_name: "20-sahe"
      },
      product_name: "sefsefesf",
      product_count: 2
    },
    {
      shop_name: "efsefse",
      shop_address:{
        city_name: 'baki',
        region_name: "Sebail",
        village_name: "20-sahe"
      },
      product_name: "Ayaqqabi",
      product_count: 2
    }
  ]
},
{
  checkout_code: 44545,
  buyer_address: {
    city_name: 'baki',
    region_name: "Sebail",
    village_name: "20-sahe"
  },
  payment_type: 0,
  price: 24,
  status:'Gözlənilir',
  order_adresses: [
    {
      shop_name: "Contact az",
      shop_address:{
        city_name: 'baki',
        region_name: "Sebail",
        village_name: "20-sahe"
      },
      product_name: "sefsefesf",
      product_count: 2
    },
    {
      shop_name: "efsefse",
      shop_address:{
        city_name: 'baki',
        region_name: "Sebail",
        village_name: "20-sahe"
      },
      product_name: "Ayaqqabi",
      product_count: 2
    }
  ]
}
 ],
 meta:{},
 editIDX:-1,
 columToSort:'',
 sortDirection:'asc'
})
   const AppContext=useContext(appContext);

  useEffect(()=>{
      let url=UrlGenerator('az',`${urlLink}?${query}`);
      fetch(url,{
        headers:{
          'Authorization':`${AppContext.app.token.token_type} ${AppContext.app.token.access_token}`
        }
      })
      .then(async res=>{
        let data=await res.json();
        console.log("bla",data)
        setState({
            data:data.data
        })
      }).catch(err=>console.log(err))
  },[])

const InverDirection={
 asc:'asc',
 desc:'desc'
};

 let handleSort = (columnName) => {
  setState(state=>({
   ...state,
   columToSort:columnName,
   sortDirection:state.columToSort===columnName
   ?InverDirection[state.columToSort]
   :'asc'
  }))
 }

const sorts={
   def:list=>_.orderBy(list,'')
}
  let srchandling=(e)=>{
     let url = UrlGenerator('az',`users/courier/search-order?checkout_code=${e.target.value}`);
     fetch(url,{
      headers:{
        'Authorization':`${AppContext.app.token.token_type} ${AppContext.app.token.access_token}`
      }
     })
     .then(async res => {
       let data=await res.json();
       setState({
         data:[...data.data]});
       console.log(data)
     }).catch(err=>console.log(err))
  }
  let paginationHandling=(e)=>{
    let url=`${state.meta.path}?page=${e.target.innerHTML}`
    fetch(url,{
        method:"GET",
    })
    .then(async res=>{
      let data=await res.json();
     if(res.ok){
         setState({
           data:data.data,
           meta:data.meta
         })
        
     }
    })
    .catch(
        (err) =>console.log(err)
    )
  }

  return (
    <TableContainer component={Paper} style={{'marginTop':'50px'}}>
      <Table
       handleSort={handleSort} aria-label="collapsible table"
       // data={orderBy(state.data,state.columToSort,state.sortDirection)}
       >
        <TableHead>
        <InputGroup type='text' onChange={srchandling}/>
        <br/>
          <TableRow>
            <TableCell onClick={() => handleSort('checkout_code')} align="left">Sifariş Kodu</TableCell>
            <TableCell align="center">Mağaza Ünvanları</TableCell>
            <TableCell align="center">Alıcı Ünvanı</TableCell>
            <TableCell align="center">Ödəmə Ünvanı</TableCell>
            <TableCell align="center">Qiymət</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Sifariş</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.data.map((row) => (
            <Row linkName={linkName} linkFucn={linkFucn} key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
      <Pagination meta={state.meta&&state.meta} paginationHandling={paginationHandling}/>
    </TableContainer>
  );
}
