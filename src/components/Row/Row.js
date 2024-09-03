import "./Row.css";
import { useEffect, useState } from "react";
import axios from "../URL/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); //movies->array
  const [trailerUrl, setTrailerUrl] = useState(); //url for youtubw trailer

  //when the row load-s , we need the information/data to be fetchhed and appeared in rows
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); //wait for promise--> Url
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //If [] runs, only then the row will load once

  const opt = {
    height: "200",
    width: "400",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleHover = (movie) => {
    console.log(movie.title);
    if (trailerUrl) {
      setTrailerUrl(false);
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          // console.log(url + " " + movie.title);
          //https://www.youtube.com/watch?v=bKPP20vp3s
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="row">
        <h2 className="row_title">{title}</h2>

        <div className="movie_posters">
          {/* multiple row posters */}
          {movies.map((movie) => (
            <img
              key={movie.id}
              onMouseOver={() =>
                setTimeout(() => {
                  handleHover(movie);
                }, 1500)
              }
              onMouseDown={() => handleHover()}
              className={`movie_poster ${isLargeRow && "row_largePoster"}`}
              src={`${base_url}${movie.backdrop_path}`}
              alt={movie.title}
            />
          ))}
        </div>
      </div>

      {trailerUrl && (
        <YouTube className="vid" videoId={trailerUrl} opts={opt} />
      )}
    </>
  );
}

export default Row;
