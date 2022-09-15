import React from 'react'
import './pokeItem.css'
const PokeItem = ({pokemon}) => {
  console.log(pokemon.data)
  return (
    <div>
        <p className='number'>{pokemon.data.id}</p>
        <p className='name'>{pokemon.data.name}</p>
        <img src={pokemon.data.sprites.front_default} alt=''/>
        <div className='type'>{pokemon.data.types.map((type)=>
          <p>{type.type.name}</p>
        )}</div>
    </div>
  )
}

export default PokeItem