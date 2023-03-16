// import User from "../models/user.model.js";
// import generateToken from "../jwt/generate.token.js";
// import bcrypt from "bcrypt";

// const register = async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);

//     const token = generateToken(newUser._id);

//     const { username } = newUser;

//     res.status(201).json({ username, token });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       const err = { login: "Invalid credentials." };
//       return res.status(400).json(err);
//     }
//     const passwordIsCorrect = await bcrypt.compare(password, user.password);

//     if (!passwordIsCorrect) {
//       const err = { login: "Invalid credentials." };
//       return res.status(400).json(err);
//     }

//     const token = generateToken(user._id);
//     const username = user.username;

//     res.status(200).json({ username, token });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// };

// const me = async (req, res) => {
//   try {
//     res.status(200).json(req.user);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

// export { register, login, me };

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//! Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //! Create Token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! Signup User
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //! Create Token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
