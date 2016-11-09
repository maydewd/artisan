//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Login', () => {
  describe('/POST api/login', () => {
    it('it should reject an unsuccessful login', (done) => {
      chai.request(server)
          .post('/api/login')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.success.should.be.eql(false);
            done();
          });
    });
    it('it should accept a successful login', (done) => {
      chai.request(server)
          .post('/api/login')
          .send({
            username: "devuser",
            password: "securetest"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            done();
          });
    });
  });
});

describe('Listings', () => {
  var jwtToken;
  before((done) => {
    chai.request(server)
        .post('/api/login')
        .send({
          username: "devuser",
          password: "securetest"
        })
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
  })
  describe('/GET api/listings/me', () => {
    it('it should reject without credentials', (done) => {
      chai.request(server)
          .get('/api/listings/me')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
    });
    it('it should return with valid credentials', (done) => {
      chai.request(server)
          .get('/api/listings/me')
          .set('Authorization', jwtToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
    });
  });
});

describe('Listings', () => {
  var jwtToken;
  before((done) => {
    chai.request(server)
        .post('/api/login')
        .send({
          username: "devuser",
          password: "securetest"
        })
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
  })
  describe('/GET api/users/me', () => {
    it('it should reject without credentials', (done) => {
      chai.request(server)
          .get('/api/listings/me')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
    });
    it('it should return with valid credentials', (done) => {
      chai.request(server)
          .get('/api/users/me')
          .set('Authorization', jwtToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });
  });
});
