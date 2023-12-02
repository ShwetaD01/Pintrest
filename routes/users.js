const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")
//  mongoose.connect();

 mongoose.connect(
    "mongodb://127.0.0.1:27017/pit",
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    posts: [],
    dp: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    }
});
userSchema.plugin(plm);
// Create the User model
const User  = mongoose.model('User', userSchema);

module.exports = User;