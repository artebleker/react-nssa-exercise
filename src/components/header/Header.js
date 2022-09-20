import React from 'react'
import './header.css'
import pokedex from '../../img/pokedex.png'
const Header = () => {
  return (
    <div>
        <img src={pokedex} alt='pokedex' width={"200px"}/>
    </div>
  )
}

export default Header