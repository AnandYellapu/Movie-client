import React, { useState } from "react";
import axios from "axios";

const Search = ({ setMovies }) => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (e = null, page = 1) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=195bb770&s=${query}&page=${page}`
      );

      if (response.data.Search) {
        setMovies(response.data.Search);
        setTotalResults(Number(response.data.totalResults));
        setCurrentPage(page);
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e) => handleSearch(e)}>
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

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handleSearch(null, currentPage - 1)}
          disabled={currentPage <= 1 || totalResults === 0}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="pagination-button"
          onClick={() => handleSearch(null, currentPage + 1)}
          disabled={currentPage >= totalPages || totalResults === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Search;
