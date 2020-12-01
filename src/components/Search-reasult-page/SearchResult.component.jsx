import React, { useContext } from 'react';
import { searchContext } from '../../contexts/search';
import './SearchResult.component.scss';
import SelectBox from '../Select-box/SelectBox.component';
import SearchResultComp from '../search-result-component/SearchResultComp.component';

const sortings = [
  {
    id: 0,
    name: 'Ada görə',
  },
  {
    id: 1,
    name: 'Yaranma tarixə görə',
  },
  {
    id: 2,
    name: 'Reytinqə görə',
  },
];

function SearchResult(props) {
  const products = useContext(searchContext);
  return (
    <section className='search_result__section'>
      <div className='search_result_content'>
        <SelectBox
          handleChange={props.handleSelect}
          options={sortings}
          firstopt="Seçin"
          class='search_re'
        />
      </div>
      <SearchResultComp
        catFilter={props.catFilter}
        data={products.state.filteredData}
      />
    </section>
  );
}

export default SearchResult;
