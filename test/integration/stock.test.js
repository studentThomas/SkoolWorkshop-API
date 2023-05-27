process.env["DB_DATABASE"] = process.env.DB_DATABASE || "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const logger = require("../../src/util/logger").logger;
const server = require("../../index");
const dbconnection = require("../../src/util/mysql-db");

chai.should();
chai.use(chaiHttp);

const CLEAR_STOCK_TABLE = "DELETE IGNORE FROM `stock`;";
const CLEAR_DB = CLEAR_STOCK_TABLE;

const INSERT_STOCK =
  "INSERT INTO `stock` (`id`, `productId`, `workshopId`, `amount`) VALUES" +
  "(1, 1, 1, 10)," +
  "(2, 2, 1, 10)";

describe("Stock API", () => {
  logger.info("Stock API test started");
  beforeEach((done) => {
    dbconnection.getConnection(function (err, connection) {
      if (err) {
        done(err);
        throw err;
      }
      connection.query(CLEAR_DB + INSERT_STOCK, (error, result) => {
        if (error) {
          done(error);
          throw error;
        }
        dbconnection.releaseConnection(connection);
        done();
      });
    });

    describe("UC-301 Get Stock", () => {
      it("TC-301-1 Product is not found", (done) => {
        chai
          .request(server)
          .get("/api/stock/3")
          .end((err, res) => {
            let { status, message, data } = res.body;
            status.should.equal(404);
            res.body.should.be.an("object");
            data.should.be.an("object").to.be.empty;
            message.should.be.a("string").to.be.equal("Product is not found");
            done();
          });
      });
      it("TC-301-2 Product is found", (done) => {
        chai
          .request(server)
          .get("/api/stock/1")
          .end((err, res) => {
            let { status, message, data } = res.body;
            status.should.equal(200);
            res.body.should.be.an("object");
            data.should.be.an("object");
            message.should.be.a("string").to.be.equal("Product is found");
            done();
          });
      });
    });
    describe("UC-302 Update Stock", () => {
      it("TC-302-1 Product is not found", (done) => {
        chai
          .request(server)
          .put("/api/stock/3")
          .send({
            quantity: 10,
          })
          .end((err, res) => {
            let { status, message, data } = res.body;
            status.should.equal(404);
            res.body.should.be.an("object");
            data.should.be.an("object").to.be.empty;
            message.should.be.a("string").to.be.equal("Product is not found");
            done();
          });
      });
      it("TC-302-2 Product is updated", (done) => {
        chai
          .request(server)
          .put("/api/stock/1")
          .send({
            quantity: 10,
          })
          .end((err, res) => {
            let { status, message, data } = res.body;
            status.should.equal(200);
            res.body.should.be.an("object");
            data.should.be.an("object");
            message.should.be.a("string").to.be.equal("Quantity is updated");
            done();
          });
      });
      it("TC-302-3 Quantity is to low", (done) => {
        chai
          .request(server)
          .put("/api/stock/1")
          .send({
            quantity: -1,
          })
          .end((err, res) => {
            let { status, message, data } = res.body;
            status.should.equal(400);
            res.body.should.be.an("object");
            data.should.be.an("object").to.be.empty;
            message.should.be.a("string").to.be.equal("Quantity is to low");
            done();
          });
      });
    });
  });
});
