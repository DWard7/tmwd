import React from "react";
import { useState, useEffect } from "react";
import Movies from "../components/Movies";
import { motion } from "framer-motion"
import "../templates/style.css"

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_SECRET}&query=`;
const TOP_RATED_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_SECRET}&language=en-US&page=1`;

function Main() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMovies(TOP_RATED_API);
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
      <h1 className="text-center mt-5" style={{ color: "whitesmoke", fontSize:"2rem" }}>
        Top Rated Movies
      </h1>
      <ul className="movies" style={{ margin: "30px" }}>
        <li className="d-flex gap-3">{movies && movies.map((movie) => <Movies key={movie.id} {...movie} />)}</li>
      </ul>
    </div>
  );
}

export default Main;
