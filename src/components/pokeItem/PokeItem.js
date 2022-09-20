import React from "react";
import "./pokeItem.css";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import noImage from '../../img/noImage.png'
const PokeItem = ({ pokemon }) => {
  return (
    <>
      <Link to={`/detail?pokemon=${pokemon.data.name}`} onClick={window.scrollTo(0, 0)}>
        <div className="poke-item">
        <div className="poke-number-name">
          <p >N° {pokemon.data.id}</p>
          <p >{pokemon.data.name.toUpperCase()}</p>
            </div>
          <img src={pokemon.data.sprites.front_default  || noImage} alt="" />
          <div className="poke-type">
            {pokemon.data.types.map((type, index) => (
              <img key={index} src={images.find((f)=>f.name === type.type.name).img} alt={type.type.name}/>
                         
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default PokeItem;
