import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Movies from "../components/Movies";
import { motion } from "framer-motion";
import "../templates/style.css";

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_SECRET}&query=`;
const IMG_API = "https://image.tmdb.org/t/p/w200";

function Main() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [backDrop, setBackDrop] = useState("");
  const [trendingWeek, setTrendingWeek] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/${
          trendingWeek ? "week" : "day"
        }?api_key=${process.env.REACT_APP_API_SECRET}`
      );
      setMovies(res.data.results);
    };
    fetchData();
  }, [trendingWeek]);

  useEffect(() => {
    const DISCOVER = "https://api.themoviedb.org/3/discover/movie";
    const API_KEY = `${process.env.REACT_APP_API_SECRET}`;

    const params = new URLSearchParams({
      api_key: API_KEY,
      sort_by: "popularity.desc",
      include_adult: false,
      include_video: false,
    });

    fetch(`${DISCOVER}?${params}`)
      .then((res) => res.json())
      .then((data) => {
        const backDrop = data.results.map((movie) => movie.backdrop_path);
        if (backDrop.length > 0) {
          const randomImg =
            backDrop[Math.floor(Math.random() * backDrop.length)];
          setBackDrop(
            `https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/${randomImg}`
          );
        } else {
          setBackDrop(
            "https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/uozb2VeD87YmhoUP1RrGWfzuCrr.jpg"
          );
        }
      })
      .catch((err) => console.log(err));
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
    <>
      <div
        id="header"
        className="container"
        style={{ backgroundImage: `url('${backDrop}')` }}
      >
        <div className="d-flex justify-content-center">
          <h1 className=" font-bold mt-36">Welcome to Movie Watcher</h1>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <h1 className="font-bold">
            Where you can discover movies and Tv Shows.
          </h1>
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
        <button
          id="trending"
          className="rounded-full bg-gradient-to-r from-cyan-600 to-purple-800 text-lg p-2"
          onClick={() => setTrendingWeek(!trendingWeek)}
        >
          {trendingWeek ? "Trending this week" : "Trending today"}
        </button>
        <ul className="movies">
          <li className="d-flex gap-3">
            {movies &&
              movies.map((movie) => <Movies key={movie.id} {...movie} />)}
          </li>
        </ul>
      </div>

      <div>
        <button
          className="rounded-full bg-gradient-to-r from-cyan-600 to-purple-800 text-lg p-2"
          onClick={handleToggle}
        >
          {movieActive ? "Popular Movies" : "Popular TV shows"}
        </button>
        {movieActive ? (
          <ul className="movies">
            {popularMovies.map((movie) => (
              <li
                className="d-flex gap-3"
                style={{ color: "blue" }}
                key={movie.id}
              >
                <a href={`/${movie.id}/description`}>
                  <img
                    id="posters"
                    className="rounded-4"
                    src={IMG_API + movie.poster_path}
                    alt=""
                  ></img>
                </a>
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
                {" "}
                <a href={`/${show.id}/description`}>
                  <img
                    id="posters"
                    className="rounded-4"
                    src={IMG_API + show.poster_path}
                    alt={show.title}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Main;
