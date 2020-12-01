import React,{useEffect} from 'react';
import './chips.style.scss';



function Chips({store}){
    let stars=[];
    if(store!=undefined){
        console.log('saalm',store.avg_rating)
        for (let index = 0; index < store.avg_rating; index++) {
             stars.push(<img src={require('../../assets/images/heading/iconka.svg')} alt=""/>)   
        }
    }
        useEffect(()=>{
        },[])
        return(
            <React.Fragment>
                    <div className="star__chips display__flex">
                    
                     <div className="star__text display__flex"> 
                             {stars}
                            <span className="right-line">
                            <img src={require('../../assets/images/heading/Divider.svg')} alt=""/>
                            </span>
                        </div>

                        <div className="heart__text display__flex">
                        <img src={require('../../assets/images/heading/Union.svg')} alt=""/>                                          
                        <h2>{store!==undefined&&store.likes}</h2>
                    </div>            
                    </div>
                    </React.Fragment>  
        

                        )   }


export default Chips;
