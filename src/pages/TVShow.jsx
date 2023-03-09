import React from "react";
import { useState, useEffect } from "react";
import Shows from "../components/Shows";

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
          <button
            style={{ marginLeft: "25px" }}
            type="submit"
            className="btn btn-outline-primary rounded-pill"
          >
            Search
          </button>
        </div>
      </form>
      <h1 className="text-center mt-5" style={{ color: "whitesmoke" }}>
        Top Rated TV Shows
      </h1>
      <div className="d-flex flex-wrap gap-3 m-3">
        {tv && tv.map((tv) => <Shows key={tv.id} {...tv} />)}
      </div>
    </div>
  );
}

export default TVShow;
