// Get Quotes From API
// An asyncrounous function can run at any time independently and won't stop the browser from completely loading the page

// Use "let" because we will change the value later on
let apiQuotes = [];

// Show new quote
function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
}

async function getQuotes() {
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

// On load
getQuotes();