import { useEffect, useState } from "react";
import axios from "../URL/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opt = {
    height: "350", // Trailer size increased
    width: "600",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleHover = (movie) => {
    setHoveredMovie(movie);
    const timeout = setTimeout(() => {
      movieTrailer(movie?.title || movie?.name || movie?.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }, 1000); // 4 seconds delay

    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setTrailerUrl("");
    setHoveredMovie(null);
  };

  return (
    <div className="bg-black ml-[57px] mt-[10px] mb-[10px]">
      <h2 className="text-white text-[40px] font-bold py-[10px] mb-[15px]">
        {title}
      </h2>

      <div className="flex overflow-x-scroll p-[20px] scrollbar-hide space-x-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative cursor-pointer"
            onMouseEnter={() => handleHover(movie)}
            onMouseLeave={handleMouseLeave}
            style={{ minWidth: isLargeRow ? "400px" : "300px" }} // Expanding width
          >
            {/* Movie Image */}
            <img
              className={`object-cover rounded-lg transition-transform duration-[450ms] shadow-sm shadow-gray ${
                isLargeRow ? "max-h-[400px]" : "max-h-[350px]"
              } hover:scale-[1.12]`}
              src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
              alt={movie.title}
            />

            {/* Trailer Plays on Top of Image */}
            {trailerUrl && hoveredMovie?.id === movie.id && (
              <div className="absolute inset-0 z-10 flex justify-center items-center bg-black bg-opacity-80">
                <YouTube videoId={trailerUrl} opts={opt} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
