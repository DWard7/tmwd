import React from "react";
import { useState, useEffect } from "react";
import Shows from "../components/Shows";
import { motion } from "framer-motion";

const TOP_RATED_TV_API = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_SECRET}&language=en-US&page=1`;
const SEARCH_API_TV = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_SECRET}&query=`;

function TVShow() {
  const [tv, setTv] = useState([]);
  const [searchTV, setSearchTV] = useState("");

  useEffect(() => {
    getTvShows(TOP_RATED_TV_API);
  }, []);

  const getTvShows = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setTv(data.results);
      });
  };

  const handleOnChange = (e) => {
    setSearchTV(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTV) {
      getTvShows(SEARCH_API_TV + searchTV);
      setSearchTV("");
    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleOnSubmit}>
        <div className="d-flex">
          <input
            value={searchTV}
            onChange={handleOnChange}
            placeholder="Search for a tv show"
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
      <h1
        className="text-center mt-5"
        style={{ color: "whitesmoke", fontSize: "2rem" }}
      >
        Top Rated TV Shows
      </h1>
      <ul className="movies">
        <li className="d-flex gap-3">{tv && tv.map((tv) => <Shows key={tv.id} {...tv} />)}</li>
      </ul>
    </div>
  );
}

export default TVShow;
