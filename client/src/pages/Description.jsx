import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const BACKGROUND_IMG_API = "https://image.tmdb.org/t/p/w780";

function Description() {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    backdrop_path: "",
    title: "",
    overview: "",
    release_date: "",
    vote_average: "",
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
    <motion.div
      className="container mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 4 }}
    >
      <div className="d-flex justify-content-center">
        <h1 style={{ color: "red", fontSize: "4rem" }}>{movie.title}</h1>
      </div>
      <div className="d-flex justify-content-center">
        <img
          className="rounded-4 mt-5"
          style={{ color: "whitesmoke" }}
          src={
            movie.backdrop_path
              ? BACKGROUND_IMG_API + movie.backdrop_path
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Zco_AzlB5030ccqs-SkdHxO_PmzfBw5sjXSKCjfaX46A9-YEg-9_vjqAHsvgQTw3kbw&usqp=CAU"
          }
          alt={movie.title}
        />
      </div>
      <div className="text-center mt-3" style={{ color: "whitesmoke", fontSize: "1.3rem" }}>
        <p>{movie.overview}</p>
        <p >Release Date: {movie.release_date}</p>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <a href={`/${id}/videos`}>
          <motion.button
            type="submit"
            className="btn btn-outline-success"
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.8 }}
          >
            Play Trailer
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
}

export default Description;
