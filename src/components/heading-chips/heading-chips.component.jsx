import React from 'react';
import Chips from '../chips/chips.component'
import ButtonRating from '../button-rating/buttonRating.component'
import './heading-chips.style.scss';

function Heading(props){
    return(         
             <React.Fragment>                                  
            <div className="text__main display__flex">
            <h4>{props.heading}</h4>
            </div>

            <div className="text__main--sub">
            <p>{props.subtitle}</p>
            </div>

                <div className="info display__flex">
                <span className="text__main--sub2 txt--secondary"> 
                {props.sale}</span>

                <span className="divider"><img src={require('../../assets/images/heading/Divider.svg')} alt=""/></span>

               <Chips   stars={props.stars} rating="(0 rəy)" store="0" />
                </div>
                

            <div className="rating__trend display__flex">
            <ButtonRating name='Yuksek rating' class='bg-gold' icon={require('../../assets/images/icons/star.svg')}/>
            <br/>
            <ButtonRating name='Trend' class='bg-rose' icon={require('../../assets/images/icons/Union.svg')}/>

           
            </div>

       </React.Fragment>
    )
}

export default Heading;

