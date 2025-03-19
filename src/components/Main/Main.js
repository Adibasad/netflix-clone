import { useEffect, useState } from "react";
import axios from "../URL/axios";
import request from "../URL/request";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";

const base_url = "https://image.tmdb.org/t/p/original/";

function Main() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(request.fetchTrending);
      setMovies(
        req.data.results[
          Math.floor(Math.random() * (req.data.results.length - 1))
        ]
      );
    }
    fetchData();
  }, []);

  return (
    <header
      className="relative h-[300px]  md:h-[750px] lg:h-[800px] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(${base_url}${movies?.backdrop_path})`,
      }}
    >
      {/* Movie Info Section */}
      <div className="absolute bottom-[100px] md:bottom-[150px] px-5 md:px-12 lg:px-20 text-white w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%]">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {movies?.title}
        </h1>
        <p className="mt-2 text-sm md:text-lg lg:text-xl leading-relaxed line-clamp-3">
          {movies?.overview}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex gap-3 md:gap-6">
          <button className="flex items-center gap-2 bg-white text-black font-bold px-4 md:px-6 py-2 md:py-3 rounded-md hover:bg-gray-200 transition">
            <FaPlay />
            Play
          </button>
          <button className="flex items-center gap-2 bg-gray-700 text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-md hover:bg-gray-600 transition">
            <AiOutlineInfoCircle />
            More Info
          </button>
        </div>
      </div>

      {/* Gradient Fade Effect */}
      <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-b from-transparent via-gray-800 to-black"></div>
    </header>
  );
}

export default Main;
