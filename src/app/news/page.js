"use client";
import { useEffect, useState } from "react";
import "./page.css";

export default function TravelNews() {
    const [news, setNews] = useState([]);
    const [query, setQuery] = useState("tourist destination");

    async function fetchNews(searchQuery = "tourist destination") {
        try {
            const response = await fetch(`/api/news?q=${searchQuery}`);
            const data = await response.json();

            if (data.articles) {
                setNews(data.articles);
            } else {
                console.error("Failed to fetch news");
            }
        } catch (error) {
            console.error("Error fetching news:", error.message);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    function handleSearch() {
        if (query.trim() === "") {
            alert("Please enter a search term");
            return;
        }
        fetchNews(query);
    }

    return (
        <html>
            <body>
            <div className="container">
                <h1>Travel News</h1>
                <div className="search">
                    <input 
                        type="text" 
                        placeholder="Search News" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                <div id="newsList">
                    {news.length === 0 ? (
                        <p>No travel news found.</p>
                    ) : (
                        news.map((article, index) => (
                            <div key={index} className="article">
                                {article.urlToImage && <img src={article.urlToImage} alt="Article" />}
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                            </div>
                        ))
                    )}
                </div>

                <style jsx>{`
                    .container {
                        max-width: 800px;
                        margin: 20px auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        font-family: Arial, sans-serif;
                    }
                    
                    .search {
                        display: flex;
                        margin-bottom: 20px;
                    }

                    .search input {
                        flex: 1;
                        padding: 8px;
                        font-size: 16px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        margin-right: 10px;
                    }

                    .search button {
                        padding: 8px 15px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    .article {
                        margin-bottom: 20px;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        background-color: #f9f9f9;
                        display: flex;
                        align-items: center;
                    }

                    .article img {
                        width: 100px;
                        height: auto;
                        margin-right: 10px;
                        border-radius: 4px;
                    }

                    a {
                        text-decoration: none;
                        color: #007bff;
                    }
                `}</style>
            </div>
            </body>
        </html>
    );
}
