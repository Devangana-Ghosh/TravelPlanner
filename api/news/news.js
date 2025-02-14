document.addEventListener('DOMContentLoaded', () => {
    const newsList = document.getElementById('newsList');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    const fetchTravelNews = async (query = 'travel') => {
        
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 'ok') {
                return data.articles.filter(article => article.category && article.category.toLowerCase().includes('travel'));
            } else {
                throw new Error('Failed to fetch news');
            }
        } catch (error) {
            console.error('Error fetching news:', error.message);
            return [];
        }
    };

    const renderNews = (articles) => {
        newsList.innerHTML = '';

        if (articles.length === 0) {
            newsList.innerHTML = '<p>No travel news found.</p>';
            return;
        }

        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');

            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read More</a>
            `;

            newsList.appendChild(articleElement);
        });
    };

    const searchNews = async () => {
        const query = searchInput.value.trim();

        if (!query) {
            alert('Please enter a search term');
            return;
        }

        const articles = await fetchTravelNews(query);
        renderNews(articles);
    };

 
    if (searchButton) {
        searchButton.addEventListener('click', searchNews);
    }

    
    fetchTravelNews().then(defaultArticles => renderNews(defaultArticles));
});
