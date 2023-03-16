// import mongoose from "mongoose";
// const { model, Schema } = mongoose;
// import bcrypt from "bcrypt";
// import uniqueValidator from "mongoose-unique-validator";
// const EMAIL_REGEX = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/);

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "UserName is required."],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required."],
//       unique: true,
//       validate: {
//         validator: (email) => EMAIL_REGEX.test(email),
//         message: "Plkease enter a valid email",
//       },
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required."],
//       minLenght: [8, "Password must be at least eight characters."],
//     },
//   },
//   { timestamps: true }
// );

// userSchema
//   .virtual('confirmPassword')
//   .get(function () {
//     return this._confrimPassword;
//   })
//   .set(function (value) {
//     this._confrimPassword = value
//   });

//   userSchema.pre('validate', function (next) {
//     if (this.password !== this.confrimPassword) {
//       this.invalidate(
//         'confirmPassword',
//         'Passwords do not match.',
//         this._confrimPassword
//       );
//     }
//     next();
//   });

//   userSchema.pre('save', function (next) {
//     bcrypt.hash(this.password, 10).then((hash) => {
//       this.password = hash;
//       next();
//     });
//   });


//   userSchema.plugin(uniqueValidator, {
//     message: 'Email already exists. Please login.',
//   });

// const User = model('User', userSchema);
// export default User;

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
})

//! Static signup method
userSchema.statics.signup =  async function(email, password) {

  //! Validation
  if(!email || !password) {
    throw Error('All fields must be filled.')
  }
  if(!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if(!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough.')
  }

  const exists = await this.findOne({ email })

  if(exists) {
    throw Error('Email already exists. Please login.')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  
  const user =  await this.create({ email, password: hash })
  
  return user
}

//! Static Login Method
userSchema.statics.login = async function(email, password) {
  if(!email || !password) {
    throw Error('All fields must be filled.')
  }

  const user = await this.findOne({ email })
  if(!user) {
    throw Error('Invalid login credentials.')
  }

  const match =  await bcrypt.compare(password, user.password) 
  if (!match) {
    throw Error('Invalid login credentials.')
  }
  return user
}


module.exports = mongoose.model('User', userSchema)