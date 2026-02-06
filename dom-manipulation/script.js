/*document.addEventListener('DOMContentLoaded', function () {

  // Load quotes from localStorage OR use default quotes
  let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: 'Education is the key to success.', category: 'Education' },
    { text: 'Learning never exhausts the mind.', category: 'Education' },
    { text: 'Code is like humor. When you have to explain it, it is bad.', category: 'Programming' },
    { text: 'Success is not final, failure is not fatal.', category: 'Motivation' }
  ];

  // Select DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const categoryFilter = document.getElementById('categoryFilter');

  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  // ==============================
  // POPULATE CATEGORIES DROPDOWN
  // ==============================
  function populateCategories() {

    // Reset dropdown
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Extract categories using map()
    const categories = [...new Set(
      quotes.map(function (quote) {
        return quote.category;
      })
    )];

    // Add categories to dropdown
    categories.forEach(function (category) {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });

    // Restore last selected category
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      categoryFilter.value = savedCategory;
    }
  }

  // ==============================
  // FILTER QUOTES BY CATEGORY
  // ==============================
  function filterQuotes() {

    const selectedCategory = categoryFilter.value;

    // Save selected category
    localStorage.setItem('selectedCategory', selectedCategory);

    // Clear displayed quotes
    quoteDisplay.innerHTML = '';

    // Filter quotes
    const filteredQuotes =
      selectedCategory === 'all' ? quotes : quotes.filter(function (quote) {
            return quote.category === selectedCategory;
          });

    // Display filtered quotes
    filteredQuotes.forEach(function (quote) {
      const p = document.createElement('p');
      p.textContent = quote.text;

      const small = document.createElement('small');
      small.textContent = 'Category: ' + quote.category;

      quoteDisplay.appendChild(p);
      quoteDisplay.appendChild(small);
    });
  }

  // ==============================
  // SHOW RANDOM QUOTE (OPTIONAL)
  // ==============================
  function showRandomQuote() {
    const index = Math.floor(Math.random() * quotes.length);

    quoteDisplay.innerHTML = '';

    const p = document.createElement('p');
    p.textContent = quotes[index].text;

    const small = document.createElement('small');
    small.textContent = 'Category: ' + quotes[index].category;

    quoteDisplay.appendChild(p);
    quoteDisplay.appendChild(small);
  }

  // Event listeners
  newQuoteBtn.addEventListener('click', showRandomQuote);
  categoryFilter.addEventListener('change', filterQuotes);

  // Initial setup
  saveQuotes();
  populateCategories();
  filterQuotes();

});*/
document.addEventListener('DOMContentLoaded', function () {
    // LOCAL DATA (our quotes)

    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: 'Education is the power of success', category: 'Education'}
    ];

    // SELECT HTML ELEMENTS

    const quoteDisplay = document.getElementById('quoteDisplay');
    const statusBox =   document.getElementById('status');

    //SAVED DATA TO LOCAL STORAGE

    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));

    }

    // SHOW QUOTES ON THE PAGE
    function showQuotes() {
        quoteDisplay.innerHTML = '';

        quotes.forEach(function (quote) {
            const p = document.createElement('p');
            p.textContent = quote.text;

            const small = document.createElement('small');
            small.textContent = 'Category ' + quote.category;

            quoteDisplay.appendChild(p);
            quoteDisplay.appendChild(small);
        });
    }

    // FETCH DATA FROM SERVER(SIMULATED)
    function fetchFromServer() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function (response) {
            return response.json();

        })
        .then(function (serverData) {
            const serverQuotes = serverData.map(function (post) {
                return {
                    text: post.title,
                    category: 'server'
                };
            });
            resolveConflict(serverQuotes);
        });
    }

    // CONFLICT RESOLUTION (SERVER WINS)
    function resolveConflict(serverData) {
        quotes = serverQuotes;
        saveQuotes();
        saveQuotes();

        statusBox.text = 'Data synced with server (server version used)';
    }

    // REPEAT SERVER CHECK EVERY 10 SECONDS

    setInterval(fetchFromServer, 10000);

    // INITIAL LOAD
    saveQuotes();
    saveQuotes();
});