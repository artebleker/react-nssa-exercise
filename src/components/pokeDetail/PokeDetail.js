import React, { useState, useEffect, memo } from "react";
import "./pokeDetail.css";
import axios from "axios";
import { Link } from "react-router-dom";
import PokeAbility from "./PokeAbility";
import PokeItem from "../pokeItem/PokeItem";
import Loader from "../loader/Loader";
import PokeStrengthAndWeakness from "./PokeStrengthAndWeakness";
import noImage from '../../img/noImage.png'
import { images } from "../../assets/images";
const PokeDetail = () => {
  const [weaknessTypes, setWeaknessTypes] = useState([]);
  const [strengthTypes, setStrengthTypes] = useState([]);
  const [resistenToTypes, setResistenToTypes] = useState([]);
  const [noDamageFromTypes, setNoDamageFromTypes] = useState([]);
  let query = new URLSearchParams(window.location.search);
  let pokemonQuery = query.get("pokemon");

  function removeDuplicates(arr) {
    arr = arr.flatMap((result) => result);
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

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
        let temporalWeaknessArray = [];
        for (let i = 0; i < data.length; i++) {
          temporalWeaknessArray.push(
            data
              .map((m) => m.data.damage_relations.double_damage_from)
              [i].map((m) => m.name)
          );
        }
        let temporalStrengthArray = [];
        for (let i = 0; i < data.length; i++) {
          temporalStrengthArray.push(
            data
              .map((m) => m.data.damage_relations.double_damage_to)
              [i].map((m) => m.name)
          );
        }
        let temporalResistentToArray = [];
        for (let i = 0; i < data.length; i++) {
          temporalResistentToArray.push(
            data
              .map((m) => m.data.damage_relations.half_damage_from)
              [i].map((m) => m.name)
          );
        }
        let temporalNoDamageFromArray = [];
        for (let i = 0; i < data.length; i++) {
          temporalNoDamageFromArray.push(
            data
              .map((m) => m.data.damage_relations.no_damage_from)
              [i].map((m) => m.name)
          );
        }
        setWeaknessTypes(removeDuplicates(temporalWeaknessArray));
        setStrengthTypes(removeDuplicates(temporalStrengthArray));
        setResistenToTypes(removeDuplicates(temporalResistentToArray));
        setNoDamageFromTypes(removeDuplicates(temporalNoDamageFromArray));
      })
      .catch((err) => console.error(err));
  }

  const [evolutionChain, setEvolutionChain] = useState([]);

  function getEvolution(pokemon) {
    let evolutions = [];
    axios
      .get(pokemon.data.species.url)
      .then((dataSpecies) => {
        axios
          .get(dataSpecies.data.evolution_chain.url)
          .then((dataEvolution) => {
            if (dataEvolution.data.chain.evolves_to.length) {
              evolutions.push(dataEvolution.data.chain.species.name);
              evolutions.push(
                dataEvolution.data.chain.evolves_to[0].species.name
              );
              if (dataEvolution.data.chain.evolves_to[0]["evolves_to"].length) {
                evolutions.push(
                  dataEvolution.data.chain.evolves_to[0].evolves_to[0].species
                    .name
                );
              }

              let endPointEvolutionChain = [];
              for (let i = 0; i < evolutions.length; i++) {
                endPointEvolutionChain.push(
                  `https://pokeapi.co/api/v2/pokemon/${evolutions[i]}`
                );
              }
              axios
                .all(endPointEvolutionChain.map((end) => axios.get(end)))
                .then((res) => setEvolutionChain(res))
                .catch((err) => console.err(err));
            }
          })

          .catch((err) => console.error(err));
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
        getEvolution(data);
      })
      .catch((err) => console.error(err));
  }, [pokemonQuery]);

  return (
    <>     
    <button className="back-button" onClick={(e)=>e.preventDefault()}> <Link to={"/"}>Go Back ! </Link></button>
    <div className="poke-detail">
      {pokemon ? (
        <>

          <div className="header-detail">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className={
              pokemon.data.id > 1 ? "button-display-on" : "button-display-off"
            }
          >
            <Link to={`/detail?pokemon=${pokemon.data.id - 1}`}><div className="button-left"></div></Link>
          </button>
            <h3 >N° {pokemon.data.id}</h3>
            <h1 >{pokemon.data.name.toUpperCase()}</h1>
            <button
            onClick={() => {
              window.location.reload();
            }}
            className={
              pokemon.data.id < 905 ? "button-display-on" : "button-display-off"
            }
          >
            <Link to={`/detail?pokemon=${pokemon.data.id + 1}`}><div className="button-right"></div> </Link>
          </button>
          </div>

          <img 
            src={pokemon.data.sprites.other["official-artwork"].front_default || noImage}
            alt={pokemon.data.name}
          />
            <div className="type-detail">
            <div >
            <h3>Type</h3>
            <div className="type-detail-div">
            {pokemon.data.types.map((type) => (
              <div>
              <img src={images.find((f)=>f.name === type.type.name).img} alt={type.type.name}/>
                <h4>{type.type.name.toUpperCase()}</h4>
                </div>
                ))}
                </div>
                </div>
          <div >
          <h3>Height</h3>
          <p>{pokemon.data.height / 10}m</p>
          </div>
          <div >
          <h3>Weight</h3>
          <p>{pokemon.data.weight / 10}kg</p>
          </div>
          </div>
          
          <div className="stats-container">
            <h3>STATS</h3>
            <ul className="stats-container-grid">
              {pokemon.data.stats.map((stat, index) => {
                return (
                  <li key={index}>
                    <div className="li-type-stats"><p> {stat.base_stat} {stat.stat.name}</p></div>   
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="ability-detail">
          <h3>ABILITY</h3>
          <PokeAbility
            ability={pokemon.data.abilities[0].ability.name}
            abilityImg={pokemon.data.sprites.other.dream_world.front_default  || noImage}
          /> 
          </div>
          <div className="">
       
            <PokeStrengthAndWeakness title='Weakness' strengthAndWeakness={weaknessTypes}/>
            <PokeStrengthAndWeakness title='Inmune' strengthAndWeakness={noDamageFromTypes}/>
            <PokeStrengthAndWeakness title='Strength' strengthAndWeakness={strengthTypes}/>
            <PokeStrengthAndWeakness title='Resistent' strengthAndWeakness={resistenToTypes}/>

            </div>
          <div className="evolution-detail">
            <h3>Evolutions</h3>
            {evolutionChain ?
              evolutionChain.map((evolve) => (
                <button
                  onClick={() => {
                    window.location.reload();
                    window.scrollTo(0, 0);
                  }}
                >
                  <PokeItem pokemon={evolve} />
                </button>
                             ) )
              :
              <p>This Pokemon has no Evolutions</p>}
          </div>
        </>
      ) : (
        <div>
        <Loader/>
        </div>
      )}
    </div>
    </>

  );
};

export default memo(PokeDetail);
