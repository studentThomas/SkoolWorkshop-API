process.env['DB_DATABASE'] = process.env.DB_DATABASE || 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const logger = require('../../src/util/logger').logger;
const server = require('../../index');
const dbconnection = require('../../src/util/mysql-db');

chai.should();
chai.use(chaiHttp);

describe('Stock API', () => {
  logger.info('Stock API test started');
  describe('UC-301 Get Stock', () => {
    it('TC-301-1 Product is not found', (done) => {
      chai
        .request(server)
        .get('/api/stock/0')
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(404);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('Product is not found');
          done();
        });
    });
    it('TC-301-2 Product is found', (done) => {
      chai
        .request(server)
        .get('/api/stock/1')
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an('object');
          data.should.be.an('object');
          message.should.be.a('string').to.be.equal('Product is found');
          done();
        });
    });
  });
  describe('UC-302 Update Stock', () => {
    it('TC-302-1 Product is not found', (done) => {
      chai
        .request(server)
        .put('/api/stock/0')
        .send({
          quantity: 10
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(409);
          res.body.should.be.an('object');
          data.should.be.an('object');
          message.should.be.a('string').to.be.equal('Product is not found');
          done();
        });
    });
    it('TC-302-2 Product is updated', (done) => {
      chai
        .request(server)
        .put('/api/stock/1')
        .send({
          quantity: 10
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an('object');
          data.should.be.an('object');
          message.should.be.a('string').to.be.equal('Quantity is updated');
          done();
        });
    });
    it('TC-302-3 Quantity is to low', (done) => {
      chai
        .request(server)
        .put('/api/stock/1')
        .send({
          quantity: -100
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(409);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('Quantity to low');
          done();
        });
    });
  });
});
