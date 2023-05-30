process.env['DB_DATABASE'] = process.env.DB_DATABASE || 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const logger = require('../../src/util/logger').logger;
const server = require('../../index');
require('tracer').setLevel('error');
require('dotenv').config();
let token = '';
chai.should();
chai.use(chaiHttp);

describe('User API', () => {
  logger.info('User API test started');
  describe('UC-101 Login', () => {
    it.skip('TC-101-1 User is logged in', (done) => {
      chai
        .request(server)
        .post('/api/login')
        .send({
          emailAdress: 'levikooy@gmail.com',
          password: '1234'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(400);
          res.body.should.be.an('object');
          data.should.be.an('object');
          data.should.have.property('emailAdress').to.be.equal('levikooy@gmail.com');
          data.should.have.property('password').to.be.equal('1234');
          message.should.be.a('string').to.be.equal('User logged in');
          done();
        });
    });
    it('TC-101-2 User not found', (done) => {
      chai
        .request(server)
        .post('/api/login')
        .send({
          emailAdress: 'test@gmail.com',
          password: '1234'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(404);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('User not found');
          done();
        });
    });
    it('TC-101-3 Not authorized', (done) => {
      chai
        .request(server)
        .post('/api/login')
        .send({
          emailAdress: 'thomas@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(400);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('Not authorized');
          done();
        });
    });
  });
  describe('UC-201 Create User', () => {
    it('TC-201-1 User is created', (done) => {
      chai
        .request(server)
        .post('/api/user')
        .send({
          emailAdress: 'ivan@gmail.com',
          password: '1234',
          firstName: 'Ivan',
          phoneNumber: '0612345678'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(201);
          res.body.should.be.an('object');
          data.should.be.an('object');
          data.should.have.property('emailAdress').to.be.equal('ivan@gmail.com');
          data.should.have.property('password').to.be.equal('1234');
          data.should.have.property('firstName').to.be.equal('Ivan');
          data.should.have.property('phoneNumber').to.be.equal('0612345678');
          message.should.be.a('string').to.be.equal('User created');
          done();
        });
    });
    it('TC-201-2 User already exists', (done) => {
      chai
        .request(server)
        .post('/api/user')
        .send({
          emailAdress: 'levikooy@gmail.com',
          password: '1234',
          firstName: 'Levi',
          phoneNumber: '0612345678'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(403);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('User already exists');
          done();
        });
    });
  });
});
