import "./styles.css";
import "./menu_styles.css";
import { loadHomepage } from "./homepage";
import { loadMenu } from "./menu";
import { loadContactPage } from "./contact";

console.log("Hey, this is me from index.js");
console.log("Can you see me? This is me from index.js");
console.log("Alright, I didn't have to mention it again.");

const button = document.querySelectorAll('button');
const contentDiv = document.querySelector('div[id="content"]');

button.forEach(clickableButton => {
    clickableButton.addEventListener('click', processButton);
})

function processButton(event) {
    console.log("Button was clicked");
    console.log(event);

    const currentButton = event.target;

    if (currentButton.textContent === "Menu") {
        console.log("The clicked button was a menu button");
        contentDiv.innerHTML = ''; // this clears the inner HTML for contentDiv
        loadMenu();
    }
    else if (currentButton.textContent === "Home") {
        console.log("Loading homepage...");
        contentDiv.innerHTML = '';
        loadHomepage();
    }
    else if (currentButton.textContent === "Contact") {
        console.log("Loading contact...");
        contentDiv.innerHTML = '';
        loadContactPage();
    }
}

loadHomepage();