
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, removeFavorite }) => {
  // Handle missing or invalid movie data
  if (!movie || !movie.imdbID) {
    return <div className="movie-card error">Invalid movie data</div>;
  }

  const handleRemove = () => {
    if (removeFavorite) {
      removeFavorite(movie.imdbID);
    }
  };

  return (
    <div className="movie-card">
      <figure className="movie-figure">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title || "Movie Poster"}
          className="movie-poster"
        />
      </figure>
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title || "Unknown Title"}</h3>
        <p className="movie-year">{movie.Year || "Unknown Year"}</p>
        {removeFavorite ? (
          <button className="remove-btn" onClick={handleRemove}>
            Remove
          </button>
        ) : (
          <Link to={`/movie/${movie.imdbID}`} className="details-link">
            Details
          </Link>
        )}
      </div>
    </div>
  );
};

// Default props for reliability
MovieCard.defaultProps = {
  movie: {
    Poster: "/placeholder.jpg",
    Title: "Unknown Title",
    Year: "Unknown Year",
  },
};

export default MovieCard;
