import React from 'react'
import Headers from '../Header'
import Home from './Home'
import { useLocation } from 'react-router-dom'


function MainHome() {
  const location  = useLocation()
  const data = location.state?.data.name;
  return (
    <div>
      <Headers  data = {data}/>
      
      <Home />
    </div>
  )
}

export default MainHome
