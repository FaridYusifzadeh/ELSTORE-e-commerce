import React,{useState} from 'react'
import {IntlProvider} from 'react-intl'

import aze from '../resources/aze.resource.json'
import en from '../resources/en.resource.json'

function LanguagePrivider({children}) {
 const [langData,setLangData]=useState({locale:'en',data:en});

 function languageEventHandler(key){
   switch (key) {
     case 'aze':
       setLangData({locale:key,data:aze});
       break; 
     default:
      setLangData({locale:'en',data:en});
       break;
   }
 };

 return (
  <IntlProvider locale={langData.locale} messages={langData.data} value={languageEventHandler}>
    {children}
  </IntlProvider>
 )
}

export default LanguagePrivider
