import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";

const VIDEO_API = "https://api.themoviedb.org/3/movie/";

function Video() {
  const { id } = useParams();
  const [movie, setMovie] = useState('');

  const trailer = () => {
    const videos = movie.videos.results.find(
      (videos) => videos.type === "Trailer"
    )
    return <YouTube videoId={videos.key} />;
  };


  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        VIDEO_API +
          `${id}?api_key=${process.env.REACT_APP_API_SECRET}&append_to_response=videos`,
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
  <div className="container">
    <div className="d-flex flex-column align-items-center mt-3">
      <h1 className="mb-5" style={{color:"whitesmoke"}}>Movie Trailer</h1>
      {movie.videos ? trailer() : null}
    </div>
    </div>
    );
}

export default Video;
