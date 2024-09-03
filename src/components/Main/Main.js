import { useEffect, useState } from "react";
import axios from "../URL/axios";
import request from "../URL/request";
import "./Main.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";

const base_url = "https://image.tmdb.org/t/p/original/";

function Main() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(request.fetchTrending);

      setMovies(
        // setting one random movie from array in the main poster
        req.data.results[
          Math.floor(Math.random() * (req.data.results.length - 1))
        ]
      );
      return req;
    }
    fetchData();
  }, []);

  console.log(movies);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movies?.backdrop_path})`,
      }}
    >
      <div className="info_banner">
        <h1>{movies?.title}</h1>
        {/* discription */}
        <p>{movies?.overview}</p>
        {/* 2 buttons */}
        <button type="button" class="btn btn-light">
          <FaPlay />
          &nbsp; Play
        </button>
        &nbsp;
        <button type="button" class="btn btn-secondary">
          <AiOutlineInfoCircle className="button_icon" />
          &nbsp; More Info
        </button>
      </div>

      <div className="banner_fadedown"></div>
    </header>
  );
}

export default Main;
