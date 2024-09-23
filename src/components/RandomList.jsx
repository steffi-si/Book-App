import React, { useState, useEffect } from 'react';

const commonWords = ['the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'she', 'as', 'you', 'do', 'at', 'this', 'but'];

export default function RandomList() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);

    const fetchBooks = () => {
        setIsLoading(true);
        const randomWord = commonWords[Math.floor(Math.random() * commonWords.length)];
        const url = `https://openlibrary.org/search.json?q=${randomWord}&limit=20`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setBooks(data.docs);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    function handleBookClick(book) {
        setSelectedBook(book);
    };

    function closeDetails() {
        setSelectedBook(null);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="random-list-wrapper">
            <ul>
                {books.map((book, index) => (
                    <li key={index} onClick={() => handleBookClick(book)}>
                        <img 
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
                            alt={book.title} 
                        />
                        <p>{book.title}</p>
                    </li>
                ))}
            </ul>

            {selectedBook && (
                <div className="selected-book-wrapper">
                    <h2>{selectedBook.title}</h2>
                    <img 
                        src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`} 
                        alt={selectedBook.title} 
                    />
                    <p>Author: {selectedBook.author_name ? selectedBook.author_name.join(", ") : "Unknown"}</p>
                    <p>First Published: {selectedBook.first_publish_year || "Unknown"}</p>
                    <p>ISBN: {selectedBook.isbn ? selectedBook.isbn[0] : "Unknown"}</p>
                    <button onClick={closeDetails}>Close</button>
                </div>
            )}

            <div className="new-random-list-wrapper">
                <p>Nothing of interest? Let us suggest other books!</p>
                <button onClick={fetchBooks}>New suggestions</button>
            </div>
        </div>
    );
}