function loadMenu() {
    const contentDiv = document.querySelector('div[id="content"]');

    const menuObjectArray = [
        {
            itemName: "Chana-Chenna Tikki (v)",
            itemPrice: "$17",
            itemDescrption: "green garbanzo, housemade cheese, tomato chutney (2 pc)",
        },
        {
            itemName: "Paneer Methi (v, gf, n)",
            itemPrice: "$36",
            itemDescrption: "house made paneer, fenugreek, tomato",
        },
        {
            itemName: "Paneer Tikka (v, gf) |",
            itemPrice: "$21",
            itemDescrption: "house made paneer, ajwain, yogurt (2 pc)",
        },
        {
            itemName: "Dahi Waali Bhindi (v, gf)",
            itemPrice: "$34",
            itemDescrption: "okra, yogurt, Rajasthani red chili",
        },
        {
            itemName: "Bohri Chicken Cutlet",
            itemPrice: "$18",
            itemDescrption: "chicken mince, green chili, Amul cheese (2 pc)",
        },
        {
            itemName: "Malai Murgh (gf)",
            itemPrice: "$38",
            itemDescrption: "chicken, cream, Amul butter",
        },
        {
            itemName: "Rara Gosht (gf)",
            itemPrice: "$42",
            itemDescrption: "goat meat and mince, yogurt, onions, garam masala",
        },
        {
            itemName: "Nalli Briyani",
            itemPrice: "$75",
            itemDescrption: "slow braised lamb shank, basmati rice",
        },
        {
            itemName: "Kolambi ani Kekda Bhaath (gf)",
            itemPrice: "$42",
            itemDescrption: "tiger prawn, crab, surti kolam rice",
        },
    ]

    const divBox = document.createElement('div');
    divBox.classList.add('box');

    const menuHeading = document.createElement('div');
    menuHeading.classList.add('heading');

    const menuDescription = document.createElement('div');
    menuDescription.classList.add('heading-content');

    menuHeading.textContent = "The Menu";
    menuDescription.textContent = "We are proud of our Indian heritage and provide food that is exactly identical to Dhamaka NYC";

    divBox.appendChild(menuHeading);
    divBox.appendChild(menuDescription);

    contentDiv.appendChild(divBox);

    const menu = document.createElement('div');
    menu.classList.add('menu');


    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-container');

    for (const menuObject of menuObjectArray) {

        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        const itemName = document.createElement('div');
        itemName.classList.add('item-name');

        const itemPrice = document.createElement('div');
        itemPrice.classList.add('item-price');

        const itemDescrption = document.createElement('div');
        itemDescrption.classList.add('item-description');

        itemName.textContent = menuObject["itemName"];
        itemPrice.textContent = menuObject["itemPrice"];
        itemDescrption.textContent = menuObject["itemDescrption"];

        wrapper.appendChild(itemName);
        wrapper.appendChild(itemPrice);

        menuItem.appendChild(wrapper);
        menuItem.appendChild(itemDescrption);

        menu.appendChild(menuItem);
    }

    flexContainer.appendChild(menu);
    contentDiv.appendChild(flexContainer);
}

export { loadMenu };