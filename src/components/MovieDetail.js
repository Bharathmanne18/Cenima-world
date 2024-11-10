import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // useLocation for accessing state

const API_KEY = "735014b343a820c2856ed2eb9f4a9a78";
const API_BASE_URL = "https://api.themoviedb.org/3/";

const MovieDetail = () => {
  const { movieId } = useParams(); // Access the movieId from URL params
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Access the navigation state (category)
  
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState(null); // State to store trailer key
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      console.log(`Fetching movie details for movieId: ${movieId}`);
      try {
        // Fetch movie details
        const movieResponse = await axios.get(`${API_BASE_URL}movie/${movieId}?api_key=${API_KEY}`);
        console.log("Movie details response:", movieResponse.data);
        setMovieDetails(movieResponse.data);

        // Fetch movie trailers
        const trailerResponse = await axios.get(`${API_BASE_URL}movie/${movieId}/videos?api_key=${API_KEY}`);
        console.log("Trailer response:", trailerResponse.data);

        // Check if there are any trailers available
        if (trailerResponse.data && trailerResponse.data.results) {
          // Filter the trailers to get the official trailer (if any)
          const officialTrailer = trailerResponse.data.results.find(
            (video) => video.type === "Trailer" && video.name.toLowerCase().includes("official")
          );

          // If an official trailer exists, set it. Otherwise, set the first available trailer
          if (officialTrailer) {
            setMovieTrailer(officialTrailer.key); // Store the trailer key for the official trailer
          } else if (trailerResponse.data.results.length > 0) {
            setMovieTrailer(trailerResponse.data.results[0].key); // Fallback to the first trailer if no official one is found
          }
        }
      } catch (error) {
        console.error("Error fetching movie details or trailer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // If loading or no movie found
  if (loading) return <div>Loading...</div>;
  if (!movieDetails) return <div>Movie not found.</div>;

  // Handle "Go to Previous Page" button click
  const handleGoBack = () => {
    if (location.state?.category) {
      navigate(`/category/${location.state.category}`);
    } else {
      navigate("/"); // Default fallback to home if no category is found
    }
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Centering horizontally
      justifyContent: "center", // Centering vertically
      minHeight: "100vh", // Full viewport height
      textAlign: "center", // Center text
      padding: 3
    }}>
      <Typography variant="h4" gutterBottom>{movieDetails.title}</Typography>

      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        style={{
          width: "300px",
          height: "450px",
          objectFit: "cover",
          marginBottom: "20px"
        }}
      />
      
      <Typography variant="body1" paragraph>{movieDetails.overview}</Typography>

      {/* Display the trailer if available */}
      {movieTrailer ? (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>Official Trailer:</Typography>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movieTrailer}`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary">No trailer available.</Typography>
      )}

      {/* Go back button */}
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go to Previous page
      </Button>
    </Box>
  );
};

export default MovieDetail;
