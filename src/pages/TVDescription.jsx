import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BACKGROUND_TV_IMG_API = "https://image.tmdb.org/t/p/w1280";

function TvDescription() {

  const { id } = useParams();
  const [tv, setTv] = useState({
    backdrop_path:"",
    name:"",
    overview:"",
    number_of_episodes:"",
    number_of_seasons:"",
  });

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_SECRET}&language=en-US`,
        { signal: controller.signal }
      )
      .then((res) =>{console.log(res.data); setTv(res.data)})
      .catch((err) => console.log(err));
    return () => controller.abort();
  }, [id]);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center">
        <img src={
          tv.backdrop_path
          ? BACKGROUND_TV_IMG_API + tv.backdrop_path
          :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Zco_AzlB5030ccqs-SkdHxO_PmzfBw5sjXSKCjfaX46A9-YEg-9_vjqAHsvgQTw3kbw&usqp=CAU"
        } alt={tv.name}/>
      </div>
      {tv && (
        <div className="text-center" style={{color:"whitesmoke"}}>
          <h3>{tv.name}</h3>
          <h3>{tv.overview}</h3>
          <h3>Air Date: {tv.first_air_date}</h3>
          <h3>Seasons: {tv.number_of_seasons}</h3>
          <h3>Episodes: {tv.number_of_episodes}</h3>
        </div>
      )}
  </div>
  )
}
export default TvDescription;
