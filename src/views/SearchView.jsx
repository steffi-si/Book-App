import { useState, useEffect } from "react";

export default function SearchView() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("title");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleSearch(e) {
        e.preventDefault();
        if (!searchTerm) return;

        setIsLoading(true);
        setError(null);
        
        let url = null;
        if (searchType === "title") {
            url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`;
        } else {
            url = `https://openlibrary.org/search.json?author=${encodeURIComponent(searchTerm)}&sort=new`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setResults(data.docs);
                setIsLoading(false);
            })
            .catch(error => {
                setError("Error fetching data: " + error.message);
                setIsLoading(false);
            });
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <label htmlFor="search">Search:</label>
                <input 
                    type="search" 
                    name="search" 
                    id="search" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter an author or a book title..." 
                />
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
                <button type="submit">Search</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div>
                {results.map((book, index) => (
                    <div key={index}>
                        <h3>{book.title}</h3>
                        <p>Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
                        <p>First Published: {book.first_publish_year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}