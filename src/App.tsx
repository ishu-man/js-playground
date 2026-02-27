import './App.css'
import { useEffect, useState } from 'react';

type SpritesObject = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string
}

async function getPokemonSprite (pokemonName: string){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`, {
    method: "GET"
  });
  return await response.json();
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function App() {
  // no deps for now -- using hardcoded value rayquaza for this example
  // do I need a cleanup function for this?
  const [mySprites, setMySprites] = useState<SpritesObject>({back_default: "", back_shiny: "", front_default: "", front_shiny: ""});

  useEffect(() => {
    getPokemonSprite("rayquaza").then((pokeJSON) => {
      // will I have to call populate page from this effect?
      console.log("PokeJSON is as follows:");
      console.log(pokeJSON);
      setMySprites(pokeJSON.sprites);
    });

    return;
  }, [])

  return (
    <>
      <div className='text-3xl font-bold'>This is my ultracool pokeAPI game thing</div>
      <img src={mySprites.front_shiny} alt="The best pokemon on planet Earth my favorite my lovely rayquaza" />
    </>
  )
}

export default App
