import React, { useState } from "react";
import MovieCard from "../Movie/MovieCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Favorite Movies</h1>
      <div className="movie-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              removeFavorite={removeFavorite}
            />
          ))
        ) : (
          <p className="no-favorites">No favorite movies yet!</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
