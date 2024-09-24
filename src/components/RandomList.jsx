import React, { useState, useEffect } from 'react';

const commonWords = ['the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'she', 'as', 'you', 'do', 'at', 'this', 'but'];

export default function RandomList() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);

    function fetchBooks () {
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
                    <p><strong>Author(s): </strong>{selectedBook.author_name ? selectedBook.author_name.join(", ") : "Unknown"}</p>
                    <p><strong>First Published: </strong>{selectedBook.first_publish_year || "Unknown"}</p>
                    <p><strong>ISBN: </strong>{selectedBook.isbn ? selectedBook.isbn[0] : "Unknown"}</p>
                    <p><strong>Publisher: </strong>{selectedBook.publisher ? selectedBook.publisher[0] : "Unknown"}</p>
                    <p><strong>Number of pages: </strong>{selectedBook.number_of_pages || "Unknown"}</p>
                    <p><strong>Subjects: </strong>{selectedBook.subject ? selectedBook.subject.slice(0 ,5).join(", ") : "Unknown"}</p>
                    <p><strong>Average Rating: </strong>{selectedBook.ratings_average.toFixed(1) || "-"} / 5</p>
                    {
                        selectedBook.ebook_access === "borrowable" && (
                            <p><strong>Ebook available: </strong>Yes (Borrowable)</p>
                        )
                    }
                    {
                        selectedBook.ebook_count_i > 0 && (
                            <p><strong>Ebook count: </strong>{selectedBook.ebook_count_i}</p>
                        )
                    }
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