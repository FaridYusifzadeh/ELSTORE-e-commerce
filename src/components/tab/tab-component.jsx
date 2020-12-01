import React from 'react'
import './tab.component.scss'


function Tab({children,clas,id}) {

 function getId(e) {
  e.preventDefault();
  var id=e.target.getAttribute('data-id')
  var x = document.getElementsByClassName(clas);
  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(id).style.display = "block";  
}
    

 return (
  <div>
  <div className="w3-bar w3-black">
  <div className='tab-btns cntr'> 
  <div className="w3-bar-item w3-button"  id='az' data-id={`az-${id}`} onClick={(e)=>getId(e)} >Azərbaycan</div>
  <div className="w3-bar-item w3-button" id='en' data-id={`en-${id}`} onClick={(e)=>getId(e)} >English</div>
  <div className="w3-bar-item w3-button" id='ru' data-id={`ru-${id}`} onClick={(e)=>getId(e)} >Russian</div>
  </div>

  {
   children
  }
</div>
  
  </div>
 )
}


function TabPage({children,id,style,clas,lang}) {
 return(
  <div id={id} data-lang={lang} className={`w3-container ${clas}`} style={style}>
    {children}
 </div>
 )
}
Tab.Page=TabPage
export default Tab




