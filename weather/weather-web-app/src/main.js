const API_KEY = import.meta.env.VITE_API_KEY
let fetched = false;

async function returnLocationData(location){
    handleLoadingState(fetched);
    let promise = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}&contentType=json`);
    // console.log(promise);
    try {
        let data = await promise.json();
        // console.log(data);
        return data; // this is an object that would need to be formatted later
    } catch (error) {
        handleErrorState(error);
    }
}

function returnCelsius(fahrenheit){
    return ((Number(fahrenheit) - 32) / 1.8).toFixed(2)
}

// found a decent use case of reduce.
function capitalizeInput(finalString, currentString){
    currentString = currentString[0].toUpperCase() + currentString.slice(1);
    return finalString + " " + currentString;
}

async function processJSON(JSONdata) {
    const {description, currentConditions, address} = JSONdata;
    const {cloudcover, conditions, datetime, temp, feelslike} = currentConditions;
    fetched = true;

    const app = document.querySelector('#app');
    console.log(app);
    const parentContainer = document.querySelector('.parent-container');
    const childContainer = document.querySelector('.child-container');
    handleErrorState(0);
    handleLoadingState(fetched);

        const temperature = document.createElement('div');
        temperature.id = "temperature";
        temperature.innerText = `The current temperature in ${address.split(" ").reduce(capitalizeInput, "")} is ${returnCelsius(temp)} celsius`;

        const feelsLikeTemp= document.createElement('div');
        feelsLikeTemp.id = "feelsLike";
        feelsLikeTemp.innerText = `The temperature might feel like ${returnCelsius(feelslike)} celsius, though.`;

        const descriptionEle= document.createElement('div');
        descriptionEle.id = "";
        descriptionEle.innerText = `Description: ${description}`;

        const cloudcoverEle= document.createElement('div');
        cloudcoverEle.id = "";
        cloudcoverEle.innerText = `Cloud cover: ${cloudcover}%`;

        const conditionsEle= document.createElement('div');
        conditionsEle.id = "";
        conditionsEle.innerText = `Conditions: ${conditions}`;

        childContainer.append(temperature, feelsLikeTemp, descriptionEle, cloudcoverEle, conditionsEle);
        parentContainer.appendChild(childContainer);
    fetched = false;

}

function initialize() {
    const app = document.querySelector('#app');
    const parentContainer = document.createElement('div');
    parentContainer.classList.add('parent-container');

    const input = document.createElement('input');
    const submitButton = document.createElement('button');
    submitButton.innerText = "Submit";

    parentContainer.appendChild(input);
    parentContainer.appendChild(submitButton);

    const childContainer = document.createElement('div');
    childContainer.classList.add('child-container');
    parentContainer.appendChild(childContainer);
    app.appendChild(parentContainer);

    submitButton.addEventListener('click', eventHappened)
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if (keyName === "Enter") eventHappened();
    })

    function eventHappened() {
        childContainer.innerHTML = "";
        // console.log(input.value);
        returnLocationData(input.value).then((data) => processJSON(data))
    }
}

function handleLoadingState(fetched) {
    const app = document.querySelector('#app');
    const existingLoadingState = document.querySelector('.loading');
    if (existingLoadingState) app.removeChild(existingLoadingState);
    const loading = document.createElement('div');
    loading.textContent = "Loading..."
    loading.classList.add('loading');

    if (fetched == false) app.appendChild(loading);
}

function handleErrorState(error) {
    /**
     * In its current state the function is just bad, it's a mock error handler
     * An ideal version would perhaps be a component message that can act for both loading and error states
     * This is something I would implement in react.
     */
    const app = document.querySelector('#app');
    const existingError= document.querySelector('.error');
    if (existingError) app.removeChild(existingError);
    if (error) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = "There was an error!";
        errorMessage.classList.add('error');
        app.appendChild(errorMessage);
    }
}

initialize();