import React from "react";

const Favorites = ({ movie }) => {
  const addFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (!isFavorite) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${movie.Title} added to favorites!`);
    } else {
      alert(`${movie.Title} is already in favorites!`);
    }
  };

  return (
    <button className="add-to-favorites" onClick={addFavorite}>
      Add to Favorites
    </button>
  );
};

export default Favorites;
