import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const BACKGROUND_IMG_API = "https://image.tmdb.org/t/p/original";

function Description() {

  const { id } = useParams();
  const [movie, setMovie] = useState({
    backdrop_path:"",
    title:"",
    overview:"",
    release_date:"",
    vote_average:"",
  });

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_SECRET}&language=en-US`,
        { signal: controller.signal }
      )
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
    return () => controller.abort();
  }, [id]);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center">
        <img style={{color: "white"}}
          src={
            movie.backdrop_path
              ? BACKGROUND_IMG_API + movie.backdrop_path
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Zco_AzlB5030ccqs-SkdHxO_PmzfBw5sjXSKCjfaX46A9-YEg-9_vjqAHsvgQTw3kbw&usqp=CAU"
          }
          alt={movie.title}
        />
      </div>
      {movie && (
        <div className="text-center" style={{ color: "white" }}>
            <h3 style={{color: "red"}}>{movie.title}</h3>
          <h3>{movie.overview}</h3>
          <h3>Release Date: {movie.release_date}</h3>
          <h3>Votes: {movie.vote_average}</h3>
        </div>
      )}
      <div className="d-flex justify-content-center mb-3 mt-3">
      <a href={`/${id}/videos`}>
        <button type="submit"className="btn btn-outline-success">
              Play Trailer
            </button>
      </a>
      </div>
    </div>
  );
}

export default Description;
