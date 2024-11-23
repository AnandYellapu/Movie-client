import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import MovieDetails from "./components/Movie/MovieDetails";
import FavoritesPage from "./components/Pages/FavoritesPage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
