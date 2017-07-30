const User = require('../models/user');
const Snip = require('../models/snips');
const Password = require('../controllers/testPass').Password;

module.exports = {
  getSignup: (req, res) => {
    res.render('signup', {});
  },



  getLogin: (req, res) => {
    res.render('login', {});
  },



  createUser: (req, res) => {
    req.checkBody('username', 'give a username').notEmpty();
    req.checkBody('password', 'give a password').notEmpty();
    req.checkBody('passfail', "passwords doesnt match").notEmpty().equals(req.body.password);
    req.getValidationResult.then((result) => {

      if (result) {
        errors = result.array();
        message = errors[0].msg;
        let context = {
          username: req.body.username,
          message: message
        };
        res.render('signup', context);

      } else {
        let username = req.body.username,
           password = req.body.password,
           newUser = new User ({
            username: username,
            password: Password(password)
          });
        newUser.save().then(user => {
          req.session.user = user._id;
          req.session.name = user.username;
          res.redirect('/app/home');
        });
      }
    });
  },



  login: (req, res) => {
    req.checkBody('username', 'give a username').notEmpty();
    req.checkBody('password', 'give a password').notEmpty();
    req.getValidationResult.then((result) => {

      if (result) {
        errors = result.array();
        message = errors[0].msg;
        let context = {
          username: req.body.username,
          message: message
        };
        res.render('login', context);

      } else {
        let username = req.body.username,
           password = req.body.password;
        User.findOne({username: username}).then(user => {
          let pwObject = user.password,
             enteredPwObject = Password(password, pwObject.salt);

          if (!user || pwObject.hash !== enteredPwObject.hash) {
            res.render('login', {message: 'Something went wrong.'});

          } else {
            req.session.user = user._id;
            req.session.name = user.username;
            res.redirect('/app/home');
          }
        });
      }
    });
  },





  home: (req, res) => {
    let id = req.session.user;
    Snip.find({userId: id}).then(snips => {
      let context = {
        user: req.session.username,
        snips: snips
      };
      res.render('home', context);
    });
},
};
