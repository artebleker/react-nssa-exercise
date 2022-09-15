import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeList from "../pokeList/PokeList";
import './pokeListContainer.css'
const PokeListContainer = () => {
  
  const [pokemonData, setPokemonData] = useState([]);


  useEffect(() => {
  const endPointsPokemon = [];
    for (let i = 1; i <= 898; i++) {
      endPointsPokemon.push(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );
    }

    axios
      .all(endPointsPokemon.map((end) => axios.get(end)))
      .then((data) => {
        setPokemonData(data);
      })
      .catch((err) => console.error(err));
      
  }, []);
  return (
    <div>
      <PokeList pokedex={pokemonData} />
    </div>
  );
};

export default PokeListContainer;
