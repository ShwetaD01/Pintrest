var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require("./post");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/create', async function(req, res){
 let createdUser = await userModel.create({
    username: "nikita",
    password: "nikita@27",
    posts: [],
    email: "nikita@gmail.com",
    fullName: "Nikita Kishor Donode"
  });
  res.send(createdUser)
})
module.exports = router;
