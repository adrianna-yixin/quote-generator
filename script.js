const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");

// Get Quotes From API
// An asyncrounous function can run at any time independently and won't stop the browser from completely loading the page

// Use "let" because we will change the value later on
let apiQuotes = [];

// Show loading
function loading() {
  // When the loader is loading, only the loader shows up
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function loadingComplete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is blank and replace it with "unknown"
  if (!quote.author) {
    quoteAuthor.textContent = 'Unknown';
  } else {
    quoteAuthor.textContent = quote.author;
  }
  // Check quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  loadingComplete();
}

async function getQuotes() {
  // The loading() function can probably be seen only once because after the first fetch request, the API is stored locally in the apiQuotes variable
  loading();
    const apiUrl =
      "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
    } catch (error) {
        console.error();
    }
}

// Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();