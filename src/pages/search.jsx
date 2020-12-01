import React, { useContext,useEffect, useState } from 'react';
import '../App.scss';
import { searchContext } from '../contexts/search';
import Filter from '../components/filter/filter.component';
import SearchResultPage from '../components/Search-reasult-page/SearchResult.component.jsx';
import UrlGenerator from '../services/url-generator';
import { appContext } from '../contexts/appContext';
import Pagenation from '../components/Pagination/pagination.component';

function Search(props) {
  let AppContext = useContext(appContext);
  let SearchContext = useContext(searchContext);
  const [key,setKey] = useState('')

  
  function clickHandler(e) {
    console.log(e.target.checked);
    let pageUrl = window.location.pathname;
    let query = '';
    let id = e.target.value;
    let sellerId = '';
    let queries = SearchContext.filter.queryParams;

    if (pageUrl.includes('company')) {
      console.log('props.match.params', props.match.params);
      sellerId =
        Object.keys(props.match.params).length !== 0
          ? props.match.params.id
          : null;
      console.log('sellerId', sellerId);
      query +=
        query !== ''
          ? `&filter[company_id]=${sellerId}`
          : `filter[company_id]=${sellerId}`;
    }
    if (pageUrl.includes('profile')) {
      sellerId = AppContext.app.user.id;
      query +=
        query !== ''
          ? `&filter[company_id]=${sellerId}`
          : `filter[company_id]=${sellerId}`;
    }
    if (SearchContext.filter.queryParams.length > 0) {
      query += query !== '' ? `&filter[category_id]=` : `filter[category_id]=`;
      SearchContext.filter.queryParams.forEach((x, k) => {
        console.log(k);
        k === queries.length - 1 ? (query += `${x}`) : (query += `${x},`);
      });
    }
    if (SearchContext.filter.order !== '') {
      query +=
        query !== ''
          ? `&filter[order]=${SearchContext.filter.order}`
          : `filter[order]=${SearchContext.filter.order}`;
    }

    // if(AppContext.app.isAuthorized){
    //     let store_id=AppContext.app.user.id
    //     query=`filter[company_id]=${store_id}&filter[category_id]=`;
    // }else{
    //     query=`filter[category_id]=`;
    // }
    if (e.target.checked) {
      queries.push(`${id}`);
    } else {
      let newqueries = queries.filter((x) => x !== `${id}`);
      queries = newqueries;
      console.log(newqueries);
    }

{/*    if (SearchContext.filter.queryParams.length > 0) {
      query += query !== '' ? `&filter[category_id]=` : `filter[category_id]=`;
      SearchContext.filter.queryParams.forEach((x, k) => {
        console.log(k);
        k === queries.length - 1 ? (query += `${x}`) : (query += `${x},`);
      });
    }*/}
    if (SearchContext.filter.priceFrom != '') {
      query +=
        query != ''
          ? `&filter[min_prize]=${SearchContext.filter.priceFrom}`
          : `filter[min_prize]=${SearchContext.filter.priceFrom}`;
    }
    if (SearchContext.filter.priceTo != '') {
      query +=
        query != ''
          ? `&filter[max_price]=${SearchContext.filter.priceTo}`
          : `filter[max_price]=${SearchContext.filter.priceTo}`;
    }
    console.log(query);
    let url = UrlGenerator('az', `search/product?${query}`);
    fetch(url)
      .then(async (res) => {
        let data = await res.json();
        console.log(data);
        SearchContext.events.setFilter({
          ...SearchContext.filter,
          queryParams: [...queries],
        });
        SearchContext.events.setCatFilter({
          ...SearchContext.catFilter,
          meta: data.meta,
          data: data.data,
        });
      })
      .catch((err) => console.log(err));
  }

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

  useEffect(() => {
    AppContext.events.mobileSideBarOFF();
  });

  useEffect(()=>{
    console.log("Search",'rendered')
    let query = props.match.params.query;
    setKey(query)
  })

  useEffect(() => {
    let url = UrlGenerator('az', 'search/product');
    let query = props.match.params.query;
    fetch(`${url}?${query}`)
      .then((response) => response.json())
      .then((data) => {
        SearchContext.events.setCatFilter({
          ...SearchContext.catFilter,
          data: data.data,
          meta: data.meta,
        });
        console.log(data);
      });
  },[key]);

  function Pricefrom(e) {
    SearchContext.events.setFilter({
      ...SearchContext.filter,
      PriceFrom: e.target.value,
    });

    let sellerId = '';
    let pageUrl = window.location.pathname;
    let filterQuery = '';
    if (pageUrl.includes('company')) {
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
    if (SearchContext.filter.order !== '') {
      filterQuery +=
        filterQuery !== ''
          ? `&filter[order]=${SearchContext.filter.order}`
          : `filter[order]=${SearchContext.filter.order}`;
    }

    if (SearchContext.filter.priceTo !== '') {
      console.log('priceto');
      filterQuery +=
        filterQuery !== ''
          ? `&filter[max_price]=${SearchContext.filter.priceTo}`
          : `filter[max_price]=${SearchContext.filter.priceTo}`;
    }

    filterQuery += `&filter[min_price]=${e.target.value}`;
    console.log(filterQuery);
    let url = UrlGenerator('az', `search/product?${filterQuery}`);
    fetch(url)
      .then(async (res) => {
        let data = await res.json();
        console.log(data);
        SearchContext.events.setCatFilter({
          ...SearchContext.catFilter,
          meta: data.meta,
          data: data.data,
        });
      })
      .catch((err) => console.log(err));
  }

  function Priceto(e) {
    SearchContext.events.setFilter({
      ...SearchContext.filter,
      Priceto: e.target.value,
    });

    let sellerId = '';
    let pageUrl = window.location.pathname;
    let filterQuery = '';
    if (pageUrl.includes('company')) {
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
    if (SearchContext.filter.order !== '') {
      filterQuery +=
        filterQuery !== ''
          ? `&filter[order]=${SearchContext.filter.order}`
          : `filter[order]=${SearchContext.filter.order}`;
    }

    if (SearchContext.filter.priceFrom !== '') {
      console.log('priceFrom');
      filterQuery +=
        filterQuery !== ''
          ? `&filter[min_price]=${SearchContext.filter.priceFrom}`
          : `filter[min_price]=${SearchContext.filter.priceFrom}`;
    }

    filterQuery += `&filter[max_price]=${e.target.value}`;

    console.log(filterQuery);

    let url = UrlGenerator('az', `search/product?${filterQuery}`);
    fetch(url)
      .then(async (res) => {
        let data = await res.json();
        console.log(data);
        SearchContext.events.setCatFilter({
          ...SearchContext.catFilter,
          meta: data.meta,
          data: data.data,
        });
      })
      .catch((err) => console.log(err));
  }
  // {
  //     products.state.data.filter(item=> products.state.searchKey.toLowerCase().includes(item.product_name.toLowerCase()))
  //     .filter((item)=>{ return item.product_price>=priceFrom &&  item.product_price < priceTo})
  //     .map(({product_price,product_name,product_description})=>{
  //         return(
  //             <div>
  //                 <h2>{product_price}</h2>
  //                 <p>{product_name}</p>
  //                 <p>{product_description}</p>
  //                 <br />
  //                 <br />
  //                 <br />
  //             </div>
  //         )
  //     })
  // }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-3'>
          <Filter
            clickHandler={clickHandler}
            Pricefrom={Pricefrom}
            Priceto={Priceto}
          />
        </div>
        <div className='col-lg-9'>
          {/* {
                 (catFilter.data.data!=undefined)?

                 catFilter.data.data.map(item=>{
                    return( <SearchResultPage  />)
                })
                :''
             } */}
          <SearchResultPage
            handleSelect={selectHandle}
            catFilter={SearchContext.catFilter.data}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
