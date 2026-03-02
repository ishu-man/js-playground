import './App.css'

type SpritesObject = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string
}

type Card = {
  id: number;
  name: string;
  type: string;
  image: string;
  appearance_count: number;
  onCardClick: (appearance_count: number, id: number) => void;
}

type CardsArrayProps = {
  cardsArray: Array<Card>;
}

type Scores = {
  current_score: number;
  misses: number;
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

function shuffleOrder(cardsArray: Array<Card>) {
  /**
   * My goal for componenet rendering is to literally just shuffle the order of the array. That is the purpose of this
   * function, and it guarantees the following two things: 
   * 1. Cards with apperance_count less than two should get a place in the final array, and each card should appear only and at least twice
   * 2. There should be a random order of the 12 cards in that array.
   */
    const newArray = new Array<Card>();
  while (true) {
    const random = getRandomInt(cardsArray.length);
    const currentCard = cardsArray[random];
    if (currentCard.appearance_count < 2) {
        newArray.push(currentCard);
        currentCard.appearance_count += 1;
    }
    if (newArray.length === 12) break;
  }

  return newArray;
}

function ScoreCard(scores: Scores){
  /**
   * should contain current_scores and misses count.
   * this component should communicate with the cards component 
   * the cards component should give it the data on the last card clicked which this would store in a data sturcture to track the scores
   * rough props: clickedCards, originalCards
   * this should give you the currentScore and the currentMisse
   */

  // raw feed below:
  // I would need a way to keep track of the card IDs (vague blackbox right now) and somehow "link" 
  // those two card IDs together so that they represent a "pair". If I do that I can "record" the user clicking 
  // on a card with one of these IDs and then record subsequent clicks from the user. If the user clicks on a card and 
  // that is not in this "recorded" data structure (list) I can increment misses by 1. If it is I can increment score by 1.
  return (
    <div className="score-card">
      <p>Score: {scores.current_score}</p>
      <p>Misses: {scores.misses}</p>
    </div>
  )
}

function ClickableCard({cardData}: {cardData: Card}){
  /**
   * Props: cardData of type Card
   * Purpose: Returns a card component based on the aforementioned card data
   * Insight while writing this: 
   * Settled on an event handler which is a part of Card's properties. This makes sure that the
   * parent component gets the data from this card without passing the props too much. The way I achieved this was to use anon functions in a way
   * that the core logic for the event handler is still defined in the parent, and because the handler is a part of the card's own properties
   * it was able to be passed as props via CardsGrid and App components.
   */
  return (
    <button className='Card' onClick={() => cardData.onCardClick(cardData.appearance_count, cardData.id)}>
      <img src={cardData.image} alt="" />
      <p className='font-bold text-3xl text-black'>{cardData.name}</p>
    </button>
  )
}

function CardsGrid({ cardsArray }: CardsArrayProps){
  /**
   * Props: an array of type Card
   * Purpose: shuffles the prop array to new randomized array and creates card components based on the new array's data
   * Insight while writing this:
   * In my initial implementation for this component I had settled on a complex logic for shuffling the cards that involved setting the state
   * after every time a card is shuffled. I have from hereon switched to a simpler version which makes use of a simple shuffleOrder function
   * I wrote for this purpose. This approach is simpler than the other and doesn't cause the performance issues introduced by the former.
   */
  // const shuffledArray = shuffleOrder(cardsArray);
  // shuffled array is in fact correct.
  const mappedComponents = cardsArray.map((currentCard) => {
    return (
      // what should the key be? cause it can't be the ID. Should I let react "handle" it?
      <ClickableCard cardData={currentCard} ></ClickableCard>
    )
  })

  return (
    <div className="center">
      <div className="cards-grid">
        {mappedComponents}
      </div>
    </div>
  )
}


function App() {

  // const myPokemonArray = [384, 644, ]
  // useEffect(() => {
  //   getPokemonSprite("rayquaza").then((pokeJSON) => {
  //     console.log("PokeJSON is as follows:");
  //     console.log(pokeJSON);
  //     setMySprites(pokeJSON.sprites);
  //   });

  //   return;
  // }, [])

  /**
   * SOME TODOS:
   * 1.Implement a neat way to arrange the pokemon IDs (choose 6 of your favorite ones for now) in a data structure and fetch their 
   * images and information at the time of the mount itself. This should be done only once and shouldn't really update with each render.
   */

  const cardsArray: Array<Card> = [
    {
      id: 1,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/383.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 2,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/382.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 3,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/381.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 4,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 5,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/385.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 6,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/386.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
  ]

  function cardClick(appearance_count: number, id: number){
    window.alert(`Clicked element ID: ${id}`);
  }

  // cards array would be passed down as props to cards grid.
  const newArray = shuffleOrder(cardsArray);
  // while (true) {
  //   const random = getRandomInt(6);
  //   const currentCard = cardsArray[random];
  //   if (currentCard.appearance_count < 2) {
  //       newArray.push(currentCard);
  //       currentCard.appearance_count += 1;
  //   }
  //   if (newArray.length === 12) break;
  // }

  return (
    <>
      {/* <img src={mySprites.front_shiny} alt="The best pokemon on planet Earth my favorite my lovely rayquaza" /> */}
      <CardsGrid cardsArray={newArray}></CardsGrid>
    </>
  )
}

export default App;
