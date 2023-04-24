import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../templates/style.css";

const IMG_API = "https://image.tmdb.org/t/p/w200";

function Popular() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [movieActive, setMovieActive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${
          movieActive ? "movie" : "tv"
        }/popular?api_key=${
          process.env.REACT_APP_API_SECRET
        }&language=en-US&page=1`
        );
      movieActive
        ? setPopularMovies(res.data.results)
        : setPopularTv(res.data.results);
    };
    fetchData();
  }, [movieActive]);

  const handleToggle = () => {
    setMovieActive(!movieActive);
  };
  return (

    <div className="container my-3">
      <motion.button
        id="trending"
        className="text-white rounded-full bg-gradient-to-r from-cyan-600 to-purple-800 text-lg p-2"
        onClick={handleToggle}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      >
        {movieActive ? "Popular Movies" : "Popular TV shows"}
      </motion.button>
      {movieActive ? (
        <ul className="movies">
          {popularMovies.map((movie) => (
            <li
              className="d-flex gap-3"
              key={movie.id}
            >
              <div>
                <a href={`/${movie.id}/description`}>
                  <img
                    id="posters"
                    className="rounded-4 p-2"
                    src={IMG_API + movie.poster_path}
                    alt=""
                  ></img>
                  <p>{movie.title}</p>
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="movies">
          {popularTv.map((show) => (
            <li
              className="d-flex gap-3"
              style={{ color: "blue" }}
              key={show.id}
            >
              <div>
                <a href={`/${show.id}/description`}>
                  <img
                    id="posters"
                    className="rounded-4 p-2"
                    src={IMG_API + show.poster_path}
                    alt={show.name}
                  />
                  <p className="text-black">{show.name}</p>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Popular;
