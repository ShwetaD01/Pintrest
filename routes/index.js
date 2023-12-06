var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require("./posts");
const passport = require('passport');
const upload = require("./multer")
const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/profile', isLoggedIn, async function(req, res, next) {

  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  .populate("posts");
  console.log(user, 'ppp')
  res.render('profile', {user});
});



router.get('/feed', function(req, res, next) {
  res.render("feed");
});
router.post('/upload',isLoggedIn,upload.single("file"), async function(req, res, next) {
  if(!req.file){
    return res.status(404).send("No files were given")
  }
  const user = await userModel.findOne({username: req.session.passport.user})
  const post = await postModel.create({
    imageText: req.body.filecaption,
    image : req.file.filename,
    user: user._id
  })
  // console.log(user._id)
  user.posts.push(post._id)
  console.log(user, 'mmmm')
  // console.log(post, 'kkkkkk')
  await user.save();
  res.redirect('/profile')
});

router.get('/login', function(req, res, next) {
  res.render('login', {error: req.flash('error')});
});

router.post("/register", function(req, res){
  let {username, email,fullName } = req.body
  let userData = new userModel({username, email, fullName })
  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate('local')(req, res, function(){
      res.redirect("/")
    })
    
  })


})
router.post("/login",passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}), function(req, res){
  let {username, email,fullName } = req.body
  let userData = new userModel({username, email, fullName })
  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate('local')(req, res, function(){
      res.redirect("/")
    })
    
  })


})

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req,res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}
module.exports = router;
