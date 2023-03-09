import React from "react";

const IMG_API = "https://image.tmdb.org/t/p/w200";

const Movies = ({ id ,title, poster_path}) => (
  <div>
    <a href={`/${id}/description/`}>
      <img style={{color:"white"}}
        src={
          poster_path
            ? IMG_API + poster_path
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Zco_AzlB5030ccqs-SkdHxO_PmzfBw5sjXSKCjfaX46A9-YEg-9_vjqAHsvgQTw3kbw&usqp=CAU"
        }
        alt={title}
      ></img>
    </a>
  </div>
);

export default Movies;
