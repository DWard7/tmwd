import React from "react";
import Movies from "../components/Movies";
import { useLocation } from "react-router-dom";

function Results() {
  const location  = useLocation();
  console.log("location", location.state.movies) 

  return (
    <div className="container">
      <ul className="d-flex flex-wrap">
        {location.state.movies && location.state.movies.map((movie) => (
          <li key={movie.id}>
            <Movies key={movie.id} {...movie} />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
