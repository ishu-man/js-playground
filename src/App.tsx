import './App.css'
import { useEffect, useState } from 'react';

async function getPokemonSprite (pokemonName: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
  return await response.json();
}

function App() {

  // no deps for now -- using hardcoded value rayquaza for this example
  // TODO: setup a cleanup function for this effect. It would (in the actual example) need to run only once per render.
  // Fix the infinite loop!
  const [mySprites, setMySprites] = useState([]);

  useEffect(() => {
    getPokemonSprite("rayquaza").then((pokeJSON) => {
      console.log(pokeJSON);
      console.log(pokeJSON.sprites);
      // will I have to call populate page from this effect?
      setMySprites(pokeJSON.sprites);
    }, [mySprites]);
  })

  console.log(mySprites);

  return (
    <>
      <div className='text-3xl font-bold'>This is my ultracool pokeAPI game thing</div>
    </>
  )
}

export default App
