import React, {useEffect,useState,useContext} from 'react'
import "../Category/Category.scss"
import { categoryContext } from "../../contexts/category";
import {Link} from 'react-router-dom'
const Category = () => {
    const CategoryContext = useContext(categoryContext)

  
    
    function handleClick() {
        let boxCategory=document.querySelector(".box--category");
        let box__subcotegoryItem=document.querySelectorAll(".box_subcotegory--item");
        
        setTimeout(() => {
            box__subcotegoryItem.forEach(x=>{
                x.style.display="block";
                x.style.transition="0.5s ease";
            })
        }, 1200);
        
        setTimeout(() => {
            boxCategory.style.transition="0.2s ease";
            boxCategory.style.width="300%";
        }, 200);
               
       }

      


        // function CategoryLeave(){

        //     setTimeout(() => {
        //         let boxCategory=document.querySelector(".box--category");
        //         let box__subcotegoryItem=document.querySelectorAll(".box_subcotegory--item");
        
        //                box__subcotegoryItem.forEach(x=>{
        //                     x.style.display="none";
        //                     x.style.transition="0.3s ease";
        //                 })
        //                 boxCategory.style.width="0px";
        //     }, 1000);
           
        // }
        
       
       
    useEffect(() => {
        let body=document.querySelector(".box__category");
        setTimeout(() => {
            body.addEventListener("mouseleave",function(e){
                let boxCategory=document.querySelector(".box--category");
                let box__subcotegoryItem=document.querySelectorAll(".box_subcotegory--item");
                if(e.path[5]!=boxCategory ){
                    box__subcotegoryItem.forEach(x=>{
                        x.style.display="none";
                        x.style.transition="0.5s ease";
                    })
                    boxCategory.style.width="0px";
                } 
            })
        }, 2000);
    }, []);
       

    
    let SubCategories=[];
    if(CategoryContext.state.childrens.children!==undefined){
       
        SubCategories=CategoryContext.state.childrens.children.map(x=>{
            return <ul key={x.id} className="box--subcotegory_flexx">
            <li  className="box__subcotegory--item">
            <Link to={`/search/filter[category_id]=${x.id}`} className="box--subcotegory">{x.name}</Link>
                <ul>
                {(x.children != null) ? x.children.map(y=>{return <li data-id=""><Link to={`/search/filter[category_id]=${y.id}`}>{y.name}</Link></li>}):''}
                </ul>
            </li>
           </ul>
        })                 
    }

    return (
                    <>
                    <div>
                    <div className="box__category" >
                        <ul>
                            {
                                CategoryContext.state.categories.map(x=>{
                                    return  <Link style={{textDecoration: "none"}} to={`/search/filter[category_id]=${x.id}`}><li className="category__items" key={x.id}>{x.name} <span ><img onMouseOver={(e)=>{CategoryContext.event.getSubCat(e);handleClick()}} data-id={x.id} className="icon"   src={require(`../../assets/images/slider/Icon.svg`)} alt=""/></span></li></Link>
                                })
                            }
                        </ul>
  
                        
                        <div className="box--category"   >
                            <div className="display__flex">
                                <div className="box__subcotegory">
                                {SubCategories}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    </div>
    </>
    )
}

export default Category;