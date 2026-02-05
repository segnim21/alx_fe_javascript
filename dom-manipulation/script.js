 /*document.addEventListener
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

    document.body.appendChild(formDiv);}

    //Event listener
    newQuoteBtn.addEventListener('click',showRandomQuote);

    //Create form on page load
    // Run once on load
    createAddQuoteForm();

showRandomQuote(); });*/

document.addEventListener('DOMContentLoaded', function () {
    
    // Load quotes from localStorage or default
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text:'Learning never exhausts the mind.', category: 'Education'},
        { text: 'Success is not final, failure is not fatal.', category:'Motivation'}
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');
    const exportBtn = document.getElementById('exportBtn');
    const importFile = document.getElementById('importFile');

    // Save quotes to localstorage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }
    // show random quote

    function showRandomQuote() {
        const index = Math.floor(Math.random() * quotes.length);
        sessionStorage.setItem('lastQuote', index);
        quoteDisplay.innerHTML = '';

        const p = document.createElement('p');
        p.textContent = quotes[index].text;

        const small = document.createElement('small');
        small.textContent = 'Category: ' + quotes[index].category;

        quoteDisplay.appendChild(p);
        quoteDisplay.appendChild(small);
    } 

    // Export JSON
    exportBtn.addEventListener('click', function () {
        const data = JSON.stringify(quotes);
        const blob = new Blob([data], { type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();

        URL.revokeObjectURL(url);
    });

    // Import JSON
    importFile.addEventListener('change', function (event) {
        
        const reader = new FileReader();
        reader.onload = function () {
            const importQuotes = JSON.parse(reader.result);
            quotes.push(...importQuotes);
            saveQuotes();
            alert ('Quotes imported successfully');
        };
        reader.readAsText(event.target.files[0]);
    });

    newQuoteBtn.addEventListener('click', showRandomQuote);

    saveQuotes();
    showRandomQuote();
});
