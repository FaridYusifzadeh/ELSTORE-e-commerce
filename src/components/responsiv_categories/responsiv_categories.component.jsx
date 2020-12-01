import React from 'react'
import  "./responsiv_categories.style.scss";
import { Link } from "react-router-dom";
function ResponsiveCat() {
    return (
    <div className='responsive_nav_bottom'>
        <Link className='responsive_nav_bottom_item' to="/shoes">Shoes <img src={require('../../assets/images/icons/arrowDown.png')} /> </Link>
        <Link className='responsive_nav_bottom_item' to="/underwear">Underwear <img src={require('../../assets/images/icons/arrowDown.png')} /></Link>
    </div>
    )
}

export default ResponsiveCat;
 