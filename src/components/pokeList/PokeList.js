import React from 'react'
import PokeItem from '../pokeItem/PokeItem'
import './pokeList.css'
const PokeList = ({pokedex}) => {

  return (
    <>
    {pokedex.length <= 0 ?
      <div className='poke-list'>
        <p>0 Pokemons Found</p>
      </div>
      :
      <div className='poke-list'>
        {pokedex.map((pokemon, index)=>{
            return(
              
                <PokeItem key={index} pokemon={pokemon}/>
              
                )
        })}
    </div>
  }
  </>
  )
}

export default PokeList