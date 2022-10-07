import React, { useState, memo, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
const PokeAbility = ({ ability, abilityImg }) => {
  const [isModalAbility, setIsModalAbility] = useState(false);
  const [abilityData, setAbilityData] = useState([]);

  // const error = useNavigate();
  useEffect(() => {
    const endPointPokemon = `https://pokeapi.co/api/v2/ability/${ability}`;
    axios
      .get(endPointPokemon)
      .then((data) => {
        setAbilityData(data);
      })
      .catch((err) => {
        console.error(err);
        // error("*");
      });
  }, [ability]);

  return (
    <div>
      <button onClick={() => setIsModalAbility(!isModalAbility)}>
        <h3>{ability.toUpperCase()}</h3>
      </button>
      <div
        className={
          isModalAbility ? "ability-on ability-container" : "ability-off"
        }
      >
        {abilityImg && <img src={abilityImg} alt="Ability" />}
        {abilityData.data && <p>{abilityData.data.effect_entries[1].effect}</p> }   
      </div>
    </div>
  );
};

export default memo(PokeAbility);