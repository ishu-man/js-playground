function loadContactPage() {
    const contentDiv = document.querySelector('div[id="content"]');

    const divBox = document.createElement('div');
    divBox.classList.add('box');

    const contactHeading = document.createElement('div');
    contactHeading.classList.add('heading');

    const contactDescription = document.createElement('div');
    contactDescription.classList.add('heading-content');

    contactHeading.textContent = "Contact Us";
    contactDescription.textContent = "As we are located in Antarctica we may take a minute to respond to your queries. Otherwise, feel free to get in touch with us anytime, we will love to talk to you about anything related to just about anything.";

    divBox.appendChild(contactHeading);
    divBox.appendChild(contactDescription);

    contentDiv.appendChild(divBox);


    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-container');
    flexContainer.style.flexDirection = "column"; 
    // as I am resuing flexContainer I will use direction as column here

    const contactArray = [
        {
            item: "email: ",
            info: "ishuman2006@gmail.com",
        },
        {
            item: "phone number: ",
            info: "+11 123 987 234",
        },
        {
            item: "fax: ",
            info: "+1-212-9876543",
        }
    ]

    for (const contactElement of contactArray) {
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact-item');

        const contactTitle = document.createElement('div');
        contactTitle.classList.add('contact-title');

        const contactInfo = document.createElement('div');
        contactInfo.classList.add('contact-info');

        contactTitle.textContent = contactElement["item"];
        contactInfo.textContent = contactElement["info"];

        contactItem.appendChild(contactTitle);
        contactItem.appendChild(contactInfo);

        flexContainer.appendChild(contactItem);
    }

    contentDiv.appendChild(flexContainer);
}

export { loadContactPage };