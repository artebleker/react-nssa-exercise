import React , {useState, memo, useEffect} from 'react'
import axios from 'axios'
const PokeAbility = ({ability}) => {
const [isModalAbility, setIsModalAbility] = useState(false)
const [abilityData, setAbilityData] = useState([])

useEffect(() => {
    const endPointPokemon = `https://pokeapi.co/api/v2/ability/${ability}`;
    axios
      .get(endPointPokemon)
      .then((data) => {
        setAbilityData(data);

      })
      .catch((err) => console.error(err));
    }, [ability]);
// console.log(abilityData.data.effect_entries[0].effect)
  return (
    <div>
<button onClick={()=> setIsModalAbility(!isModalAbility)}>{ability}</button>
<div className={isModalAbility? 'abilityOn' : 'abilityOff'}>
{/* <p>{abilityData.data.effect_entries[1].effect}</p> */}
</div>
    </div>
  )
}

export default memo(PokeAbility)