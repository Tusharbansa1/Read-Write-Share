var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
// used in case of mongoose data store and retrieve 
var Models = require("./connection"); 
// these three are used to use passport
var passport = require('passport');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
router.use(bodyParser.json())


/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
  

  
  res.render('profile/index',{name:req.user});
});

router.post('/index', isLoggedIn, function(req,res,next){

       
 var Bee = new Models.profile_connect({ 
   id: req.session.passport.user,
 content: req.body.content,
 image: req.body.image
});
Bee.save(function(error) { 
 console.log("Your cretentials has been saved.");
 res.send('success');
//  indexpage(res) ;  
 if (error) {
 console.error(error);
 }
});
});
function isLoggedIn(req,res,next){  
  if(req.isAuthenticated()){
    return next();
  }
  else{
   res.redirect('/user/signup');
  }
 }


module.exports = router;

// Session {

//   cookie:
//   { path: '/',
//     _expires: null,
//     originalMaxAge: null,
//     httpOnly: true },
//  _flash: {},
//  passport: { user: '5c98fd60e3bba223928a6f67' }

//  }