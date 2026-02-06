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
    // DEFAULT QUOTES OR LOCAL STORAGE

    let quotes = JSON.parse(localStorage.getItem('quotes')) || 
    [
        { text: 'Learning is the road of success', category: 'Education'},
        { text: 'Code is like humor. When you have to explain it , it is bad', category: 'programming'},
        { text: 'Success is not final, failure is not fatal', category: 'Motivation'}
    ];

    // Select DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusBox = document.getElementById('status');

    // Save quotes to local storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));

    }

    // Populate categories dropdown

    function populateCategories() {
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        const categories = [...new setInterval(quotes.map(q => q.category))];
        categories.forEach(function (cat) {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });

        // Restore last selected category
        const savedCategory = localStorage.getItem('selectedCategory');
        if (savedCategory) categoryFilter.value = savedCategory;
    }
    // Filter quotes
    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem('selectedCategory', selectedCategory);
        quoteDisplay.innerHTML = '';
        const filtered = selectedCategory === 'all' ? quotes : quotes.filter(q => q.category === selectedCategory);
        filtered.forEach(function (q) {
            const p = document.createElement('p');
            p.textContent = q.text;
            const small = document.createElement('small');
            small.textContent = 'Category: ' + q.category;

            quoteDisplay.appendChild(p);
            quoteDisplay.appendChild(small);
        });
    }

    // Show random quote
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

    // Fetch from server (simulated)

    function fetchQuotesFromServer() {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(response => response.json())
        .then(serverData => {
            const serverQuotes = serverData.map(post => ({
                text: post.title, category: 'Server'
            }));
            resolveConflict(serverQuotes);
        });
    }

    // Server conflict (server wins)

    function resolveConflict(serverQuotes) {
        quotes = serverQuotes;
        saveQuotes();
        showQuotes();

        statusBox.textContent = 'Data synced with server(server version used)';
    }
    // Event listener

    newQuoteBtn.addEventListener('click', showRandomQuote);
    categoryFilter.addEventListener('change', filterQuotes);

    // Initial load

    saveQuotes();
    populateCategories();
    filterQuotes();

    // Start server sync every 10 seconds

    setInterval(fetchFromServer, 10000);
});