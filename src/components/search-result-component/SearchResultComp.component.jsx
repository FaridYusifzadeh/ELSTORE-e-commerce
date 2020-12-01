import React, { useContext } from 'react';
import ProductCardItem from '../product-card-item/product-cart-item.component';
import Pagenation from '../Pagination/pagination.component';
import { searchContext } from '../../contexts/search';
// import { appContext } from '../../contexts/appContext';

import './SearchResultComp.component.scss';
function SearchResultComp(props) {
  // let AppContext = useContext(appContext);
  let SearchContext = useContext(searchContext);
  return (
    <section className='search_result__section'>
      <div className='search_result__content'>
        {props.catFilter !== undefined && props.catFilter.length > 0
          ? props.catFilter.map((y) => <ProductCardItem data={y} />)
            : props.data !== undefined
          ? props.data.map((x) => <ProductCardItem data={x} />)
          : null}
      </div>

      <Pagenation
        prop={props}
        paginationHandling={SearchContext.events.PagenationHandling}
        meta={SearchContext.catFilter.meta}
      />
    </section>
  );
}

export default SearchResultComp;
