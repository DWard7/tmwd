import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;

const generateToken = id =>  {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '3d' });
};

export default generateToken;