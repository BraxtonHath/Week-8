const User = require('../models/user');
const Snip = require('../models/snips');
const Password = require('../controllers/testPass').Password;
module.exports = {



  createUser: (req, res) => {
    let newUser = new User(req.body);
    newUser.save().then(user => {
      res.status(201).json({data: user});
    });
  },



  viewUsers: (req, res) => {
    User.find().then(users => {
      res.status(302).json({data: users});
    });
  },




  viewOneUser: (req, res) => {
    let id = req.body._id;
    User.findById(id).then(user => {
      res.status(302).json({data: user});
    });
  },





  createPost: (req, res) => {
    let newSnip = new Snip(req.body);
    newSnip.save().then(snip => {
      res.status(201).json({data: snip});
    });
  },




  viewAllPost: (req, res) => {
    Snip.find().then(snips => {
      res.status(302).json({data: snips});
    });
  },




  viewOnePost: (req, res) => {
    let id = req.body._id;
    Snip.findById(id).then(snip => {
      res.status(302).json({data: snip});
    });
  },




  viewSnipsByLang: (req, res) => {
    let language = req.params.language;

    Snip.find({language: language}).then(snips => {
      res.status(302).json({data: snips});
    });
  },




  viewSnipsByTag: (req, res) => {
    let tag = req.params.tag;
    Snip.find({tags: {$in: [tag]}}).then(snips => {
      res.status(302).json({data: snips});
    });
  }
};
