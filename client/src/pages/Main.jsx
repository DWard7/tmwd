import React from "react";
import { useState, useEffect } from "react";
import Movies from "../components/Movies";
import { motion } from "framer-motion"
import "../templates/style.css"

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_SECRET}&query=`;
// const DISCOVER_API = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_SECRET}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
const TRENDING_API = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_SECRET}`


function Main() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [backDrop, setBackDrop] = useState("");

  useEffect(() => {
    const DISCOVER= "https://api.themoviedb.org/3/discover/movie";
    const API_KEY=`${process.env.REACT_APP_API_SECRET}`;

    const params = new URLSearchParams({
      api_key:API_KEY,
      sort_by:"popularity.desc",
      include_adult:false,
      include_video:false,
    });

    fetch(`${DISCOVER}?${params}`)
    .then((res) => res.json())
    .then((data) => {
      const backDrop = data.results.map(movie => movie.backdrop_path);
      const randomImg = backDrop[Math.floor(Math.random() * backDrop.length)];
      setBackDrop(`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/${randomImg}`)
    })
    .catch((err) => console.log(err))
  }, []);

  useEffect(() => {
    getMovies(TRENDING_API);
  }, []);


  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results)
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
    <>
      <div id="header" className="container" style={{backgroundImage: `url('${backDrop}')`}}>
        <div className="d-flex justify-content-center">
          <h1 className=" font-bold mt-36">Welcome to Movie Watcher</h1>
        </div>
          <div className="d-flex justify-content-center mb-3">
            <h1 className="font-bold">Where you can discover movies and Tv Shows.</h1>
          </div>
        <form onSubmit={handleOnSubmit}>
          <div className="d-flex">
            <input
              value={search}
              onChange={handleOnChange}
              placeholder="Search for a movie"
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
        <ul  className="movies">
          <li className="d-flex gap-3">{movies && movies.map((movie) => <Movies key={movie.id} {...movie} />)}</li>
        </ul>
      </div>
    </>
  );
}

export default Main;
