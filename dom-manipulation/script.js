document.addEventListener
('DOMContentLoaded', function(){
// Array of quote objects
let quotes = [
    { text: 'Learning never exhausts the mind.', category: 'Education'},
    { text: 'Success is not final,failure is not fatal.', category: 'Motivation'},
    { text: 'Code is like humor.When you have to explain it,it is bad.', category: 'Programming'}
];

// Select DOM elements

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Function to show random quote
function showRandomQuote() {
    // Get random index
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // Clear previous content
    quoteDisplay.innerHTML = "";

    //Create paragraph for quote text 
    const quoteText = document.createElement('p');
    quoteText.textContent = quotes[randomIndex].text;

    // Create small text for category
    const quoteCategory = document.createElement('small');
    quoteCategory.textContent  = 'category: ' + quotes[randomIndex].category;

    //Add elements to DOM
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to add new quote
function addQuote() {
    const textInput = document.getElementById('newQuoteText').value;
    const categoryInput = document.getElementById('newQuoteCategory').value;

    if (textInput === "" || categoryInput === "") {
        alert('Please fill in both fields');
        return;
    }
    quotes.push({
        text: textInput,
        category: categoryInput
    });

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    showRandomQuote();

}
// Create form dynamically                                              
function createAddQuoteForm()
 {
    const formDiv = document.createElement('div');
    const textInput = document.createElement('input');

    textInput.id = 'newQuoteText';
    textInput.placeholder = 'Enter a new quotes';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;

    formDiv.appendChild(textInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);

    document.body.appendChild(formDiv);

    //Event listener
    newQuoteBtn.addEventListener('click',showRandomQuote);

    //Create form on page load
    // Run once on load
    createAddQuoteForm();}

showRandomQuote(); });