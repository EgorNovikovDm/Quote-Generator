const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQupteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function showLoadingSpiner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Lodading
function removeLoadingSpiner() {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


//Show New Quote 
function newQuote() {
    showLoadingSpiner();
    //Pick a random aquote from apiQuotes array
    const quote = apiQuotes [Math.floor(Math.random() * apiQuotes.length)];
    //Chek if Author field is blank and replace it with
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpiner();
}



// Get Quptes From API
async function getQuotes() {
    showLoadingSpiner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote(); 
    } catch(error) {  
        const notConnect = new Error("Нет подключения");
        alert(notConnect);
      //Catch Error Here
    }
}
//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/compose/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQupteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
