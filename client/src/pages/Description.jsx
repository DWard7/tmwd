import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "../templates/style.css";
import Video from "../components/Video"

const BACKGROUND_IMG_API = "https://image.tmdb.org/t/p/original";

function Description() {
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);
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

      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));

    return () => controller.abort();
  }, [id]);

  return (
    <div className="w-screen">
      <div
        style={{
          backgroundImage: `url('${BACKGROUND_IMG_API}${movie.backdrop_path}')`,
        }}
        id="background"
        className="pt-3 h-screen flex flex-col justify-end"
        >
        {showVideo && <Video />}
        <div className="text-white d-flex justify-content-center">
          <h1>{movie.title}</h1>
        </div>
        <div
          className="text-white text-center mt-3"
          style={{ fontSize: "1.3rem" }}
        >
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
        </div>
        <div className="d-flex justify-content-center mt-3">
            <motion.button
              type="submit"
              className="text-white rounded-full bg-gradient-to-r from-cyan-600 to-purple-800 text-lg mb-3 p-2"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setShowVideo(true)}
            >
              Play Trailer
            </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Description;

