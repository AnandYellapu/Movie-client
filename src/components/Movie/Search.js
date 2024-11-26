
import React, { useState } from "react";
import axios from "axios";

const Search = ({ setMovies }) => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e = null, page = 1) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=195bb770&s=${query}&page=${page}`
      );

      if (response.data.Response === "True" && response.data.Search) {
        setMovies(response.data.Search);
        setTotalResults(Number(response.data.totalResults));
        setCurrentPage(page);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(response.data.Error || "No results found.");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="search-container">
      {/* Search Form */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {/* Feedback Messages */}
      {loading && <p className="loading-message">Loading movies...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Pagination */}
      {totalResults > 0 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => handleSearch(null, currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            className="pagination-button"
            onClick={() => handleSearch(null, currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* No Results Message */}
      {!loading && !error && totalResults === 0 && query.trim() && (
        <p className="no-results-message">No results found for "{query}".</p>
      )}
    </div>
  );
};

export default Search;
