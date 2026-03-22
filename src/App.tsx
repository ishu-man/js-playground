import './App.css'
import { useState, useEffect } from 'react';

type Card = {
	id: number;
	name: string;
	image: string;
	appearance_count: number;
	onCardClick: (cardData: Card) => void;
	uniqueIdentifier: number;
}

type CardsArrayProps = {
	cardsArray: Array<Card>;
	visibleCards: Array<Card>;
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

function returnPoints(cardsArray: Array<Card>){
	// should only be called for even length of array.
	const length = cardsArray.length;
	if (length % 2 !== 0) return;
	else if (length <= 24) {
		return (100 - (Math.floor((length-12) / 2) * 5));
	}
	else {
		return (70- (Math.floor((length-24) / 2) * 10));
	}
}

function checkMiss(lastCard: Card, secondLastCard: Card) {
	// returns whether the most recent pair in cardsArray is different or not. 
	// if (length % 2 !== 0) return; this should be outside this func.
	const condition = (lastCard.id === secondLastCard.id) && (lastCard.uniqueIdentifier !== secondLastCard.uniqueIdentifier)
	// if condition is true, it's a matched pair as id's are same but identifiers are different -> two different 'siblings' were matched!
	if (condition) return false; 
	return true;
}

function returnMisses(clickedCards: Card[]) {
	let misses: number = 0;
	for (let i = 0; i < clickedCards.length - 1; i+=2) {
		const currentCard = clickedCards[i+1];
		const previousCard = clickedCards[i];
		if (checkMiss(currentCard, previousCard)) misses += 1;
	}
	return misses;
}

function capitalize(word: string){
	return (word[0].toUpperCase() + word.slice(1));
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
	//const unshuffledCards = JSON.parse(JSON.stringify(cardsArray));
	const unshuffledCards = cardsArray.map(card => ({...card}));
	// we take a deep copy here and modify the object properties inside of that.

	if (unshuffledCards.length) {
		const shuffledCards = new Array<Card>();
		if (unshuffledCards.length !== 0) {
			while (true) {
				const random: number = getRandomInt(unshuffledCards.length);
				const currentCard: Card = unshuffledCards[random];
				const appCount: number = currentCard.appearance_count;
				if (appCount !== 2) {
					//currentCard.uniqueIdentifier = 100 + currentCard.id;
					shuffledCards.push(currentCard);
					currentCard.appearance_count += 1;
				}
				if (shuffledCards.length === 12) break;
			}
		}
		const finalShuffled = shuffledCards.map((currentCard: Card, index: number) => {
			return {
				...currentCard,
				uniqueIdentifier: 100 + index,
			}
		})
		return finalShuffled;
	}
}

function ScoreCard({clickedCards, visibleCards, missesCount}: {clickedCards: Card[], visibleCards: Card[], missesCount: number}){
	const endCondition: boolean = (visibleCards.length === 12);
	const points = returnPoints(clickedCards);
	return (
		<div className="score-card">
		<p>Misses: {missesCount}</p>
		<p className="points">Points: {endCondition ? points : 'TBD'}</p>
		<p className="message"><em>{endCondition ? 'well played!' : ''}</em></p>
		</div>
	)
}

function ClickableCard({cardData, visibility}: {cardData: Card, visibility: boolean}){
	/**
	 * Props: cardData of type Card
	 * Purpose: Returns a card component based on the aforementioned card data
	 * Insight while writing this: 
	 * Settled on an event handler which is a part of Card's properties. This makes sure that the
	 * parent component gets the data from this card without passing the props too much. The way I achieved this was to use anon functions in a way
	 * that the core logic for the event handler is still defined in the parent, and because the handler is a part of the card's own properties
	 * it was able to be passed as props via CardsGrid and App components.
	 */
	// basically add overlay to the div or not based on the state
		return (
		<button className='Card' onClick={() => cardData.onCardClick(cardData)}>
		<div className={visibility ? '' : 'overlay'}></div>
		<img src={cardData.image} alt="" />
		<p className='font-bold text-3xl text-black'>{cardData.name}</p>
		</button>
	)
}

function CardsGrid({ cardsArray, visibleCards }: CardsArrayProps){
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
	// TODO: Do I want card visibility to be a property of the Card type itself or do I want to control it using the component render?
	// TODO: Currently, when card is clicked, it's added to visibleCards -> I can then at card render check if the card is in visibleCards and update my visibility on basis of that.
	// TODO: WHEN A CARD IS CLICKED, ITS SIBLING GETS REVEALED TOO. .includes() has NO WAY of distinguishing the two cards!
	const mappedComponents = cardsArray.map((currentCard, index) => {
		// let's check the visibility of each card here and update it based on that. 
		// update: the key could be set as the uniqueIdentifider.
			return (
			<ClickableCard cardData={currentCard} cardsArray={cardsArray} visibility={visibleCards.includes(currentCard)} key={currentCard.uniqueIdentifier}></ClickableCard>
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

	const [cardsArray, setCardsArray] = useState<Card[]>([]);
	const [clickedCards, setClickedCards] = useState<Card[]>([]);
	const [visibleCards, setVisibleCards] = useState<Card[]>([]);
	let calculatedMisses = 0;
	//let visibleCards = new Array<Card>();
	// the intention is to calculate visible cards from clicked cards.


	// maybe I could have a clicked cards state and would calculate visible cards on basis of it?
	// visible cards is actually intended for use of the scoreboard id same uniq. different
	// this creates 6 empty cards in the current cards array.
	// the intention here is to add a card to the visible cards array and then based on the values there hide all cards or show only two
	// hide all would be used when a miss is encountered and show both would be used when a point is encountered 
	function cardClick(cardData: Card) {
		setClickedCards(previousCards => {
			// append latest card to clicked cards.
				console.log("Cards clicked: ");
				console.log([...previousCards, cardData]);
				return [...previousCards, cardData];
		});
		setVisibleCards(previousVisible => {
			console.log("Visible cards: ");
			console.log([...previousVisible, cardData]);
			// when visible cards is a multiple of two, I can check whether both cards are the same and increment score?
			return ([...previousVisible, cardData]);
		});
	}

	useEffect(() => {
		/*
		* Some comments about this useEffect:
		* React can be thought of as a DFA. You have a state in the UI and you have another state in the UI. A component is only a snapshot
		* of that moment in reality - given state A, return UI A. It's pure determinism.
		* This determinism is what "isolates" it from "the outisde world". This is the reason effects are required. This foreign entity that you
		* sync your UI with can be a clock chip on a user's motherboard or even external API systems. Effects essentially 'break' the isolation.
		* 
		* Cleanup is even more interesting.
		*  
		*/
	let timeoutID: number;
	 if (visibleCards.length % 2 === 0) {
		 timeoutID = setTimeout(() => {
			 // disable card clicking when there are an even number of cards on screen? 
			 // actually, map over the cards and identify whether two cards have the same id. If they do, add them to visible cards permanently.
			setVisibleCards(previousVisible => {
				let i = previousVisible.length - 1;
				let j = previousVisible.length - 2;
				const newVisibleCards = new Array<Card>();

				while (previousVisible[i] && previousVisible[j]) {
					if (previousVisible[i].id === previousVisible[j].id) {

						newVisibleCards.push(previousVisible[i]);
						newVisibleCards.push(previousVisible[j]);
						}
					i -= 2;
					j -= 2;
					//else continue;
				}
				// end of while.
				return newVisibleCards;
			})
		 }, 500);
		 // end if
	 }
		return () => {
	     window.clearTimeout(timeoutID);
	   }
	}, [visibleCards])
	

	useEffect(() => {
		const myPokemonArray = [384, 722, 382, 383, 131, 389];
		const fetchData = async () => {
			const exampleCards = await Promise.all(myPokemonArray.map(async(value, index) => {
				const APIdata = await getPokemonSprite(value);
				const currentCard: Card = {
					id: index,
					name: capitalize(APIdata.name),
					image: `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${value}.png`,
					appearance_count: 0,
					onCardClick: cardClick,
					uniqueIdentifier: 100 + index,
				}
				return currentCard;
			}));
			setCardsArray(shuffleOrder(exampleCards));
		}

		fetchData();
	}, []);

	calculatedMisses = returnMisses(clickedCards);

	return (
		<>
		{/* <img src={mySprites.front_shiny} alt="The best pokemon on planet Earth my favorite my lovely rayquaza" /> */}
		<CardsGrid cardsArray={cardsArray} visibleCards={visibleCards}></CardsGrid>
		<ScoreCard clickedCards={clickedCards} visibleCards={visibleCards} missesCount={calculatedMisses}></ScoreCard>
		</>
	)
}

export default App;
