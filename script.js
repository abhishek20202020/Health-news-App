document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = '50dc3c6f0b4544ad9c4de146d3f74918';
    const API_URL = `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=50dc3c6f0b4544ad9c4de146d3f74918`;
    
    async function fetchNews(category = 'general') {
        const response = await fetch(`${API_URL}&category=${category}`);
        const data = await response.json();
        displayNews(data.articles);
    }

    function displayNews(articles) {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');
            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description || ''}</p>
                <span class="bookmark">&#9733;</span>
            `;
            newsContainer.appendChild(articleElement);
        });
    }

    fetchNews();

    // Event listener for navigation
    document.querySelector('nav').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
            if (category === 'bookmarks') {
                displayBookmarks();
            } else {
                fetchNews(category);
            }
        }
    });

    // Bookmark functionality
    document.getElementById('news-container').addEventListener('click', function(e) {
        if (e.target.classList.contains('bookmark')) {
            const article = e.target.closest('.news-article');
            saveBookmark(article.querySelector('h2').textContent);
            e.target.textContent = '★';
        }
    });

    function saveBookmark(title) {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.push(title);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    function displayBookmarks() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';
        bookmarks.forEach(title => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');
            articleElement.innerHTML = `<h2>${title}</h2>`;
            newsContainer.appendChild(articleElement);
        });
    }
});
