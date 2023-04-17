import React from "react";
import { motion } from "framer-motion";

const IMG_API = "https://image.tmdb.org/t/p/w200";

const Shows = ({ id, name, poster_path }) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
    <a href={`/${id}/description/tv`}>
      <img id="TvPoster"
        className="rounded-4"
        style={{ color: "white" }}
        src={
          poster_path
            ? IMG_API + poster_path
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Zco_AzlB5030ccqs-SkdHxO_PmzfBw5sjXSKCjfaX46A9-YEg-9_vjqAHsvgQTw3kbw&usqp=CAU"
        }
        alt={name}
      />
    </a>
  </motion.div>
);
export default Shows;
