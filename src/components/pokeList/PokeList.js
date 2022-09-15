import React from 'react'
import PokeItem from '../pokeItem.js/PokeItem'
import './pokeList.css'
const PokeList = ({pokedex}) => {
  return (
    <div className='poke-list'>
        {pokedex.map((pokemon, index)=>{
            return(
                <PokeItem key={index} pokemon={pokemon}/>
            )
        })}
    </div>
  )
}

export default PokeList