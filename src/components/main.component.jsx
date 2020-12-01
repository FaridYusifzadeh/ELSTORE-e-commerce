import React from 'react';

import './main.component.scss';



import AboutProduct from './About-product/About-product.component';
import DeliverInfo from './Deliver-info/Deliver-info.component';
import SearchResult from '../components/Search-reasult-page/SearchResult.component'


function Main(){
    return(
        <section className="main_section">
            <div className="container-fluid">
                <div className="main_row">
                    <div className="main_left_column">
                        <h1>edede</h1>
                    </div>
                    <div className="main_right_column">
                        <SearchResult/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main;