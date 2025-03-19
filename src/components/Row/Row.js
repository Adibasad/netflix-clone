import { useEffect, useState } from "react";
import axios from "../URL/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opt = {
    height: "200",
    width: "400",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleHover = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="bg-black ml-[57px] mt-[10px] mb-[10px]">
      <h2 className="text-white text-[30px] font-[Gill Sans] py-[3px] mb-[5px]">
        {title}
      </h2>

      <div className="flex overflow-x-scroll p-[20px] ">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onMouseOver={() => setTimeout(() => handleHover(movie), 1500)}
            onMouseDown={() => handleHover()}
            className={`cursor-pointer object-contain max-h-[120px] mr-[15px] transition-transform duration-[450ms] ${
              isLargeRow ? "max-h-[250px]" : ""
            } ${isLargeRow ? "hover:scale-[1.09]" : "hover:scale-[1.15]"}`}
            src={`${base_url}${movie.backdrop_path}`}
            alt={movie.title}
          />
        ))}
      </div>

      {trailerUrl && (
        <div className="z-[5] relative mt-4 flex justify-center">
          <YouTube videoId={trailerUrl} opts={opt} />
        </div>
      )}
    </div>
  );
}

export default Row;
