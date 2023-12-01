import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "./styles/PokeInfoPage.css";

const PokeInfoPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <article className="poke-info-container">
      <img
        src={pokemon?.sprites.other["official-artwork"].front_default}
        alt={`${pokemon?.name} sprite`}
        className="poke-image"
      />
      <div className="poke-details">
        <div className="container__poke">
        <div className="div__type">
          <h1 className="poke__title">Types</h1>
          <ul className="poke__type">
            {pokemon?.types.map(infoType => (
              <li className="li__type" key={infoType.type.url}>{infoType.type.name}</li>
            ))}
          </ul>
        </div>
        <div className="ability__container">
          <h1 className="poke__title">Abilities</h1>
          <div className="poke__ability" >
            {pokemon?.abilities.map(infoAbility => (
            <div className="poke__ability-div" key={infoAbility.ability.url}>
              {infoAbility.ability.name}
            </div>
          ))} </div>
        </div>
        </div>
        <div className="container__stats">
        <h1 className="poke__title">Stats</h1>
        <ul className="poke__stats">
          {pokemon?.stats.map(infoStat => (
            <li className="poke__stats-li" key={infoStat.stat.url}>
              <span className="stat__span">{infoStat.stat.name}</span>
              <span>{infoStat.base_stat}</span>
              {/* Barra de progreso para valores mayores a 150 */}
              {infoStat.base_stat < 150 && (
                <progress className="progress__color" value={infoStat.base_stat} max={150}></progress>
              )}
            </li>
          ))}
        </ul></div>
        
        <div className="div__moves">
          <h1 className="poke__title">Moves</h1>
          <ul className="poke__move">
          <div className="poke__move-box">
          {pokemon?.moves.map(infoMove => (
            <div className="poke__move-div" key={infoMove.move.url}>{infoMove.move.name}</div>
          ))} </div>
          </ul>
          </div>
        
      </div>
    </article>
  );
};

export default PokeInfoPage;
