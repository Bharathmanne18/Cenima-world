import SearchIcon from "@mui/icons-material/Search"; // Import the Search icon
import { Box, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./MovieGrid.css";
import Sidebar from "./Sidebar"; // Import Sidebar component

// TMDB API Key and Base URL
const API_KEY = "735014b343a820c2856ed2eb9f4a9a78";
const API_BASE_URL = "https://api.themoviedb.org/3/";

// Mapping categories to their genre IDs on TMDB
const categoryMap = {
  comedy: "35", // Genre ID for Comedy
  thriller: "53", // Genre ID for Thriller
  action: "28", // Genre ID for Action
  drama: "18", // Genre ID for Drama
  horror: "27", // Genre ID for Horror
  family: "10751", // Genre ID for Family
  "sci-fi": "878", // Genre ID for Sci-Fi
  romance: "10749", // Genre ID for Romance
  adventure: "12", // Genre ID for Adventure
  documentary: "99", // Genre ID for Documentary
  animation: "16", // Genre ID for Animation
  fantasy: "14", // Genre ID for Fantasy
};

const MovieGrid = () => {
  const [movies, setMovies] = useState([]); // State to store movie list
  const [loading, setLoading] = useState(false); // State to track loading status
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default category is "all"
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [hasMoreMovies, setHasMoreMovies] = useState(true); // Flag to check if there are more movies to load
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  // Fetch movies based on the selected category, page number, and search query
  const fetchMovies = useCallback(async (category, page, query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `${API_BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}` // Search query URL
        : category === "all"
        ? `${API_BASE_URL}discover/movie?api_key=${API_KEY}&page=${page}` // All movies URL
        : `${API_BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=${categoryMap[category]}&page=${page}`; // Category-based URL

      console.log(`Fetching page ${page} for category ${category} with query "${query}"`); // Debug: API request

      const response = await axios.get(url);

      // If no movies are found, stop further requests
      if (response.data.results.length === 0) {
        setHasMoreMovies(false); // No more movies to load
      }

      // Append the new movies to the existing ones
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setHasMoreMovies(response.data.page < response.data.total_pages); // Check if there are more pages
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch movies when selectedCategory, currentPage, or searchQuery changes
  useEffect(() => {
    setMovies([]); // Reset movie list when category or search query changes
    setCurrentPage(1); // Reset page to 1
    setHasMoreMovies(true); // Reset the "has more movies" flag
    fetchMovies(selectedCategory, 1, searchQuery); // Always start at page 1 for a new category or search
  }, [selectedCategory, searchQuery, fetchMovies]);

  // Fetch more movies when currentPage changes
  useEffect(() => {
    if (currentPage > 1) {
      fetchMovies(selectedCategory, currentPage, searchQuery);
    }
  }, [currentPage, selectedCategory, searchQuery, fetchMovies]);

  // Handle movie card click (navigate to the movie details page)
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to the movie detail page with the movieId
  };

  // Handle infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.innerHeight + document.documentElement.scrollTop;
      const nearBottom = document.documentElement.offsetHeight - 100; // Trigger 100px before bottom

      // Check if the user has reached near the bottom of the page
      if (scrollBottom >= nearBottom) {
        // Only trigger load more if there are more movies to load and not loading already
        if (hasMoreMovies && !loading) {
          console.log("Bottom reached, loading more movies..."); // Debug: Scroll bottom detected
          setCurrentPage((prevPage) => prevPage + 1); // Increment the page number to load next set of movies
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreMovies, loading]); // Dependencies include hasMoreMovies and loading

  // Render the movie grid with 5 movies per row
  const renderMovies = () => {
    if (loading && currentPage === 1) return <div>Loading...</div>; // Show loading indicator initially

    if (movies.length === 0) return <div>No movies found.</div>; // Show message if no movies are found

    return (
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={movie.id}>
            <div
              className="movie-item"
              onClick={() => handleMovieClick(movie.id)} // Handle movie click
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-title">{movie.title}</div>
            </div>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
      <Box sx={{ display: "flex" }}>
        <Sidebar
          onCategoryChange={setSelectedCategory} // Pass category change function
          currentCategory={selectedCategory} // Pass current category to highlight the active category
        />
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            {selectedCategory === "all"
              ? "All Movies"
              : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Movies`}
          </Typography>
          {/* Search Input Field with Search Icon */}
          <TextField
            label="Search for a Movie.........."
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {renderMovies()}
          {loading && currentPage > 1 && <div>Loading more movies...</div>} {/* Loading indicator for infinite scroll */}
        </Box>
      </Box>
    </Box>
  );
};

export default MovieGrid;
