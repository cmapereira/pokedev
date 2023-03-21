import React from 'react'
import {useState} from 'react'
import Axios from 'axios'
import './Searchbar.css'

const Search = () => {
  const[pokemonChosen, setPokemonChosen] = useState(false)
  const[pokename, setPokename] = useState("");
  const[pokedata, setPokedata] = useState({
    nome: "", 
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  })
  const findPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
    .then((response) => {
        setPokedata({
          nome: pokename, 
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true)
    });
  };
  return (
    <>
    
    <div className="search">
        <h1>Pesquisar Pokemon</h1>
        <input type="text" placeholder="nome do pokemon" 
        onChange={(e) => {setPokename(e.target.value)}}></input>
        <button onClick={findPokemon}>Pesquisar</button>
    </div>

    <div className="display">
      {!pokemonChosen ? (<h2>Escolha um pokemon</h2>
      ) : (
        <div className="card">
          <h1>{pokedata.nome}</h1>
          <img src={pokedata.img} alt="pokemon"></img>
          <h3><span>Specie:</span> {pokedata.species}</h3>
          <h3><span>Type:</span> {pokedata.type}</h3>
          <hr></hr>
          <h3><span>hp:</span> {pokedata.hp}</h3>
          <h3><span>Attack:</span> {pokedata.attack}</h3>
          <h3><span>Defense:</span> {pokedata.defense}</h3>
        </div>
      )}
    </div>
    </>
  )
}

export default Search