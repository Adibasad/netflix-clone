//f42736c82d130f113aaa2135e39e37ae
//https://api.themoviedb.org/3/movie/11?api_key=f42736c82d130f113aaa2135e39e37ae
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDI3MzZjODJkMTMwZjExM2FhYTIxMzVlMzllMzdhZSIsIm5iZiI6MTcyMzA5NTMyMC4wODQwNDksInN1YiI6IjY2YWIzNjExMzA2OGJmZTgwMDVhMDgyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.thEGDn7vbIUG2wGV7RPZBhsf55xW0N8-vKc4vLkPzOw
const API_KEY = "f42736c82d130f113aaa2135e39e37ae";

const request = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default request;
