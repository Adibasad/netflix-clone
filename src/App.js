
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CreateUser from "./components/CreateUser/Register";
// import Login from "./components/Login/Login";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/:id" element={<Home />}></Route>
          {/* <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/login/:id" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
