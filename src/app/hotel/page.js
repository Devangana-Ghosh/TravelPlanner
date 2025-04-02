"use client";
import { useEffect, useState } from "react";
import "./page.css";

export default function HotelSearch() {
    const [location, setLocation] = useState("");
    const [hotels, setHotels] = useState([]);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Ensure this is set in .env.local

    useEffect(() => {
        if (typeof window !== "undefined" && window.google) {
            initializeAutocomplete();
        }
    }, []);

    function initializeAutocomplete() {
        const input = document.getElementById("search");
        const autocomplete = new window.google.maps.places.Autocomplete(input);

        autocomplete.addListener("place_changed", function () {
            const place = autocomplete.getPlace();
            if (place.formatted_address) {
                setLocation(place.formatted_address);
                fetchHotels(place.formatted_address);
            }
        });
    }

    async function fetchHotels(query) {
        const url = `/api/hotels?query=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setHotels(data.results || []);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    }

    function handleSearchClick() {
        if (!location.trim()) {
            alert("Please enter a location.");
            return;
        }
        window.open(`https://www.google.com/maps/search/${encodeURIComponent(location + " hotels")}`);
    }

    return (
        <html>
        <body>
        <div className="container">
            <h1>Search for Hotels & Airbnb Stays</h1>
            <p>Find the perfect lodging with your preferences as a priority.</p>

            <div className="search">
                <input type="text" id="search" placeholder="Where are you going?" />
            </div>

            <div className="btn">
                <button onClick={handleSearchClick}>Search</button>
            </div>

            <div className="results">
                {hotels.length > 0 ? (
                    hotels.map((hotel, index) => (
                        <div key={index} className="hotel">
                            <h3>{hotel.name}</h3>
                            <p>{hotel.formatted_address}</p>
                        </div>
                    ))
                ) : (
                    <p>No hotels found.</p>
                )}
            </div>

            <style jsx>{`
                .container {
                    text-align: center;
                    padding: 20px;
                    max-width: 600px;
                    margin: auto;
                }
                .search input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    margin: 10px 0;
                }
                .btn button {
                    background-color: #007bff;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .results {
                    margin-top: 20px;
                }
                .hotel {
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
        </body>
        </html>
    );
}
