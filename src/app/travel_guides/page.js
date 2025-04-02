"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";
import "./page.css"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const query = encodeURIComponent(`${searchTerm} tourist attractions`);
      router.push(`https://www.google.com/maps/search/${query}`);
    }
  };

  return (
    <html>
      <body>
        <div className="container">
        {/* Load Google Maps Places API */}
        <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
        />

        <div className="message">
            <h1>Explore travel guides and itineraries</h1>
        </div>

        <div className="search">
            <Autocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => setSearchTerm(place.formatted_address)}
            options={{ types: ["(cities)"] }}
            className="search-input"
            placeholder="Search for a destination"
            />
            <button onClick={handleSearch} id="searchBtn">
            Search
            </button>
        </div>

        <div className="browse">
            <h4>Or Browse our most popular destinations:</h4>
            <div className="button-container">
            {["Las Vegas", "Auckland", "Copenhagen"].map((city, index) => (
                <button key={index} onClick={() => setSearchTerm(city)}>
                {city}
                </button>
            ))}
            </div>
        </div>
        </div>
      </body>
    </html>
  );
}
