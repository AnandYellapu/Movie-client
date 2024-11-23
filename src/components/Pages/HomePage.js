import React, { useState } from "react";
import Search from "../Movie/Search";
import MovieCard from "../Movie/MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]); // Search results

  return (
    <div className="home-page">
      <h1 className="home-title">Search for Movies</h1>
      <Search setMovies={setMovies} />
      <div className="movie-results">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <p className="no-results">No movies found. Please try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
