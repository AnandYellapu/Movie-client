import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Favorites from "./Favorites";

const MovieDetails = () => {
  const { id } = useParams(); // Movie ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=195bb770&i=${id}`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to fetch movie details. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="movie-details">
      <h1>{movie.Title}</h1>
      <div className="movie-details-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-image.jpg"}
          alt={movie.Title}
          className="movie-poster"
        />
        <div className="movie-info">
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
        </div>
      </div>
      {/* Add to Favorites Button */}
      <Favorites movie={movie} />
    </div>
  );
};

export default MovieDetails;
