function loadHomepage() {
    // append everything to this.
    const contentDiv = document.querySelector('div[id="content"]');

    const boxDiv = document.createElement('div');
    boxDiv.classList.add('box');

    const pageHeading = document.createElement('div');
    pageHeading.classList.add('heading');
    pageHeading.textContent = "Epiphany";

    const pageHeadingContent = document.createElement('div');
    pageHeadingContent.classList.add('heading-content');
    pageHeadingContent.textContent = "Epiphany is the restaurant of your dreams. It's the number one place to get authentic Indian food in Antarctica. Feel like you're at home again when you dine at Epiphany. This is exactly the kind of place that you like to return to again and again.";

    boxDiv.appendChild(pageHeading);
    boxDiv.appendChild(pageHeadingContent);

    contentDiv.appendChild(boxDiv);

    const newBoxDiv = document.createElement('div');
    newBoxDiv.classList.add('box');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = "Location";

    const boxContentDiv = document.createElement('div');
    boxContentDiv.classList.add('content');
    boxContentDiv.textContent = "123 Forest Drive, near South Pole, Antarctica";

    newBoxDiv.appendChild(titleDiv);
    newBoxDiv.appendChild(boxContentDiv);

    contentDiv.appendChild(newBoxDiv);


    const reviewBox = document.createElement('div');
    reviewBox.classList.add("review-box");

    const newTitleDiv = document.createElement('div');
    newTitleDiv.classList.add('title');
    newTitleDiv.textContent = "Reviews";
    const newBoxContentDiv = document.createElement('div');
    newBoxContentDiv.classList.add('content');
    newBoxContentDiv.textContent = "=== What customers say about us ===";

    const anotherBoxDiv = document.createElement('div');
    anotherBoxDiv.classList.add('box');

    anotherBoxDiv.appendChild(newTitleDiv);
    anotherBoxDiv.appendChild(newBoxContentDiv);

    reviewBox.appendChild(anotherBoxDiv);

    contentDiv.appendChild(reviewBox);

    // now for the reviews.
    const reviewObjectArray = [
        {
            content: '"The tea here was fantastic!"',
            name: " - Paul Revere",
        },
        {
            content: `"In the vastness of space and the immensity of time, I don't think I've ever had Indian food this good"`,
            name: " - Carl Sagan",
        },
        {
            content: `"But, a life without dining at Epiphany is not livable for man!"`,
            name: " - Socrates",
        },
    ]

    for (const reviewObject of reviewObjectArray) {

        const standardReviewBox = document.createElement('div');
        standardReviewBox.classList.add('standard-review');

        const reviewContent = document.createElement('div');
        reviewContent.classList.add("review-content");

        const reviewer = document.createElement('div');
        reviewer.classList.add('name');

        reviewContent.textContent = reviewObject["content"];
        reviewer.textContent = reviewObject["name"];

        standardReviewBox.appendChild(reviewContent);
        standardReviewBox.appendChild(reviewer);

        reviewBox.appendChild(standardReviewBox);
    }
    contentDiv.appendChild(reviewBox);
}
export { loadHomepage };