import React, { useRef, useEffect, useState } from 'react'
import './tt-autocomplete-input.scss'
import TTLIstItem from './tt-autocomplete-list-item'
import mapUrlGenerator from '../../services/mapUrlGenerator';
import Input from '../InputGroup/InputGroup.component'

function TTAutocomplete({style,name,validation,getPosition,helper,id}) {

   const [autocomplete,setavtocomplete]=useState([]);

   const ttInputRef=useRef();
   const autocompleteItems=useRef();
   const autocompleteItem=useRef([]);
   let currentFocus=''

   let searchchange=(e)=>{
    let url=mapUrlGenerator(e.target.value)
    fetch(url)
    .then(async res=>{
      let data=await res.json();
      if(Array.isArray(data.results)){
        setavtocomplete([
          ...data.results
        ])
      }
    })
}

   function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  };


  function closeAllLists(elmnt) {
  setavtocomplete([]);
}

  function removeActive(x) {
   /*a function to remove the "active" class from all autocomplete items:*/
   for (var i = 0; i < x.length; i++) {
     x[i].classList.remove("autocomplete-active");
   }
 };

    const inputKeydown=(e)=>{
     var x = autocompleteItems.current;
     if (x) x = x.getElementsByTagName("div");
     if (e.keyCode == 40) {
       /*If the arrow DOWN key is pressed,
       increase the currentFocus variable:*/
       currentFocus++;
       /*and and make the current item more visible:*/
       addActive(x);
     } else if (e.keyCode == 38) { //up
       /*If the arrow UP key is pressed,
       decrease the currentFocus variable:*/
       currentFocus--;
       /*and and make the current item more visible:*/
       addActive(x);
     } else if (e.keyCode == 13) {
       /*If the ENTER key is pressed, prevent the form from being submitted,*/
       e.preventDefault();
       if (currentFocus > -1) {
         /*and simulate a click on the "active" item:*/
         if (x) x[currentFocus].click();
       }
     }
    }

    const itemEventListener=(ttInputRef,e)=>{
       let name = e.target.getAttribute('data-name')
       let position =JSON.parse(e.target.getAttribute('data-position'));
       console.log("position",position)
       ttInputRef.current.value = name;
       getPosition(name,position)
        closeAllLists()
    }

   useEffect(()=>{
    document.addEventListener("click", function (e) {
     //closeAllLists(e.target);
 });
   })
   
 return (
  <div className="autocomplete" style={{"width":"100%"},style}>
    <Input 
           register={(e)=>{ttInputRef.current=e;validation();}}
           helper={helper}
           onKeyDown={inputKeydown}
           onChange={searchchange}
           id={id} 
           type="text" 
           name={name} 
           placeholder="adres"/>
    <div className='autocomplete-items' ref={autocompleteItems}>
      {
        autocomplete.map((x,i)=>{
         return(
           <TTLIstItem key={i}
                       val={ttInputRef.current.value} 
                       name={x}
                       reff={(e)=>autocompleteItem.current.push(e)}
                       refProp={ttInputRef} 
                       click={itemEventListener}/>
         )
        })
      }
    </div>
  </div>
 )
}

export default React.memo(TTAutocomplete)
