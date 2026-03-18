import './App.css'
import { useState, useEffect } from 'react';
// objective: find the infinite loop and kill it.

type Card = {
	id: number;
	name: string;
	image: string;
	appearance_count: number;
	onCardClick: (id: number) => void;
}

type CardsArrayProps = {
	cardsArray: Array<Card>;
}

type Scores = {
	current_score: number;
	misses: number;
}

async function getPokemonSprite (pokemonID: number){
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`, {
		method: "GET"
	});
	const JSON = await response.json();
	return JSON;
}

function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

function shuffleOrder(cardsArray: Array<Card>) {
	// effects work AFTER initial render.
	/**
	 * My goal for componenet rendering is to literally just shuffle the order of the array. That is the purpose of this
	 * function, and it guarantees the following two things: 
	 * 1. Cards with apperance_count less than two should get a place in the final array, and each card should appear only twice
	 * 2. There should be a random order of the 12 cards in that array.
	 */
	// initially there is no cardsArray so I will have to bullet proof all of this from the first render
	console.log("I am inside of shuffleOrder");
	//const unshuffledCards = JSON.parse(JSON.stringify(cardsArray));
	const unshuffledCards = cardsArray.map(card => ({...card}));
	// we take a deep copy here and modify the object properties inside of that.

	console.log(unshuffledCards);

	if (unshuffledCards.length) {
		const shuffledCards = new Array<Card>();
		if (unshuffledCards.length !== 0) {
			while (true) {
				const random: number = getRandomInt(unshuffledCards.length);
				const currentCard: Card = unshuffledCards[random];
				const appCount: number = currentCard.appearance_count;
				if (appCount !== 2) {
					shuffledCards.push(currentCard);
					currentCard.appearance_count += 1;
				}
				if (shuffledCards.length === 12) break;
			}
		}

	return shuffledCards;

	}
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
			<button className='Card' onClick={() => cardData.onCardClick(cardData.id)}>
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
	// again, bullet proofing for the first render
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

	function cardClick(id: number){
		window.alert(`Clicked element ID: ${id}`);
	}

	const [cardsArray, setCardsArray] = useState<Card[]>([]);
	// this creates 6 empty cards in the current cards array.

	useEffect(() => {
		const myPokemonArray = [384, 722, 382, 383, 131, 389];
		const fetchData = async () => {
			const exampleCards = await Promise.all(myPokemonArray.map(async(value, index) => {
				const APIdata = await getPokemonSprite(value);
				const currentCard: Card = {
					id: index,
					name: APIdata.name,
					image: `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${value}.png`,
					appearance_count: 0,
					onCardClick: cardClick,
				}
				return currentCard;
			}));
			console.log("Example cards are: ");
			console.log(exampleCards);
			setCardsArray(shuffleOrder(exampleCards));
		}

		fetchData();

	}, []);

return (
		<>
		{/* <img src={mySprites.front_shiny} alt="The best pokemon on planet Earth my favorite my lovely rayquaza" /> */}
		<CardsGrid cardsArray={cardsArray}></CardsGrid>
		</>
		)
}

export default App;
