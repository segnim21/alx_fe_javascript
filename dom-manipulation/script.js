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

 /*document.addEventListener('DOMContentLoaded', function () {
    
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
     function exportToJsonFile () {
        const data = JSON.stringify(quotes);
        const blob = new Blob([data], { type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();

        URL.revokeObjectURL(url);
    }

    // Import JSON
     function importFromJsonFile(event) {
        
        const filereader = new FileReader();
        filereader.onload = function () {
            const importQuotes = JSON.parse(filereader.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            alert ('Quotes imported successfully');
        };
        filereader.readAsText(event.target.files[0]);
    }
    // Event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);
    exportBtn.addEventListener('click',exportToJsonFile);
    importFile.addEventListener('change', importFromJsonFile);

    newQuoteBtn.addEventListener('click', showRandomQuote);
// Initial load
    saveQuotes();
    showRandomQuote();
}); */

document.addEventListener('DOMContentLoaded', function () {
    // Load quotes from localstorage or use defaults
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        {text: 'Education is power of success.', category: 'Education'},
        {text: 'Learning never exhausts the mind.', category: 'Education'},
        {text: 'Code is like humor.When you have to explain it.itis bad.', category: 'programming'},
        {text: 'success is not final, failure ia not fatal.', category: 'Motivation'}
    ];

    // Select DOM elements

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQoute');
    const categoryFilter = document.getElementById('categoryFilter');

    // Save quotes
    function saveQuotes(params) {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }
    
    // POPULATE CATEGORIES

    function populateCategories(params) {
        categoryFilter.innerHTML= '<option value="all"> All Categories </option>'
        const categories = [];
        quotes.forEach(function (quote) {
            if (!categories.includes(quote.category)){
                categories.push(quote.category);
            }
        });
        
        categories.forEach(function (category) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
        const savedFilter = localStorage.getItem('selectedCategory');
        if (savedFilter) {
            categoryFilter.value = savedFilter;
        }
    }
    // FILTER QUOTES

    function filterQuotes(params) {
       const selectedCategory = categoryFilter.value;
       
       localStorage.setItem('selectedCategory', selectedCategory);

       quoteDisplay.innerHTML = '';
       const filteredQuotes = selectedCategory === 'all' ? quotes  : quotes.filter(function (quote) {
        return quote.category === selectedCategory;
       });

       filteredQuotes.forEach(function (quote) {
        const p = document.createElement('p');
        p.textContent = quote.text;

        const small = document.createElement('small');
        small.textContent = 'Category: ' + quote.category;

        quoteDisplay.appendChild(p);
        quoteDisplay.appendChild(small);
       });

    }
    // Show random quote (still needed)
    function showRandomQuote(params) {
        const index = Math.floor(Math.random() * quotes.length);
        quoteDisplay,innerHTML = '';

        const p = document.createElement('p')
            p.textContent = quotes[index].text;

            const small = document.createElement('small');
            small.textContent = 'Category: ' + quotes[index].category;

            quoteDisplay.appendChild(p);
            quoteDisplay.appendChild(small);
        
    }

    // Events listner

    newQuoteBtn.addEventListener('click', showRandomQuote);
    categoryFilter.addEventListener('change', filteredQuotes);

    //Init

    saveQuotes();

    populateCategories();

    filterQuotes();
});