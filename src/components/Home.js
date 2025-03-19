
import Nav from "./Nav/Nav";
import Row from "./Row/Row";
import request from "./URL/request";
import Main from "./Main/Main";

function Home() {
  return (
    <>
      <Nav></Nav>
      {/* <Main banner/> */}
      <Main></Main>
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />

      <Row
        title="Netflix Originals"
        fetchUrl={request.fetchTopRated}
        isLargeRow
      />

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

export default Home;
