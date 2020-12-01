import React,{useEffect,useContext,useState} from 'react'
import UrlGenerator from '../../services/url-generator'
import './heartImage.component.scss';
import {appContext} from '../../contexts/appContext'

function HeartImage({id,isLiked,clas}) {

    const AppContetx=useContext(appContext);
    const [like,setLike]=useState(false)
    useEffect(()=>{
        setLike(isLiked)
    },[])

    function showHide(e){
        let id=e.currentTarget.getAttribute('data-id');
        let url=UrlGenerator('az','users/like');
        let token=AppContetx.events.getToken();
        if(token!==null){
            fetch(url,{
                headers:{
                 'Content-Type':'application/json',
                 'Authorization':`${token.token_type} ${token.access_token}`
                },
                method:'Post',
                body:JSON.stringify({type:'product',liketable_id:id,action_type:like?'dislike':'like'})
            }).then( response=>{
                if(!response.ok){
                    document.getElementById('login__modal').style.display='block'
                }else{
                    setLike(!like);
                }
            })
            .catch(()=>document.getElementById('login__modal').style.display='block')
        }else{
            document.getElementById('login__modal').style.display='block';
        }

        // let firstImg = document.querySelector('.hearts_icon')
        // if(firstImg.childNodes[0].style.display === 'block'){
        //     firstImg.childNodes[0].style.display = 'none';
        //     firstImg.childNodes[1].style.display = 'block';
        // }else{
        //     firstImg.childNodes[1].style.display = 'none';
        //     firstImg.childNodes[0].style.display = 'block';
        // }
    }
    return (
        <div data-id={id} onClick={(e)=>showHide(e)} className={`hearts_icon ${clas}`}>
            {
                like?
                (<img src={require('../../assets/images/icons/Active.svg')} alt=""/>):
                (<img src={require('../../assets/images/icons/Enabled.svg')} alt=""/>)
            }
        </div>
    )
}

export default React.memo(HeartImage)
