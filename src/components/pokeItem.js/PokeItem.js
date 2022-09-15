import React from 'react'
import './pokeItem.css'
const PokeItem = ({pokemon}) => {
  return (
    <div>
        <p className='number'>{pokemon.name}</p>
        <p className='name'></p>
        <img src='' alt=''/>
        <div className='type'></div>
    </div>
  )
}

export default PokeItem