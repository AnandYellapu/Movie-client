
import React from "react";

const Favorites = ({ movie }) => {
  const addFavorite = () => {
    if (!movie || !movie.imdbID) {
      alert("Invalid movie data.");
      return;
    }

    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

      if (!isFavorite) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayMessage(`${movie.Title} added to favorites!`, true);
      } else {
        displayMessage(`${movie.Title} is already in favorites!`, false);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      alert("An error occurred while adding to favorites. Please try again.");
    }
  };

  const displayMessage = (message, isSuccess) => {
    alert(message);
    // Optionally, replace this with a styled toast or notification system.
  };

  return (
    <button className="add-to-favorites" onClick={addFavorite}>
      Add to Favorites
    </button>
  );
};

export default Favorites;
