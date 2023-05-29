process.env['DB_DATABASE'] = process.env.DB_DATABASE || 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const logger = require('../../src/util/logger').logger;
const server = require('../../index');
chai.should();
chai.use(chaiHttp);

describe('User API', () => {
  logger.info('User API test started');
  describe('UC-101 Login', () => {
    it('TC-101-1 User is logged in', (done) => {
      chai
        .request(server)
        .post('/api/login')
        .send({
          EmailAdress: 'levikooy@gmail.com',
          Password: '1234'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an('object');
          data.should.be.an('object');
          data.should.have.property('EmailAdress').to.be.equal('levikooy@gmail.com');
          data.should.have.property('Password').to.be.equal('1234');
          message.should.be.a('string').to.be.equal('User logged in');
          done();
        });
    });
    it('TC-101-2 User not found', (done) => {
      chai
        .request(server)
        .post('/api/login')
        .send({
          EmailAdress: 'test@gmail.com',
          Password: '1234'
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
          EmailAdress: 'thomas@gmail.com',
          Password: '12345'
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
          EmailAdress: 'ivan@gmail.com',
          Password: '1234',
          FirstName: 'Ivan',
          PhoneNumber: '0612345678'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(201);
          res.body.should.be.an('object');
          data.should.be.an('object');
          data.should.have.property('EmailAdress').to.be.equal('ivan@gmail.com');
          data.should.have.property('Password').to.be.equal('1234');
          data.should.have.property('FirstName').to.be.equal('Ivan');
          data.should.have.property('PhoneNumber').to.be.equal('0612345678');
          message.should.be.a('string').to.be.equal('User created');
          done();
        });
    });
    it('TC-201-2 User already exists', (done) => {
      chai
        .request(server)
        .post('/api/user')
        .send({
          EmailAdress: 'levikooy@gmail.com',
          Password: '1234',
          FirstName: 'Levi',
          PhoneNumber: '0612345678'
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
