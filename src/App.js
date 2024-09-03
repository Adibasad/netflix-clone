import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Row from "./components/Row/Row";
import request from "./components/URL/request";
import Main from "./components/Main/Main";

function App() {
  return (
    <>
      <Nav />
      {/* <Main banner/> */}
      <Main></Main>

      <Row
        title="Netflix Originals"
        fetchUrl={request.fetchTopRated}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
      <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
      <Row title="Adventure Movies" fetchUrl={request.fetchAdventureMovies} />
      <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />
    </>
  );
}

export default App;
