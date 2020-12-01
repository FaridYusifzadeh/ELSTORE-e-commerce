import React, { useEffect, useState, useContext } from 'react';
import './basket_card.component.scss';
import '../../assets/sass/abstracts/_text.scss';
import { appContext } from '../../contexts/appContext';
import UrlGenerator from '../../services/url-generator';

function BasketCard({ plus, minus, count, product }) {

    const [like, setLike] = useState(false)
    const AppContetx = useContext(appContext)

    useEffect(() => {
        setLike(product.isLiked)
    }, [])

    

      
    function removeFromBasket(e) {
        let id = e.target.getAttribute('data-id');
        let bask = AppContetx.basket.filter(x => x.id != id)
        AppContetx.events.setBasket([
            ...AppContetx.basket,
            ...bask

        ])
    }

    function showHide(e) {
        let id = e.currentTarget.getAttribute('data-id');
        let url = UrlGenerator('az', 'users/like');
        let token = AppContetx.events.getToken();
        if (token !== null) {
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token.token_type} ${token.access_token}`
                },
                method: 'Post',
                body: JSON.stringify({ type: 'product', liketable_id: id, action_type: like ? 'dislike' : 'like' })
            }).then(response => {
                if (!response.ok) {
                    document.getElementById('login__modal').style.display = 'block'
                } else {
                    setLike(!like);
                }
            })
                .catch(() => document.getElementById('login__modal').style.display = 'block')
        } else {
            document.getElementById('login__modal').style.display = 'block';
        }
    }
    return (
        <div className='basket__card'>
            {/*<button className='basket_header_text'>Bu məhsul yalnız Bakı şəhəri daxilində çatdırılır.</button>*/}
            <div className='card-flex'>
                <div className='card_left'>
                    {
                        product.images.map(x => {
                            if (x.is_main) {
                                return <img alt='' className='basket_card_img' src={x.product_thumbnail_image} />
                            }
                        })
                    }
                </div>
                <div className='card_center'>
                    <div className='basket_name_for_responsivity'>
                        <h1 className='baskert_card_header'>{product.product_name} </h1>
                        <div><span className='basket_card_firm '>{product.seller.name}</span><span className='basket_card_firm_height text--secondary'></span>  <span className='basket_card_selling'>dəfə satıldı</span> </div>
                    </div>
                    {/* <div className="infor_respon">
                        <div className='basket_card_checkboxdiv'>
                            <form><input type='checkbox' /><span className='basket__form__text'>H?diyy? paketi olaraq hazırlansın (+2 AZN)</span> </form>
                        </div>
                    </div> */}
                </div>
                <div className='card_right price_div '>
                    <div className='basket_price'>
                        <div>
                        {
                            product.discount>0?
                            (
                                <>
                                <p className='product-discount'>{product.discount} % endirim</p>
                                <p>
                                <h2 className='basket_price_head'>{product.discount_price} AZN</h2>
                                <del>{product.price} AZN</del>
                                </p>
                                </>
                            ):<h2 className='basket_price_head'>{product.discount_price} AZN</h2>
                        }
                            
                            
                        </div>
                        <div className='add_minus'>
                            <button data-id={product.id} onClick={(e) => { minus(e) }} className='add_minus_button'>-</button>
                            <button className='add_minus_text'>{product.count}</button>
                            <button data-id={product.id} onClick={(e) => { plus(e) }} className='add_plus_button'>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="basket_info">
                <div className='basket_order_details'>
                    <h6 className='basket_order_details_head accordion'>Sİfarİş qeydlərİ <span><img alt='' src={require('../../assets/images/icons/arrowDown.png')} /></span></h6>
                    <p className='basket_order_details_text panel'>
                        {product.product_description}
                        <div><a href='#'>Düzəliş et</a></div>
                    </p>
                </div>
{/*                <div className='basket_card_shipping_section'>
                    <h5 className='basket_card_shipping_section_head'>çatdırılma</h5>
                    <p className='basket_card_shipping_section_text' >Pulsuz (Bakı daxili)</p>
                </div>*/}
            </div>
            <div className='basket_bottom_buttons'>
                {
                    like ? <button data-id={product.id} onClick={(e) => showHide(e)} className='basket_bottom_button'><img alt='' className='basket_bottom_button_img' src={require('../../assets/images/icons/Active2.svg')} />UnLike</button>
                    
                   
                        :  <button data-id={product.id} onClick={(e) => showHide(e)} className='basket_bottom_button'><img alt='' className='basket_bottom_button_img' src={require('../../assets/images/icons/Enabled.svg')} />LIke</button>

                }
                <button data-id={product.id} onClick={(e) => AppContetx.events.removeFromBasket(e)} className='basket_bottom_button'>SİL</button>
            </div>
        </div>
    )
}

export default React.memo(BasketCard);