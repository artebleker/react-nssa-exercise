import React, { useState, useEffect, memo } from "react";
import "./pokeDetail.css";
import axios from "axios";
import { Link } from "react-router-dom";
import PokeAbility from "./PokeAbility";
import PokeItem from "../pokeItem/PokeItem";

const PokeDetail = () => {
  const [weaknessTypes, setWeaknessTypes] = useState([]);
  const [strengthTypes, setStrengthTypes] = useState([]);
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
        setWeaknessTypes(temporalWeaknessArray.flatMap((result) => result));
        setStrengthTypes(temporalStrengthArray.flatMap((result) => result));
      })
      .catch((err) => console.error(err));
  }

  const [evolutionChain, setEvolutionChain] = useState([])



  function getEvolution(pokemon) {
    let evolutions = [];
    axios
      .get(pokemon.data.species.url)
      .then((dataSpecies) => {
        axios
          .get(dataSpecies.data.evolution_chain.url)
          .then((dataEvolution) => {
            
            if (dataEvolution.data.chain.evolves_to.length){
              evolutions.push(dataEvolution.data.chain.species.name)
                evolutions.push(dataEvolution.data.chain.evolves_to[0].species.name)
                  if (dataEvolution.data.chain.evolves_to[0]["evolves_to"].length){
                  evolutions.push(
                    dataEvolution.data.chain.evolves_to[0].evolves_to[0].species.name
                    )
                }

                let endPointEvolutionChain=[]
                for(let i = 0; i < evolutions.length; i++){
                  endPointEvolutionChain.push(`https://pokeapi.co/api/v2/pokemon/${evolutions[i]}`)
                }
                axios.all(endPointEvolutionChain.map((end) => axios.get(end)))
                .then((res)=>setEvolutionChain(res))
                .catch((err)=> console.err(err))
              }
             
          }
          )

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
    <div>
      <Link to={"/"}>Back </Link>
      {pokemon ? (
        <>
          <div className="header-detail">
            <p className="number-detail">{pokemon.data.id}</p>
            <p className="name-detail">{pokemon.data.name}</p>
          </div>

          <img
            className=""
            src={pokemon.data.sprites.other["official-artwork"].front_default}
            alt={pokemon.data.name}
          />
          <p>Ability</p>
          <PokeAbility
            ability={pokemon.data.abilities[0].ability.name}
            abilityImg={pokemon.data.sprites.other.dream_world.front_default}
          />
          <p>Height</p>
          <p>{pokemon.data.height / 10}m</p>
          <p>Weight</p>
          <p>{pokemon.data.weight / 10}kg</p>

          <div className="type-detail">
            <p>Type</p>
            {pokemon.data.types.map((type) => (
              <p>{type.type.name}</p>
            ))}
          </div>
          <div className="type-detail">
            <div>
              <p>Weakness</p>
              {weaknessTypes.length > 0 ? (
                weaknessTypes.map((weak) => {
                  return <p>{weak}</p>;
                })
              ) : (
                <p>
                  This pokemon has no Weakness,
                  <br />
                  it is Awesome!
                </p>
              )}
            </div>
            <div>
              <p>Strength</p>
              {strengthTypes.length > 0 ? (
                strengthTypes.map((strength) => {
                  return <p>{strength}</p>;
                })
              ) : (
                <p>
                  This pokemon has no Strengths,
                  <br />
                  it's not that good...
                </p>
              )}
            </div>

          {evolutionChain && evolutionChain.map((evolve)=>
          <button onClick={()=>{window.location.reload(); window.scrollTo(0, 0)}}><PokeItem pokemon={evolve}/></button>
          )}

          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default memo(PokeDetail);
