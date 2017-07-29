module.exports = function(app) {

  // app.get('/', (req, res) => {
  //   res.redirect('/user/signup');
  // });
  app.get('/user/login');
  app.post('/user/login');

  app.get('/user/signup');
  app.post('/user/signup');

  app.post('/addsnip');
  app.post('/snip/viewed');
  app.post('/snip/delete');
};
