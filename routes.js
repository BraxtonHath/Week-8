const page = require('./controllers/page.js');
const models = require('./controllers/models.js');

module.exports = function(app) {

  app.get('/', (req, res) => {
    res.redirect('/user/signup');
  });
  app.post('/snip/create', models.createPost);
  app.post('/user/create', models.createUser);

  app.get('/snip/viewEverything', models.viewAllPost);
  app.get('/user/viewEverything', models.viewUsers);

  app.post('/snip/viewOne', models.viewOnePost);
  app.post('/user/viewOne', models.viewOneUser);

  app.get('/snip/:language', models.viewSnipsByLang);

  app.get('/snip/tag/:tag', models.viewSnipsByTag);

  app.get('/user/login', page.getLogin);
  app.post('/user/login', page.login);

  app.get('/user/signup', page.getSignup);
  app.post('/user/signup', page.createUser);

  app.get('/home', page.home);

};
