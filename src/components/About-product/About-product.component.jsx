import React from 'react';
import './About-product.component.scss';
import Db from '../../contexts/db.json';
import ReactHtmlParser from 'react-html-parser'; 


const data = Db.aboutProduct;

function AboutProduct(props){

    function showButton(){
       let aboutProductContent = document.getElementById('aboutContent');
       let showMore = document.getElementById('showMore');
       aboutProductContent.style.height = "100%";
       aboutProductContent.style.overflow = "auto";
       showMore.style.display = "none";

    }

    return(
        <section className="about__product__section">
            {
                data.map(s => 
                    (
                    <div key={s.id}>
                        <div className="about__product__title">
                            <h4>{s.title}</h4>
                        </div>
                        <div id="aboutContent" className="about__product__content">
                            <p>
                             {ReactHtmlParser(props.about)}
                            </p>
                        </div>
                        <button id="showMore" onClick={showButton}>Davamını oxu</button>
                    </div>
                ))
            }
        </section>
    )
}

export default AboutProduct;