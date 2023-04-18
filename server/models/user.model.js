const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
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
userSchema.statics.signup =  async function(username, email, password) {

  //! Validation
  if( !username || !email || !password) {
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
  
  const userExists = await this.findOne({ username })

  if(userExists) {
    throw Error('Username already exists. Please Try again.')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  
  const user =  await this.create({ username, email, password: hash })
  
  return user
}

//! Static Login Method
userSchema.statics.login = async function(username, password) {
  if(!username || !password) {
    throw Error('All fields must be filled.')
  }

  const user = await this.findOne({ username })
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