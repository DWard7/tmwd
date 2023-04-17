import React from "react";
import { useState, useEffect } from "react";
import Shows from "../components/Shows";
import { motion } from "framer-motion";
import "../templates/style.css";

const DISCOVER_TV_API = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_SECRET}&language=en-US&page=1`;
const SEARCH_API_TV = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_SECRET}&query=`;

function TVShow() {
  const [tv, setTv] = useState([]);
  const [searchTV, setSearchTV] = useState("");
  const [tvBackDrop, setTvBackDrop] = useState("");

  useEffect(() => {
    const POPULAR_TV = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_SECRET}&language=en-US&page=1`;

    fetch(`${POPULAR_TV}`)
      .then((res) => res.json())
      .then((data) => {
        const tvBackDrop = data.results.map((tv) => tv.backdrop_path);
        const randomTvImg =
          tvBackDrop[Math.floor(Math.random() * tvBackDrop.length)];
        setTvBackDrop(
          `https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/${randomTvImg}`
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getTvShows(DISCOVER_TV_API);
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
    <>
      <div
        id="header"
        className="container"
        style={{ backgroundImage: `url('${tvBackDrop}')` }}
      >
        <div className="d-flex justify-content-center">
          <h1 className="font-bold mt-36">Welcome to Movie Watcher</h1>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <h1 className="font-bold">
            Where you can discover movies and Tv Shows.
          </h1>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="d-flex">
            <input
              value={searchTV}
              onChange={handleOnChange}
              placeholder="Search for a tv show"
              type="text"
              className="form-control rounded-pill"
              id="search"
              name="search"
            />
            <motion.button
              type="submit"
              className="rounded-full bg-gradient-to-r from-cyan-600 to-purple-800 text-lg p-2"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              id="searchBtn"
            >
              Search
            </motion.button>
          </div>
        </form>
      </div>
      <div className="container">
        <ul className="tv">
          <li className="d-flex gap-3">
            {tv && tv.map((tv) => <Shows key={tv.id} {...tv} />)}
          </li>
        </ul>
      </div>
    </>
  );
}

export default TVShow;
