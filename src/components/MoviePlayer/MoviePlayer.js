import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PageNotFound from "../PageNotFound/PageNotFound";
import movieInstance from "../URL/movie";

const MoviePlayerPage = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [videoId, setVideoId] = useState(null); // To store the YouTube video ID
  const [loading, setLoading] = useState(true); // To indicate loading state
  const [error, setError] = useState(null); // To store error messages

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        // Fetch the movie details using movieInstance
        const req = await movieInstance.get(`/movie/${id}`);
        setMovie(req.data); // Set the movie details
      } catch (error) {
        setError("Movie not found.");
      }
    }

    async function fetchMovieVideo() {
      try {
        // Fetch the movie videos using the movie ID
        const videoReq = await movieInstance.get(`/movie/${id}/videos`);
        const videoData = videoReq.data.results;

        if (videoData.length > 0) {
          // Set the first video ID (YouTube video)
          setVideoId(videoData[0].key);
        } else {
          setError("No video found for this movie.");
        }
      } catch (error) {
        setError("Video not found.");
      } finally {
        // Mark loading as false once both movie and video fetch are done
        setLoading(false);
      }
    }

    // Fetch movie and video details
    fetchMovieDetails();
    fetchMovieVideo();
  }, [id]);

  // If loading, show loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full text-bold text-2xl text-white">
        <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
        Loading...
      </div>
    );
  }

  // If error, show PageNotFound component
  if (error || !movie || !videoId) {
    return <PageNotFound />;
  }

  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-50">
        {/* YouTube Video Embed */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Movie Player"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Movie Info Section */}
      {/* <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent via-gray-800 to-black p-4">
        <h1 className="text-white text-4xl font-bold">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <p className="text-white text-lg">{movie.overview}</p>
      </div> */}
    </div>
  );
};

export default MoviePlayerPage;
