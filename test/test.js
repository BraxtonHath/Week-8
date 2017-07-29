const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');
const User = require('../models/user');
const Snip = require('../models/snips');
const Password = require('../controllers/testPass').Password;

describe('Create/login',(done)=> {

  beforeEach(() => {
    let userOne = new User({username: 'House', name: 'Braxton', password: Password('1234')});
    let userTwo = new User({username: 'isDog', name: 'Trouble', password: Password('4321')});
    User.insertMany([userOne, userTwo]).then(done);
  });

  afterEach(() => {
    User.deleteMany({}).then(done);
  });


  it('can create user /user/signup', (done) => {
    let createUser = new User({username: 'Lizzy', name: 'Beth', password: Password('temppass')});
    request(app)
      .post('/user/signup')
      .send(createUser)
      .expect(res => {
        expect(201);
      }).end(done);
  });


  it('can log user in /user/login', (done) => {
    request(app)
      .post('/user/signup')
      .send({username: 'Braelyn', password: Password('dance')})
      .expect(res => {
        expect(201);
      }).end(done);
  });
});



describe('Createing snips/adding/veiwing/deleteing',(done)=> {

  beforeEach(() => {
    let snipOne = new Snip({
      userId: "1",
      title: '~~snip1 47~~',
      body: '<h1> Hello World </h1>',
      language: 'HTML',
      tags: ['HTML'],
      notes: ['snip1', 'snipOne']
    });

    let snipTwo = new Snip({
      userId: "2",
      title: '~~snip2 55~~',
      body: 'let you = me;',
      language: 'JS',
      tags: ['JavaScript', 'Js'],
      notes: ['snip2']
    });

    let snipThree = new Snip({
      userId: "3",
      title: '~~snip3 63~~',
      body: 'foreach = (i=0, i>10, i++) ;',
      language: 'JS',
      tags: ['JavaScript', 'Node', 'Java'],
      notes: ['looping thru']
    });


    Snip.insertMany([snipOne, snipTwo, snipThree]).then(snips => {});
  });

  afterEach(() => {
    Snip.deleteMany({}).then(done);
  });


  it('add snip /addsnip',(done)=> {
    let createSnip = new Snip ({
      userId: "4",
      title: '~~Add snip78~~',
      body: 'let dollar = money;',
      language: 'JS',
      tags: ['JavaScript'],
      notes: ['notes for 4']
    });

    request(app)
      .post('/addsnip')
      .send(createSnip)
      .expect(res => {
        expect(201);
      }).end(done);
  });


  it('can find and view snip by language or tags /snip/viewed',(done)=> {
    request(app)
      .post('/snip/viewed')
      .send({userId: "4", filter: "Language: JS"})
      .expect(200)
      .end(done);
  });


  it('delete snip /snip/delete',(done)=> {

    let createSnip = new Snip ({
      userId: "4",
      title: '~~Add snip78~~',
      body: 'let dollar = money;',
      language: 'JS',
      tags: ['JavaScript'],
      notes: ['notes for 4']
    });

    request(app)
      .post('/snip/delete')
      .send({id: createSnip._id})
      .expect(302)
      .end(done);
  });
});
