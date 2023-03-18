import React from "react";
import { useState, useEffect } from "react";
import Movies from "../components/Movies";
import { motion } from "framer-motion"
import "../templates/style.css"

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_SECRET}&query=`;
const DISCOVER_API = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_SECRET}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`

function Main() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMovies(DISCOVER_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (search) {
      getMovies(SEARCH_API + search);
      setSearch("");
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center">
        <h1 style={{fontSize:"1.6rem"}}>Welcome to Movie Watcher</h1>
      </div>
        <div className="d-flex justify-content-center mb-3">
          <h1 style={{fontSize:"1.6rem"}}>Where you can discover movies and Tv Shows.</h1>
        </div>
      <form onSubmit={handleOnSubmit}>
        <div className="d-flex">
          <input
            value={search}
            onChange={handleOnChange}
            placeholder="Search for a movie"
            style={{ height: "40px" }}
            type="text"
            className="form-control rounded-pill"
            id="search"
            name="search"
          />
          <motion.button
            style={{ marginLeft: "25px" }}
            type="submit"
            className="btn btn-outline-primary rounded-pill"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            Search
          </motion.button>
        </div>
      </form>
      <ul className="movies" style={{ margin: "30px" }}>
        <li className="d-flex gap-3">{movies && movies.map((movie) => <Movies key={movie.id} {...movie} />)}</li>
      </ul>
    </div>
  );
}

export default Main;
