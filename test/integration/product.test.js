process.env['DB_DATABASE'] = process.env.DB_DATABASE || 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const logger = require('../../src/util/logger').logger;
const server = require('../../index');
const dbconnection = require('../../src/util/mysql-db');
require('tracer').setLevel('error');

chai.should();
chai.use(chaiHttp);

const CLEAR_USER_TABLE = 'DELETE IGNORE FROM `user`;';
const CLEAR_STOCK_TABLE = 'DELETE IGNORE FROM `stock`;';
const CLEAR_PRODUCT_TABLE = 'DELETE IGNORE FROM `product`;';
const CLEAR_WORKSHOP_TABLE = 'DELETE IGNORE FROM `workshop`;';
const CLEAR_DB = CLEAR_USER_TABLE + CLEAR_STOCK_TABLE + CLEAR_PRODUCT_TABLE + CLEAR_WORKSHOP_TABLE;

const INSERT_USER =
  'INSERT INTO `user` (`Id`, `EmailAdress`, `Password`, `FirstName`, `PhoneNumber` ) VALUES' +
  '(1, "levikooy@gmail.com", "1234", "Levi", "0612345678"),' +
  '(2, "thomas@gmail.com", "1234", "Thomas", "0612345678");';

const INSERT_WORKSHOP =
  'INSERT INTO `workshop` (`Id`, `Name`, `CategoryName`, `Description`, `Materials`, `Active`, `Image`) VALUES' +
  '(1, "workshop1", "Category1", "description", "Materials", 1, "image"),' +
  '(2, "workshop2", "Category2", "description", "Materials", 1, "image"),' +
  '(3, "workshop3", "Category3", "description", "Materials", 1, "image");';

const INSERT_PRODUCT =
  'INSERT INTO `product` (`Id`, `Name`, `Description`, `Code`, `Image` ,`Quantity` ) VALUES' +
  '(1, "spuitbus", "description", 123456, "image", 10),' +
  '(2, "pencil", "description", 12345, "image", 10);';

const INSERT_STOCK = 'INSERT INTO `stock` (`ProductId`, `WorkshopId`) VALUES' + '(1, 1),' + '(2, 1);';

describe('Product API', () => {
  logger.info('Product API test started');
  beforeEach((done) => {
    dbconnection.getConnection(function (err, connection) {
      if (err) {
        done(err);
        throw err;
      }
      connection.query(CLEAR_DB + INSERT_USER + INSERT_WORKSHOP + INSERT_PRODUCT + INSERT_STOCK, (error, result) => {
        if (error) {
          done(error);
          throw error;
        }
        dbconnection.releaseConnection(connection);
        done();
      });
    });
  });

  describe('UC-401 Create Product', () => {
    it('TC-401-1 Product already exists', (done) => {
      chai
        .request(server)
        .post('/api/product')
        .send({
          name: 'spuitbus',
          description: 'description',
          code: 123456,
          image: 'image',
          quantity: 10,
          workshopId: 1
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(403);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('Product already exists');
          done();
        });
    });
    it('TC-401-2 Product created', (done) => {
      chai
        .request(server)
        .post('/api/product')
        .send({
          name: 'laptop',
          description: 'description',
          code: 12345,
          image: 'image',
          quantity: 10,
          workshopId: 1
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(201);
          res.body.should.be.an('object');
          data.should.be.an('object');
          message.should.be.a('string').to.be.equal('Product created');
          done();
        });
    });
  });

  describe('UC-402 Get Products', () => {
    it('TC-402-1 Products retrieved', (done) => {
      chai
        .request(server)
        .get('/api/product')
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an('object');
          data.should.be.an('array');
          message.should.be.a('string').to.be.equal('Products are retrieved');
          done();
        });
    });
  });

  describe('UC-403 Update Product', () => {
    it('TC-403-1 Product updated', (done) => {
      chai
        .request(server)
        .put('/api/product/1')
        .send({
          name: 'laptop',
          description: 'description',
          code: 12345,
          image: 'image'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an('object');
          data.should.be.an('object');
          message.should.be.a('string').to.be.equal('Product updated');
          done();
        });
    });
    it('TC-403-2 Product not found', (done) => {
      chai
        .request(server)
        .put('/api/product/0')
        .send({
          name: 'laptop',
          description: 'description',
          code: 'code',
          image: 'image'
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(404);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('Product not found');
          done();
        });
    });
  });
  describe('UC-404 Delete Product', () => {
    it('TC-404-1 Product deleted', (done) => {
      chai
        .request(server)
        .delete('/api/product/1')
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an('object');
          data.should.be.an('object');
          message.should.be.a('string').to.be.equal('Product deleted');
          done();
        });
    });
    it('TC-404-2 Product not found', (done) => {
      chai
        .request(server)
        .delete('/api/product/0')
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(404);
          res.body.should.be.an('object');
          data.should.be.an('object').to.be.empty;
          message.should.be.a('string').to.be.equal('Product not found');
          done();
        });
    });
  });
});
