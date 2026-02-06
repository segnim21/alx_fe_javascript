document.addEventListener('DOMContentLoaded', function () {

    // ======== LOCAL QUOTES ========
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: 'Learning is the road to success', category: 'Education' },
        { text: 'Code is like humor. When you have to explain it, it is bad', category: 'Programming' },
        { text: 'Success is not final, failure is not fatal', category: 'Motivation' }
    ];

    // ======== DOM ELEMENTS ========
    const quoteDisplay = document.getElementById('quoteDisplay');
    const statusBox = document.getElementById('status');
    const newQuoteBtn = document.getElementById('newQuote');
    const categoryFilter = document.getElementById('categoryFilter');
    const exportBtn = document.getElementById('exportBtn');
    const importFile = document.getElementById('importFile');

    // ======== SAVE TO LOCAL STORAGE ========
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // ======== POPULATE CATEGORY DROPDOWN ========
    function populateCategories() {
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        const categories = [...new Set(quotes.map(q => q.category))];
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
        // Restore last selected category
        const saved = localStorage.getItem('selectedCategory');
        if (saved) categoryFilter.value = saved;
    }

    // ======== FILTER QUOTES ========
    function filterQuotes() {
        const selected = categoryFilter.value;
        localStorage.setItem('selectedCategory', selected);
        quoteDisplay.innerHTML = '';

        const filtered = selected === 'all' ? quotes : quotes.filter(q => q.category === selected);
        filtered.forEach(q => {
            const p = document.createElement('p');
            p.textContent = q.text;
            const small = document.createElement('small');
            small.textContent = 'Category: ' + q.category;
            quoteDisplay.appendChild(p);
            quoteDisplay.appendChild(small);
        });
    }

    // ======== SHOW RANDOM QUOTE ========
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

    // ======== EXPORT QUOTES AS JSON ========
    function exportToJsonFile() {
        const data = JSON.stringify(quotes);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // ======== IMPORT QUOTES FROM JSON FILE ========
    function importFromJsonFile(event) {
        const reader = new FileReader();
        reader.onload = function () {
            const importedQuotes = JSON.parse(reader.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            populateCategories();
            filterQuotes();
            alert('Quotes imported successfully!');
        };
        reader.readAsText(event.target.files[0]);
    }

    // ======== SYNC WITH SERVER ========
    async function syncQuotes() {
        try {
            // FETCH server data (mock API)
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
            const serverData = await response.json();
            const serverQuotes = serverData.map(post => ({ text: post.title, category: 'Server' }));

            // POST local quotes to server (simulation)
            await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quotes)
            });

            // RESOLVE CONFLICT: server wins
            quotes = serverQuotes;
            saveQuotes();
            populateCategories();
            filterQuotes();

            // Update UI
            statusBox.textContent = 'Data synced with server (server version used)';
        } catch (error) {
            statusBox.textContent = 'Error syncing with server';
            console.error(error);
        }
    }

    // ======== EVENT LISTENERS ========
    newQuoteBtn.addEventListener('click', showRandomQuote);
    categoryFilter.addEventListener('change', filterQuotes);
    exportBtn.addEventListener('click', exportToJsonFile);
    importFile.addEventListener('change', importFromJsonFile);

    // ======== INITIAL LOAD ========
    saveQuotes();
    populateCategories();
    filterQuotes();
    showRandomQuote();

    // ======== PERIODIC SERVER SYNC EVERY 10 SECONDS ========
    setInterval(syncQuotes, 10000);
});
