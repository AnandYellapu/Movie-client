import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Favorites from "./Favorites";

const MovieDetails = () => {
  const { id } = useParams(); // Movie ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=195bb770&i=${id}`
      );

      if (response.data.Response === "False") {
        throw new Error(response.data.Error || "Movie not found");
      }

      setMovie(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching movie details:", err);
      setError(err.message || "Failed to fetch movie details. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);   //eslint-disable-line

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchMovieDetails} className="retry-button">
          Retry
        </button>
      </div>
    );

  return (
    <div className="movie-details">
      <h1>{movie?.Title || "Unknown Title"}</h1>
      <div className="movie-details-container">
        <img
          src={movie?.Poster !== "N/A" ? movie.Poster : "/placeholder-image.jpg"}
          alt={movie?.Title || "Movie Poster"}
          className="movie-poster"
        />
        <div className="movie-info">
          <p><strong>Year:</strong> {movie?.Year || "N/A"}</p>
          <p><strong>Genre:</strong> {movie?.Genre || "N/A"}</p>
          <p><strong>Director:</strong> {movie?.Director || "N/A"}</p>
          <p><strong>Actors:</strong> {movie?.Actors || "N/A"}</p>
          <p><strong>Plot:</strong> {movie?.Plot || "No plot available"}</p>
          <p><strong>Runtime:</strong> {movie?.Runtime || "N/A"}</p>
        </div>
      </div>
      {/* Add to Favorites Button */}
      {movie && <Favorites movie={movie} />}
    </div>
  );
};

export default MovieDetails;
