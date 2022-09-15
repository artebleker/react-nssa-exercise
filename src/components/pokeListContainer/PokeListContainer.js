import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import PokeList from "../pokeList/PokeList";
import "./pokeListContainer.css";
import TypeSearch from "../typeSearch/TypeSearch";
const PokeListContainer = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    const endPointsPokemon = [];
    for (let i = 1; i <= 20; i++) {
      endPointsPokemon.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    axios
      .all(endPointsPokemon.map((end) => axios.get(end)))
      .then((data) => {
        setPokemonData(data);
      })
      .catch((err) => console.error(err));
    axios
      .get("https://pokeapi.co/api/v2/type?limit=100000&offset=0")
      .then((res) => {
        setTypeList(res.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <TypeSearch typeList={typeList}/>
      {pokemonData.length > 0 ? (
        <PokeList pokedex={pokemonData} />
      ) : (
        <div>
          <p>Loading. . .</p>
        </div>
      )}
    </div>
  );
};

export default memo(PokeListContainer);
