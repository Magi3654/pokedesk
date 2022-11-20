'use strict';


const pokeCard= document.querySelector ('[data-poke-card]');
const pokeName= document.querySelector('[data-poke-name]');
const pokeImg= document.querySelector('[data-poke-img]');
const pokeImgContainer= document.querySelector('[data-poke-img-container]');
const pokeId= document.querySelector('[data-poke-id]');
const pokeTypes=document.querySelector('[data-poke-types');
const pokeStats=document.querySelector('[data-poke-stats]');

const typeColors={
  electric: '#FFEA70',
  normal: '#B09398',
  fire:'#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying:'#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel:'#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F'
}

const searchPokemon=event=>{
  event.preventDefault();
  const {value}= event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data=>data.json())
    .then(response=>renderPokemonData(response))
    .catch(err=>renderNotFound())
}

  const renderPokemonData=data=>{
  const sprite=data.sprites.front_defatult;
  const{stats,types}=data;
  pokeName.textContent=data.name;
  pokeImg.setAttribute('src',sprite);
  pokeId.textContent=`#N°. ${data.id}`;
  setCardColor(types);
  renderPokemonTypes(types);
  renderPokemomStats(stats);
}

const setCardColor=types=>{
  const colorOne=typeColors[types[0].type.name];
  const colorTwo=types[1]?typeColors[[1].type.name]:typeColors.default;
  pokeImg.style.background=`radial-gradient(${colorTwo}33%,${colorOne}33%)`;
  pokeImg.style.backgroundSize='5px 5px';

}

const renderPokemonTypes = types=>{
  pokeTypes.innerHTML='';
  types.forEach(type=>{
    const typeTexteElement=document.createElement("div");
    typeTexteElement.style.color=typeColors[type.type.name];
    typeTexteElement.texContent=type.type.name;
    pokeTypes.appendChild(typeTextElement);
  });
}

const renderPokemonStats=stats=>{
  pokeStats.innerHTML='';
  stats.forEach(stat=>{
    const statElement=document.createElement("div");
    const statElementName=document.creatrElement("div");
    const statElementAmount=document.createElement("div");
    statElementName.texContent=stat.stat.name;
    statElementAmount.texContent=stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    pokeStats.appendChild(statElement);
  });
}

const renderNotFound=()=>{
  pokeName.textContent='No encontrado';
  pokeImg.setAttribute('src','pokebola.png');
  pokeImg.style.background='#fff';
  pokeTypes.innerHTML='';
  pokeStats.innerHTML='';
  pokeId.texContent='';
}
