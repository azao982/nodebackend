const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
  
    email: String,
    password : String,
   
   
})

module.exports = mongoose.model('users', userShema)