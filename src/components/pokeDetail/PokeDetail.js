import React, { useState, useEffect } from "react";
import "./pokeDetail.css";
import axios from "axios";
import { Link } from "react-router-dom";
const PokeDetail = () => {
  const [types, setTypes] = useState([]);
  let query = new URLSearchParams(window.location.search);
  let pokemonQuery = query.get("pokemon");

  function getTypes(pokemon) {
    const endPointsTypes = [];
    for (let i = 0; i < pokemon.data.types.length; i++) {
      endPointsTypes.push(
        `https://pokeapi.co/api/v2/type/${pokemon.data.types[i].type.name}`
      );
    }
    axios
      .all(endPointsTypes.map((end) => axios.get(end)))
      .then((data) => {
          let temporalWeaknessArray= []
    for (let i = 0; i < data.length; i++) {
      temporalWeaknessArray.push(data
        .map((m) => m.data.damage_relations.double_damage_from)
        [i].map((m) => m.name))
        
      }
      setTypes(temporalWeaknessArray.flatMap((result) => result))
      })
      .catch((err) => console.error(err));
     
    }

  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    const endPointPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`;
    axios
      .get(endPointPokemon)
      .then((data) => {
        setPokemon(data);
        getTypes(data);
      })
      .catch((err) => console.error(err));
      
    }, [pokemonQuery]);
    
  
  return (
    <div>
      <Link to={"/"}>Back </Link>
      {pokemon ? (
        <>
          <div className="header-detail">
            <p className="number-detail">{pokemon.data.id}</p>
            <p className="name-detail">{pokemon.data.name}</p>
          </div>
          <img className="" src={pokemon.data.sprites.front_default} alt="" />
          <div className="type-detail">
            <p>Type</p>
            {pokemon.data.types.map((type) => (
              <p>{type.type.name}</p>
            ))}
          </div>
          <div className="type-detail">
            <p>Weakness</p>
            {types.map((weak)=>{
              return(
                <p>{weak}</p>
              )
            })}
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default PokeDetail;
