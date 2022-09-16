import React , {useState, useEffect} from "react";
import "./pokeDetail.css";
import axios from "axios";
const PokeDetail = ({ pokemon }) => {

const [types, setTypes] = useState("")
  useEffect(() => {
    const endPointsPokemon = [];
    for (let i = 1; i <= 20; i++) {
      endPointsPokemon.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    axios
      .all(endPointsPokemon.map((end) => axios.get(end)))
      .then((data) => {
        setTypes(data);
      })
      .catch((err) => console.error(err));
   
  }, []);

  return (
    <div>
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
        {pokemon.data.types.map((type) => (
          <p>{type.type.name}</p>
        ))}
      </div>
    </div>
  );
};

export default PokeDetail;
