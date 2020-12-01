import React, { useContext } from 'react'
import CheckPrint from '../components/CheckPrint/CheckPrint.component'
import {appContext} from '../contexts/appContext'

function OrderCheck() {
 const AppContext=useContext(appContext)
 return (
  <CheckPrint orders={AppContext.basket} total={AppContext.total}/>
 )
}

export default OrderCheck
