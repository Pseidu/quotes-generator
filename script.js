const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Used for storing quotes from API
let apiQuotes = [];

// Loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete () {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Choose a random new quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author is blank
    if (!quote.author) {
        authorText.textContent = "unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //Check quote lenght to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    //Hide loading
    complete ();
}

//Get quotes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch (apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error here. (Pendiente tratamiento del error)
    }
}

//Send the quote to Twitter
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, "_blank");
}

newQuoteBtn.onclick = newQuote;
twitterBtn.onclick = tweetQuote;

// We want getQuotes to be executed on page load
getQuotes();