// import express from 'express';
// const app = express();

// import dotenv from "dotenv";
// dotenv.config();

// import cors from "cors";
// app.use(cors(), express.json());

// import connectToDb from "./config/mongoose.config.js";
// connectToDb();

// import userRouter from "./routes/user.routes.js";
// app.use("/api/users", userRouter);

// import { primary, error } from './config/chalk.config.js';
// const PORT = process.env.PORT || 5001;
// const server = app
//   .listen(PORT, () => primary(`Listening on port: ${server.address().port}`))
//   .on("error", (err) => error(`Something went wrong: ${err}`));

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.routes')

const app = express()

//! Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//! Routes
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Listening on port:', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })