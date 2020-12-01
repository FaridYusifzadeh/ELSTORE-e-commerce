import React from 'react'
import "./pagination.scss"

function Pagination({meta,paginationHandling,prop}){
   
 const pageItems=[]
if(meta){
    for(let i=0;i<meta.last_page;i++){
        if(meta.to!=null){
        pageItems.push(i)
        }
    }
}
    console.log('pagination prop',prop)
    return (
        <div className="pagenation">
            <ul>
                {
                   pageItems.map((x,i)=>{
                    return (
                        meta.current_page==(x+1)? 
                        <li className="focustext activ " tabindex="1"    key={i} onClick={(e)=>paginationHandling(e,prop)}>{x+1}</li>
                        : <li className="focustext  " tabindex="1"    key={i} onClick={(e)=>paginationHandling(e,prop)}>{x+1}</li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default Pagination;
