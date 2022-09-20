import React, {memo} from 'react'
import PokeItem from '../pokeItem/PokeItem'
import './pokeList.css'
const PokeList = ({pokedex}) => {

  return (
    <>
    {pokedex.length <= 0 ?
      <div>
        <h3 className='choosen-type'>No Pokemon Found</h3>
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

export default memo(PokeList)