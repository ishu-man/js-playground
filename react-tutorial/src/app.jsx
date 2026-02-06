import { useState } from "react";
function Square ({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

// Using props I can pass the value from parent componenet Board to child Square

function Board({xIsNext, squares, onPlay}) {

    let status;
    // status for tracking whether X or O are playing or if anyone has won yet. Will be used to display something.
    // writing tic tac toe logic now - what happens when you actually click a square?
    function handleClick(position) {
        // you can't modify the state directly, hence splice. 
        const nextSquares = squares.slice();
        if (nextSquares[position] || calculateWinner(squares)) return;
        // if there is something on that position, don't do anything 
        if (!xIsNext) {
            nextSquares[position] = 'O';
        }
        else {
            nextSquares[position] = 'X';
        }
        onPlay(nextSquares);
    }
    // if it was X's turn now it should be O's turn.

    const winner = calculateWinner(squares);

    xIsNext ? status = `Next turn: X` : status = `Next turn: O`;
    if (winner) status = `Game over, the winner is: ${winner}`;
    
    return (
        <div className="parent-container">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
            <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
            <Square value={squares[3]}onSquareClick= {() => handleClick(3)}></Square>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
            <Square value={squares[6]} onSquareClick= {() => handleClick(6)}></Square>
            <Square value={squares[7]} onSquareClick= {() => handleClick(7)}></Square>
            <Square value={squares[8]} onSquareClick= {() => handleClick(8)}></Square>
            <div className="status">{status}</div>
        </div>
    );
}

function calculateWinner(squares) {
    // squares is an array of 9 things.
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
   for (const line of winConditions) {
        const contender = squares[line[0]];
        if (line.every((value) => squares[value] === contender)) return contender;
   } 
   return null;
}

// to implement history we can "lift the state up" again (sq to board to game now) to give Game access to all of board's data
// actual history implementation would be done by a state variable - thanks to non-mutated arrays we can see all of the past moves made
// if I add history to game having squares in board would be redundant -> I could just pass that as props
export default function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    // history is an array of an array of nine nulls right now- the possible board states at a time 
    // [[null, null, null, ...]]
    const currentSquares = history[currentMove]; // gets the most recent (last) one
    const xIsNext = (currentMove % 2 === 0); // on 0th turn X is next, on 1st O is next, and so on.. xIsNext is dependent on the state of currentMove

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove){
        // to achieve jump we use the currentMove state which is 0 by default
        // I want to render the board from that move. Move of x means history state's xth item. 
        // I somehow need to recreate the same board conditions as they would've been on this currentMove
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) description = `Go to move #${move}`;
        else description = `Go to start`;

        /*
         If I don't introduce a key to each list item React would throw a 'key error' which means it can't differentiate
         from list item siblings. Keys can be retrieved from databases as well.returns a list item object for each array element 
         -> If a component's key changes that component will be destroyed and re-created with a new state.
        */
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    });

    return (
        <div className="game">
            <h1>This is my tic-tac-toe game made using the React tutorial</h1>
            <div className="game-board">
                <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
            </div>
            <div className="game-info">
                <ol>
                    {moves}
                    {/* moves maps each array element to a list item element*/}
                </ol>
            </div>
        </div>
    )

}

// export default function App() {
//     return (
//         <div>
//             <h1>This is a board for my game</h1>
//             <Board />
//         </div>
//     );
// }