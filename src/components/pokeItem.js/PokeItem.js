import React from 'react'
import './pokeItem.css'
const PokeItem = ({pokemon}) => {
  return (
    <div>
        <p className='number'>{pokemon.data.id}</p>
        <p className='name'>{pokemon.data.name}</p>
        <img src={pokemon.data.sprites.front_default} alt=''/>
        <div className='type'></div>
    </div>
  )
}

export default PokeItem