// this file would only contain the data models I would use for this project.

// Defining the Card type below:

type Card = {
    id: number;
    name: string;
    type: string;
    image: string;
    appearance_count: number;
}

// a CardsList would be an array that contains only the type Card.
// sample data model below:

const sampleCard1: Card = {
    id: 1,
    name: "Sample",
    type: "Fire",
    image: "imgur.com/123",
    appearance_count: 1,
}

const sampleCard2: Card = {
    id: 1,
    name: "Sample Alt",
    type: "Water",
    image: "imgur.com/456",
    appearance_count: 2
}
