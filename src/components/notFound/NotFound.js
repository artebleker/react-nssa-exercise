import React from 'react'
import './notFound.css'
import notFound from '../../img/notFound.jpg'
const NotFound = () => {
  return (
    <div>
<h1>Page not found</h1>
<h1>404</h1>
<img src={notFound} alt='Not Found'/>
    </div>
  )
}

export default NotFound