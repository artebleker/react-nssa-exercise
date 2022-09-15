import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeList from "../pokeList/PokeList";
import './pokeListContainer.css'
const PokeListContainer = () => {
  
  const [pokedex, setPokex] = useState([]);

  useEffect(() => {
    const endPoint = "https://pokeapi.co/api/v2/pokemon/?limit=8000"
    axios
      .get(endPoint)
      .then((res) => {
        const apiData = res.data;
        setPokex(apiData.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setPokex]);
  return (
    <div>
      <PokeList pokedex={pokedex} />
    </div>
  );
};

export default PokeListContainer;
