const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');
const User = require('../models/user');
const Snip = require('../models/snips');
const Password = require('../controllers/testPass').Password;

// describe('Create/login',(done)=> {
//
//   beforeEach(() => {
//     let userOne = new User({username: 'House', name: 'Braxton', password: Password('1234')});
//     let userTwo = new User({username: 'isDog', name: 'Trouble', password: Password('4321')});
//     User.insertMany([userOne, userTwo]).then(done);
//   });
//
//   afterEach(() => {
//     User.deleteMany({}).then(done);
//   });
//
//
//
//   it('can create user at sign up /user/signup', (done) => {
//     let createUser = new User({username: 'Lizzy', name: 'Beth', password: Password('temppass')});
//     request(app)
//       .post('/user/signup')
//       .send(createUser)
//       .expect(res => {
//         expect(201);
//       }).end(done);
//   });
//
//
//
//   it('can log user in /user/login', (done) => {
//     request(app)
//       .post('/user/signup')
//       .send({username: 'Braelyn', password: Password('dance')})
//       .expect(res => {
//         expect(201);
//       }).end(done);
//   });
// });








describe('User endpoint tests',(done)=> {

  beforeEach(() => {
    let userOne = new User({username: 'House', name: 'Braxton', password: Password('1234')});
    let userTwo = new User({username: 'isDog', name: 'Trouble', password: Password('4321')});
    User.insertMany([userOne, userTwo]).then(done);
  });

  afterEach(() => {
    User.deleteMany({}).then(done);
  });




  it('can view one user at POST /user/viewOne',(done)=> {
    let createUser = new User({username: 'Lizzy', name: 'Beth', password: Password('temppass')});
    createUser.save().then(() => {
      request(app)
        .post('/user/viewOne')
        .send({_id: createUser._id})
        .expect(res => {
          expect(302);
          expect(res.body.data.name).to.equal('Beth');
        }).end(done);
    });
  });




  it('can view all users at GET /user/viewEverything',(done)=> {
    request(app)
      .get('/user/viewEverything')
      .expect(302)
      .expect(res => {
        expect(res.body.data[0].username).to.equal('House');
      }).end(done);
  });



  it('can create user at POST /user/create',(done)=> {
    let createUser = new User({username: 'Lizzy', name: 'Beth', password: Password('temppass')});
    request(app)
      .post('/user/create')
      .send(createUser)
      .expect(res => {
        expect(201);
        expect(res.body.data.name).to.equal('Beth');
      }).end(done);
  });
});





// describe('Createing snips/adding/veiwing/deleteing',(done)=> {
//
//   beforeEach(() => {
//     let snipOne = new Snip({
//       userId: "1",
//       title: '~~snip1 53~~',
//       body: '<h1> Hello World </h1>',
//       language: 'HTML',
//       tags: ['HTML'],
//       notes: ['snip1', 'snipOne']
//     });
//
//     let snipTwo = new Snip({
//       userId: "2",
//       title: '~~snip2 62~~',
//       body: 'let you = me;',
//       language: 'JS',
//       tags: ['JavaScript', 'Js'],
//       notes: ['snip2']
//     });
//
//     let snipThree = new Snip({
//       userId: "3",
//       title: '~~snip3 71~~',
//       body: 'foreach = (i=0, i>10, i++) ;',
//       language: 'JS',
//       tags: ['JavaScript', 'Node', 'Java'],
//       notes: ['looping thru']
//     });
//
//     Snip.insertMany([snipOne, snipTwo, snipThree]).then(snips => {});
//   });
//
//   afterEach(() => {
//     Snip.deleteMany({}).then(done);
//   });
//
//
//
//   it('add snip /addsnip',(done)=> {
//
//     let createSnip = new Snip ({
//       userId: "4",
//       title: '~~Add snip 91~~',
//       body: 'let dollar = money;',
//       language: 'JS',
//       tags: ['JavaScript'],
//       notes: ['notes for 4']
//     });
//
//     request(app)
//       .post('/addsnip')
//       .send(createSnip)
//       .expect(res => {
//         expect(201);
//       }).end(done);
//   });
//
//
//
//   it('can find and view snip by language or tags /snip/viewed',(done)=> {
//     request(app)
//       .post('/snip/viewed')
//       .send({userId: "4", filter: "Language: JS"})
//       .expect(200)
//       .end(done);
//   });
//
//
//
//   it('delete snip /snip/delete',(done)=> {
//
//     let createSnip = new Snip ({
//       userId: "4",
//       title: '~~Add snip 122~~',
//       body: 'let dollar = money;',
//       language: 'JS',
//       tags: ['JavaScript'],
//       notes: ['notes for 4']
//     });
//
//     request(app)
//       .post('/snip/delete')
//       .send({id: createSnip._id})
//       .expect(302)
//       .end(done);
//   });
// });





