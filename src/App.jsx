import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import NavBar from "./components/NavBar";
import "./App.css";
import Description from "./pages/Description";
import Video from "./components/Video";
import TVShow from "./pages/TVShow";
import TVDescription from "./pages/TVDescription";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id/description" element={<Description />}/>
        <Route path="/:id/videos" element={<Video/>}/>
        <Route path="/shows" element={<TVShow/>}/>
        <Route path="/:id/description/tv" element={<TVDescription/>}/>
      </Routes>
    </>
  );
}

export default App;
