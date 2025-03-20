import { useEffect, useState } from "react";
import axios from "../URL/axios";
import request from "../URL/request";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import InfoModal from "../InfoModal/InfoModal";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";

function Main() {
  const [movies, setMovies] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="pb-60">
      <header
        className="relative h-[300px] lg:h-[780px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${base_url}${movies?.backdrop_path})`,
        }}
      >
        <div className="absolute top-[300px] lg:top-[280px] left-6 lg:left-[57px] w-[600px] max-w-[90%] text-white">
          <h1 className="text-xl lg:text-4xl font-bold">
            {movies?.title || movies?.name || movies?.original_name}
          </h1>
          <p className="mt-2 text-sm lg:text-lg lg:max-w-lg">
            {movies?.overview}
          </p>

          <div className="mt-4 flex gap-4 text-sm lg:text-lg">
            <Link to={`/movie/${movies?.id}`}>
              <button className="flex items-center gap-2 bg-white text-black font-bold px-4 lg:px-6 py-2 rounded-md hover:bg-gray-200 transition">
                <FaPlay />
                Play
              </button>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gray-700 text-white font-bold px-4 lg:px-6 py-2 rounded-md hover:bg-gray-600 transition"
            >
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>

        {/* Gradient Fade Effect */}
        <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-b from-transparent via-gray-800 to-black"></div>

        {/* Modal */}
        {isModalOpen && (
          <InfoModal movie={movies} onClose={() => setIsModalOpen(false)} />
        )}
      </header>
    </div>
  );
}

export default Main;