describe('Snip Test',(done)=> {

  beforeEach(() => {
    let snipOne = new Snip({
      userId: "1",
      title: '~~snip1~~',
      body: '<h1> Hello World </h1>',
      language: 'HTML',
      tags: ['HTML'],
      notes: ['snip1', 'snipOne']
    });
    let snipTwo = new Snip({
      userId: "2",
      title: '~~snip2~~',
      body: 'let you = me;',
      language: 'JS',
      tags: ['JavaScript', 'Js'],
      notes: ['snip2']
    });
    let snipThree = new Snip({
      userId: "3",
      title: '~~snip3~~',
      body: 'foreach = (i=0, i>10, i++) ;',
      language: 'JS',
      tags: ['JavaScript', 'Node', 'Java'],
      notes: ['looping thru']
    });
    Snip.insertMany([snipOne, snipTwo, snipThree]).then(snips => {
    });
  });

  afterEach(() => {
    Snip.deleteMany({}).then(done);
  });



  it('can view post by tag /snip/:tag',(done)=> {
    request(app)
      .get('/snip/tag/JavaScript')
      .expect(302)
      .expect(res => {
        expect(res.body.data.length).to.equal(2);
      }).end(done);
  });



  it('can view post by lang /snip/:language',(done)=> {
    request(app)
      .get('/snip/HTML')
      .expect(302)
      .expect(res => {
        expect(res.body.data.length).to.equal(1);
      }).end(done);
  });


  it('can create post /snip/create',(done)=> {
    let createSnip = new Snip ({
      userId: "4",
      title: '~~Add snip~~',
      body: 'let dollar = money;',
      language: 'JS',
      tags: ['JavaScript'],
      notes: ['notes for 4']
    });
    request(app)
      .post('/snip/create')
      .send(createSnip)
      .expect(res => {
        expect(201);
        expect(res.body.data.title).to.equal('~~Add snip~~');
      }).end(done);
  });


  it('can view all post at once /snip/viewEverything',(done)=> {
    request(app)
      .get('/snip/viewEverything')
      .expect(302)
      .expect(res => {
        expect(res.body.data[0].title).to.equal('~~snip1~~');
      }).end(done);
  });


  it('can view one post alone /snip/viewOne', (done) => {
    let snipOne = new Snip({
      userId: "1",
      title: '~~snip1~~',
      body: '<h1> Hello World </h1>',
      language: 'HTML',
      tags: ['HTML'],
      notes: ['snip1']
    });
    snipOne.save().then(() => {
      request(app)
        .post('/snip/viewOne')
        .send({_id: snipOne._id})
        .expect(res => {
          expect(302);
          expect(res.body.data.language).to.equal('HTML');
        }).end(done);
    });
    done();
  });
});





describe('password hash function',(done)=> {
  it('can create password object from string',(done)=> {
    let pwObject = Password('password', 'a');
    let expectedPwObject = {iterations: 100, salt: 'a',  "hash": "pXN2J2eBnwuoYVeJYCTw0PYUnG8qxBl48AnMa94Q8tPxVnH9adPS/Upk314EdPVLk9NGEsET5/5eO0L8KEAIZAZblXsjN/nY0lGeu6dQlu+qagQLtk3jTChiYLQ32w+bPoXEQeMAreJLtqNNLeaT2SY7y4Q8/uU1JGdcDKpXWrR/ZQ8iKEpJ0DKY8BKZEoWk1vYGbLQt6miO8y+zRSzQyN1YRZNkw4XF0AA7stxaRYD/MlL7bcP8rYYHGxVM5dQpsFK3amD4ObCkixeFe982W6JQYD22PpQ3dt2QAzovMFAVgCyxYfMg4FK+cHcSBIzoriIsMUCjO0I2NPyOUesOog=="};
    expect(pwObject).to.deep.equal(expectedPwObject);
    done();
  });
});
