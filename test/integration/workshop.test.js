process.env['DB_DATABASE'] = process.env.DB_DATABASE || 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const logger = require('../../src/util/logger').logger;
const server = require('../../index');
require('tracer').setLevel('error');

chai.should();
chai.use(chaiHttp);

describe('Workshop API', () => {
  logger.info('Stock API test started');
  describe('UC-501 Create Workshop', () => {
    it('TC-501-1 Workshop already exists', (done) => {
      chai
        .request(server)
        .post('/api/workshop')
        .send({
          name: 'workshop1',
          description: 'description',
          categoryName: 'Category1',
          image: 'image'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(403);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('Workshop already exists');
          done();
        });
    });
    it('TC-501-2 Workshop created', (done) => {
      chai
        .request(server)
        .post('/api/workshop')
        .send({
          name: 'workshop4',
          description: 'description',
          categoryName: 'Category4',
          image: 'image'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(201);
          res.body.should.be.an('object');
          data.should.be.an('object');
          message.should.be.a('string').to.be.equal('Workshop created');
          done();
        });
    });
  });
  describe('UC-502 Get Workshop', () => {
    it('TC-502-1 Workshops succesfully retrieved', (done) => {
      chai
        .request(server)
        .get('/api/workshop')
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an('object');
          data.should.be.an('array');
          message.should.be.a('string').to.be.equal('Workshops are retrieved');
          done();
        });
    });
  });
  describe('UC-503 Delete workshop', () => {
    it('TC-503-1 Workshop not found', (done) => {
      chai
        .request(server)
        .delete('/api/workshop/0')
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(404);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('Workshop not found');
          done();
        });
    });
    it('TC-503-2 Workshop deleted', (done) => {
      chai
        .request(server)
        .delete('/api/workshop/3')
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an('object');
          data.should.be.an('object');
          message.should.be.a('string').to.be.equal('Workshop deleted');
          done();
        });
    });
  });
});
