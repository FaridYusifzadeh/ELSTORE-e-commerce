import React, { useContext } from 'react'
import { categoryContext } from '../../../contexts/category'
import { Link } from 'react-router-dom'
import GoBack from '../../go-back/go-back.component'
import './mobile-menu-category.scss'


function MobileMenuCategory() {

 const CategoryContext=useContext(categoryContext)

 return (
  <div>
  <GoBack text='Kateqoriyalar' link='/m-categoriy' />
  <div className="main__category--tel">
  <ul>  
  {
     
     Object.keys(CategoryContext.state.categories).map(x=>{
         
          return(  <li onclick={(e)=>{CategoryContext.event.getSubCat(e) }}  data-id={CategoryContext.state.categories[x].id}  className="category__items"    key={CategoryContext.state.categories[x].id}>{CategoryContext.state.categories[x].name} <span ><img  className="icon"   src={require(`../../assets/images/slider/Icon.svg`)} alt=""/></span>
          <div className="submenu">
                      <ul key={x.id}>
                       { 
                           CategoryContext.state.categories[x].children!==null?
                          CategoryContext.state.categories[x].children.map(y=>{
                            return  <Link to={`/search/filter[category_id]=${y.id}`}><li>{y.name}</li></Link>
                           })
                          :null
                       }
                      </ul>
              </div>
          </li>
          )
      })
      
  }
  </ul>
</div>
  </div>
 )
}

export default MobileMenuCategory
