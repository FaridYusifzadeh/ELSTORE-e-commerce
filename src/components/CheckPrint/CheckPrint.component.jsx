import React from 'react'
import ReactToPrint from 'react-to-print';
import {Link} from "react-router-dom"
import "../CheckPrint/CheckPrint.scss"
import Button from "../button/button.component"
 
 
 
class ComponentToPrint extends React.Component {
  render() {
      console.log(this.props.total)
    return (
        <div className="container">
        <div className="row">
             <div className="col-lg-12 col-md-12 col-xs-12">
               <div className="check__order">
                     <div className="redirect__page1">
                         <Link className="rediretc__text" to="/">əsas səhifə</Link>
                         <span><img src={require(`../../assets/images/icons/Icon_right.svg`)} alt=""/></span>
                         <Link className="rediretc__text" to="/">sifariş</Link>
                     </div>
                     <div className="orderss">
                         <h5>Sifariş</h5>
                     </div>
                     <div className="order__info">
                         <p>Təşəkkür edirik. Sifarişiniz uğurla tamamlandı. Sizinlə tezliklə əlaqə saxlanılacaq.</p>
                     </div>
                     <div className="orders__code">
                         <p>{`Kod: ${this.props.total.checkout.id}`}</p>
                     </div>
                         <div className="orders_details">
                             <p>Sifarişin detalları</p>
                         </div>
                         <div className="main__orders">
                             <div className="table__info">
                                 <h3>Məhsul</h3>
                                 <h3>Adı</h3>
                                 <h3>Sayı</h3>
                                 <h3>Qiymət</h3>
                             </div>
                             {
                                 this.props.orders.map((x,i)=>{
                                     return(
                                        <div key={i} className="order">
                                        <div className="product_-image">
                                            {
                                                x.images.map((y,i)=>{
                                                    if(y.is_main===1){
                                                       return <img key={i} src={y.product_thumbnail_image} alt=""/>
                                                    }
                                                })
                                            }
                                            
                                        </div>
                                        <h3 className="productss">{x.product_name}</h3>
                                        <h3>{x.count}</h3>
                                        <h3>{x.price} ₼</h3>
                                       </div>
                                     )
                                 })
                             }
                         </div>
                         <div className="client_info">

                             <div className="personal__info">
                                 <h4>Müştəri məlumatları</h4>
                                 <ul>
                                     <li>{`${this.props.total.user.name} ${this.props.total.user.surname}`}</li>
                                     <li>{this.props.total.user.phone}</li>
                                     <li>{this.props.total.user.address}</li>
                                 </ul>
                             </div>
                             <div className="personal__info">
                                 <h4>Tarix</h4>
                                 <ul>
                                     <li>{this.props.total.checkout.date}</li>
                                 </ul>
                             </div>
                             <div className="personal__info">
                                 <h4>Cəm</h4>
                                 <ul>
                                     <li>${this.props.total.totalAmount} ₼</li>
                                 </ul>
                             </div>
                             <div className="personal__info">
                                 <h4>Ödəniş üsulu</h4>
                                 <ul>
                                     <li>Nağd ödəniş</li>
                                 </ul>
                             </div>
                         </div>
                      
               </div>
             </div>
        </div>
     </div>
    );
  }
}
 
class CheckPrint extends React.Component {
  render() {
    return (
      <div>
            <ComponentToPrint orders={this.props.orders} total={this.props.total} ref={el => (this.componentRef = el)} />
        <ReactToPrint
          trigger={() => {
            return   <div className="pdf_top">
            <Button className="pdf__check" name="SiFARiŞi ÇAP ET"/>
           </div>;
          }}
          content={() => this.componentRef}
        />
      
      </div>
    );
  }
}
export default CheckPrint;
  
  
  
