function MyButton() {
    return (
        <div className="parent">
            <button className="cute-button">
                Cute! 
            </button>
            <h2>This is my other component</h2>
            <p>I can use this shit however many times I like!</p>
        </div>
    );
}

let localVariableCount = 0;
function MyCounter() {
    function handleClick(event) {
        const button = event.target; 
        localVariableCount += 1;
        console.log(`The value of count inside handleClick is: ${localVariableCount}`);
        button.textContent = `Counter: ${localVariableCount}`;
    }
    return (
        <div className="parent-container-because-no-orpahns">
            <p>Technoblade would've loved react.</p>
            {/* So the DOM gets rendered once and the values may get updated later so for example I have this counter
            set to 0 at the start and I can only change that by actually modifying the text inside it and not by incrementing
            count and expecting it to work like that because the DOM gets rendered only once I think 
            */}
            <button className="counter-button" onClick={handleClick}>Counter: {localVariableCount}</button>
        </div>
    )
}
// i read the first two lines of the docs for event listeners and those had functions insdie functions
// HARD NO BRO I am creating handleClick outside this
// function handleClick(event) {
//     const myButtonBecauseIamOutisdeNowAndHaveLostAccessToIt = event.target;
//     console.log(event.target);
//     localVariableCount += 1;
//     console.log(localVariableCount);
//     console.log(myButtonBecauseIamOutisdeNowAndHaveLostAccessToIt.textContent);
// }
// for exporting a single value rep. the entire module we use default. One per file. Enforces "one thing per file" rule
export default function App() {
    return (
        <div>
            <h1>Let me try to create a component for a counter?</h1>
            <MyButton />
            <MyCounter />
            <MyCounter />
            <MyCounter />
        </div>
    );
}
