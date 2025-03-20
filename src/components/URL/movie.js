import axios from "axios";

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY, // Replace with your actual API key from TMDb
  },
});

export default movieInstance;
