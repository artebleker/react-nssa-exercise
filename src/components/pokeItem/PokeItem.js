import React from "react";
import "./pokeItem.css";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";
const PokeItem = ({ pokemon }) => {
  return (
    <>
      <Link to={`/detail?pokemon=${pokemon.data.name}`}>
        <div>
          <p className="number">{pokemon.data.id}</p>
          <p className="name">{pokemon.data.name}</p>
          <img src={pokemon.data.sprites.front_default} alt="" />
          <div className="type">
            {pokemon.data.types.map((type) => (
              <img src={images.find((f)=>f.name === type.type.name).img} alt={type.type.name}/>
                         
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default PokeItem;
