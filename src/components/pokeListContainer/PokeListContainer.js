import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import PokeList from "../pokeList/PokeList";
import "./pokeListContainer.css";
import TypeSearch from "../typeSearch/TypeSearch";
import Loader from "../loader/Loader";
import UpButton from '../upButton/UpButton'
import { useNavigate } from "react-router-dom";
const PokeListContainer = () => {
  // Data list of all pokemons
  const [pokemonData, setPokemonData] = useState([]);
  // Loading
  const [isLoading, setIsLoading] = useState(true);

  // Name list of all types
  const [typeList, setTypeList] = useState([]);

  // Type selected
  const [queryType, setQueryType] = useState("");

  const error = useNavigate();
  useEffect(() => {
    const endPointsPokemon = [];
    for (let i = 1; i <= 905; i++) {
      //905
      endPointsPokemon.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    axios
      .all(endPointsPokemon.map((end) => axios.get(end)))
      .then((data) => {
        setPokemonData(data);
        setIsLoading(false);
      })
      .catch((err) => {console.error(err); error('*')})
    axios
      .get("https://pokeapi.co/api/v2/type?limit=100000&offset=0")
      .then((res) => {
        setTypeList(res.data.results);
      })
      .catch((err) => {console.error(err); error('*')})
  }, []);

  return (
    <div className="poke-list-container">
      <TypeSearch
        typeList={typeList}
        queryType={queryType}
        setQueryType={setQueryType}
      />
      {
        queryType !== "" &&
      <h3 className="choosen-type">Pokemon Choosen Type: {queryType.toUpperCase()}</h3>
      }
      {isLoading ? (
        <div>
          <Loader/>
        </div>
      ) : (
        <div>
          <PokeList
            pokedex={
              queryType === ""
                ? pokemonData
                : pokemonData.filter((f) =>
                    f.data.types.map((m) => m.type.name).includes(queryType)
                  )
            }
          />
          <UpButton/>
        </div>
      )}
    </div>
  );
};

export default memo(PokeListContainer);
