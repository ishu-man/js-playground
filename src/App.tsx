import './App.css'
import React, {useState, useEffect } from 'react';

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
  const other = new Array<Card>();
  while (other.length !== 12) {
    const randomInteger = getRandomInt(cardsArray.length);
    if (cardsArray[randomInteger].appearance_count < 2) {
      other.push(cardsArray[randomInteger]);
      cardsArray[randomInteger].appearance_count += 1;
    }
  }

  return other;
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

// let's go bottom to top --> clickable card component next. Then cards grid. Then the scoring system.

function ClickableCard({cardData}: {cardData: Card}){
  // cards array props should be an array of type card.

  /**
   * This is the component for a clickable card.
   * 
   * Step 1: Populating this card with fetch feed from the API. For now I will use hardcoded values for all of the cards (rayquaza).
   * Step 2: Each card should essentially be a button which when clicked records the card ID and other info of the card and saves that for later.
   * EITHER PASS CARD DATA AS PROPS HERE OR MAKE THE FETCH CALLS HERE ONLY
   */

  return (
     <button className='Card' onClick={() => cardData.onCardClick(cardData.appearance_count, cardData.id)}>
       <img src={cardData.image} alt="" />
       <p className='font-bold text-3xl text-black'>{cardData.name}</p>
     </button>
  )

  // function handleClick(event){
    // this function should handle the card click by recording the card Id and maybe sending it to some other component? I need to record the card Id for sure
    // that's what I know for now. 
    /**
     * IDEA: Let the parent component control this prop as well. 
     * It will supply handleClick here which maintains the DS in the parent component itself.
     * ADVANTAGE: This is literally "lifting the state up" and would help share data with ScoreCard component as props.
     * also, separation of concerns --> clickablecard is only responsible for painting a clickable card.
     */
  // }
}

function CardsGrid({ cardsArray }: CardsArrayProps){
  /**
   * What should this get as props? Hmm, it would've been awesome if I had just gotten an array of cards to be made and I just made them magically from
   * this component. Wait, I can use array.map right? I could just return ClickableCard JSX from this component? Whilst passing unique handleClicks and Ids
   * and data for each card?
   * perhaps I could take original cards array as fetched from the API as props here and then use State here to easily set the state for a particular card
   * as well and array map those to return component JSX.
   * Props: array of cards
   */

  // first, I need a random number between 0 and array's size.
  // then, I would say that my current card is arrayOfCards[randInt]
  // I would then either set the array to a new thing or push to a new array, randomSelectionOfCards.

  // const [originalArray, setOriginalArray] = useState(cardsArray);
  // console.log(`Cards arry's first element is: `);
  // console.log(cardsArray[0]);
  // let's follow from here: you declare an originalArray that is fed the value of cardsArray.

  // const randomNumber = getRandomInt(originalArray.length);
  // // you get a random number that has max bounds of current array's length property. Initially, this is 12.
  // if (originalArray[randomNumber].appearance_count >= 2) {

  //   console.log(`Random number is ${randomNumber} and the associated card is: `);
  //   console.log(originalArray[randomNumber]);
  //   console.log(originalArray[randomNumber].appearance_count);

  //   setOriginalArray(originalArray.filter((cardObject) => cardObject.appearance_count < 2))
  // }
  // else {
  //   // randomSelectionOfCards.push(originalArray[randomNumber]);
  //   // THINK: Do you even need the other array here? PROPOSITION: No! the original array after these modifications would be good to go!

  //   // now comes the juicy part: how will you modify the appearance_count on the current card without setting the state again?
  //   // originalArray[randomNumber].appearance_count = 2; -- NOT ALLOWED!


  //   // in the initial run of this function you get a card whose appearance count is not >= 2 (it's 0 actually)
  //   // so we arrive here: we replace the original array with a new array where if the cardObject's id is equal to the card at 
  //   // random number's id we increment the appearance count by 1.
  //   // the new array would be something of the form (considering only app. counts) = [0, 0, 0, 0, 1, 0, 0, ...];
  //   setOriginalArray(originalArray.filter((cardObject) => {
  //     if (cardObject.id === originalArray[randomNumber].id) {
  //       cardObject.appearance_count += 1
  //     };
  //     return cardObject;
  //   }))
  // }

  /**
   * Please remember that your goal during all this exercise is to literally just shuffle the order of the array. Perhaps you should develop a 
   * function that shuffles the order for you? I literally just want two things guaranteed:
   * 1. Cards with apperance_count less than two should get a place in the final array with NO REPETITIONS
   * 2. There should be a random order of the 12 cards in that array.
   */

  const shuffledArray = shuffleOrder(cardsArray);

  const mappedComponents = shuffledArray.map((currentCard) => {
    return (
      <ClickableCard cardData={currentCard} key={currentCard.id}></ClickableCard>
    )
  })

  console.log(mappedComponents);
  return (
    <div className="center">
      <div className="cards-grid">
        {mappedComponents}
      </div>
    </div>
  )

  // what I want to do here is to attach a handleClick component to each card which should be controlled by parent App.
  // the parent should control it so that it can be fed as props to scores component.

  // okay so I've modified the type card -- each card now has its own handleclick attribute
}


function App() {
  // no deps for now -- using hardcoded value rayquaza for this example
  // do I need a cleanup function for this?
  // FOR NOW, POPULATE AN ARRAY WITH 6 CARDS.

  // useEffect(() => {
  //   getPokemonSprite("rayquaza").then((pokeJSON) => {
  //     console.log("PokeJSON is as follows:");
  //     console.log(pokeJSON);
  //     setMySprites(pokeJSON.sprites);
  //   });

  //   return;
  // }, [])

  const cardsArray: Array<Card> = [
    {
      id: 1,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 2,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 3,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 4,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 5,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 6,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 7,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 8,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 9,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 10,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 11,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
   {
      id: 12,
      name: "Rayquaza",
      type: "Dragon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/384.png",
      appearance_count: 0,
      onCardClick: cardClick,
    },
  ]

  function cardClick(appearance_count: number, id: number){
    window.alert(`Clicked element ID: ${id}`);
  }

  // cards array would be passed down as props to cards grid.

  return (
    <>
      {/* <img src={mySprites.front_shiny} alt="The best pokemon on planet Earth my favorite my lovely rayquaza" /> */}
      <CardsGrid cardsArray={cardsArray}></CardsGrid>
    </>
  )
}

export default App;
