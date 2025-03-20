import { AiOutlineClose } from "react-icons/ai";
import {
  FaExclamationTriangle,
  FaGlobeAmericas,
} from "react-icons/fa";
import { PiPopcornFill } from "react-icons/pi";
import { createPortal } from "react-dom";

const base_url = "https://image.tmdb.org/t/p/original/";

const InfoModal = ({ movie, onClose }) => {
  if (!movie) return null;

  console.log(movie);

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
      onClick={onClose} // Close when clicking outside
    >
      <div
        className="relative bg-gray-900 text-white rounded-lg shadow-lg w-[800px] max-w-[90%] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:text-gray-400"
        >
          <AiOutlineClose />
        </button>

        {/* Movie Backdrop */}
        <div className="relative">
          <img
            src={`${base_url}${movie?.backdrop_path}`}
            alt={movie?.title || movie?.name}
            className="w-full h-[300px] object-cover"
          />
          {/* 18+ Badge */}
          {movie?.adult && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
              <FaExclamationTriangle className="inline-block mr-1" /> 18+
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-6">
          <h2 className="text-3xl font-bold">
            {movie?.title || movie?.name || movie?.original_name}
          </h2>
          <p className="mt-2 text-gray-300">{movie?.overview}</p>

          {/* Additional Info */}
          <div className="mt-4 flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <PiPopcornFill className="text-rose-500" />{" "}
              {movie?.vote_average?.toFixed(1)}
            </span>
            <span>📅 {movie?.first_air_date || movie?.release_date}</span>
            <span className="flex items-center gap-1">
              <FaGlobeAmericas /> {movie?.origin_country?.join(", ")}
            </span>
            <span
              className={`font-bold px-2 py-1 rounded ${
                movie?.adult ? "text-red-500" : "text-blue-400"
              }`}
            >
              {movie?.adult ? "Mature" : "All Audiences"}
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default InfoModal;
