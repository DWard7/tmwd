import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import NavBar from "./components/NavBar";

import Description from "./pages/Description";
import Video from "./components/Video";
import TVShow from "./pages/TVShow";
import TVDescription from "./pages/TVDescription";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id/description" element={<Description />} />
        <Route path="/:id/videos" element={<Video />} />
        <Route path="/shows" element={<TVShow />} />
        <Route path="/:id/description/tv" element={<TVDescription />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
