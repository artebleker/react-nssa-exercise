import React, { useState, memo, useEffect } from "react";
import axios from "axios";
import Loader from "../loader/Loader";

const PokeAbility = ({ ability, abilityImg }) => {
  const [isModalAbility, setIsModalAbility] = useState(false);
  const [abilityData, setAbilityData] = useState([]);

  useEffect(() => {
    const endPointPokemon = `https://pokeapi.co/api/v2/ability/${ability}`;
    axios
      .get(endPointPokemon)
      .then((data) => {
        setAbilityData(data);
      })
      .catch((err) => console.error(err));
  }, [ability]);
  
  return (
    <div>
      <button onClick={() => setIsModalAbility(!isModalAbility)}>
        {ability}
      </button>
      <div className={isModalAbility ? "ability-on" : "ability-off"}>
        {abilityImg?
            <img src={abilityImg} alt=""/>
            :
            <div></div>
        }
        {abilityData.data ? (
          <p>{abilityData.data.effect_entries[1].effect}</p>
        ) : (
         <div>
          <Loader/>
          </div>
        )}

      </div>
    </div>
  );
};

export default memo(PokeAbility);
