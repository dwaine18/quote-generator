// Get Quotes from API - https://quotes-react.netlify.app/ | https://type.fit/api/quotes
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading function - show

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show new quote
function newQuote() {
    loading();
    
//   Pick a random quote from apiQuotes array  
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        // Set Quote,hide loader
    quoteText.textContent = quote.text;
    complete();
        // Check if author field is blank and replace with unknown
    if (!quote.author) {
        authorText.textContent = " - Unknown";   
    } else  {
        authorText.textContent = "- " + quote.author;
    }
}


async function getQuotes() {
    loading();
    
    const apiUrl = 'https://type.fit/api/quotes'; 
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        
        newQuote();
    } catch (error) {
    //   Catch Error Handling
    alert(error)
    }
}

// Tweet a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}  ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}

// Event Listeners

newQuotebtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load

getQuotes();
