// Get Quotes from API - https://quotes-react.netlify.app/ | https://type.fit/api/quotes
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuotebtn = document.getElementById('new-quote')

let apiQuotes = [];
// Show new quote
function newQuote() {
//   Pick a random quote from apiQuotes array  
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    quoteText.textContent = quote.text;
    // Check if author field is blank and replace with unknown
    if (!quote.author) {
        authorText.textContent = " - Unknown";   
    } else  {
        authorText.textContent = "- " + quote.author;
    }
}
async function getQuotes() {
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