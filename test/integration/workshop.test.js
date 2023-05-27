process.env["DB_DATABASE"] = process.env.DB_DATABASE || "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const logger = require("../../src/util/logger").logger;
const server = require("../../index");
const dbconnection = require("../../src/util/mysql-db");

chai.should();
chai.use(chaiHttp);

const CLEAR_USER_TABLE = "DELETE IGNORE FROM `user`;";
const CLEAR_STOCK_TABLE = "DELETE IGNORE FROM `stock`;";
const CLEAR_WORKSHOP_TABLE = "DELETE IGNORE FROM `workshop`;";
const CLEAR_PRODUCT_TABLE = "DELETE IGNORE FROM `product`;";
const CLEAR_DB = CLEAR_USER_TABLE + CLEAR_STOCK_TABLE + CLEAR_WORKSHOP_TABLE + CLEAR_PRODUCT_TABLE;

const INSERT_WORKSHOP =
  "INSERT INTO `workshop` (`id`, `name`, `description`, `image`) VALUES" +
  '(1, "workshop1", "description", "image"),' +
  '(2, "workshop2", "description", "image")';

describe("Workshop API", () => {
  logger.info("Stock API test started");
  beforeEach((done) => {
    dbconnection.getConnection(function (err, connection) {
      if (err) {
        done(err);
        throw err;
      }
      connection.query(CLEAR_DB + INSERT_WORKSHOP, (error, result) => {
        if (error) {
          done(error);
          throw error;
        }
        dbconnection.releaseConnection(connection);
        done();
      });
    });
  });
  describe("UC-501 Add Workshop", () => {
    it("TC-501-1 Workshop already exists", (done) => {
      chai
        .request(server)
        .post("/api/workshop")
        .send({
          name: "workshop1",
          description: "description",
          image: "image",
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(403);
          res.body.should.be.an("object");
          data.should.be.an("object").to.be.empty;
          message.should.be.a("string").to.be.equal("Workshop already exists");
          done();
        });
    });
    it("TC-501-2 Workshop created", (done) => {
      chai
        .request(server)
        .post("/api/workshop")
        .send({
          name: "workshop3",
          description: "description",
          image: "image",
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(201);
          res.body.should.be.an("object");
          data.should.be.an("object");
          message.should.be.a("string").to.be.equal("Workshop created");
          done();
        });
    });
  });
  describe("UC-502 Get Workshop", () => {
    it("TC-502-1 Workshops succesfully retrieved", (done) => {
      chai
        .request(server)
        .get("/api/workshop")
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an("object");
          data.should.be.an("array");
          message.should.be.a("string").to.be.equal("Workshops are retrieved");
          done();
        });
    });
  });
  describe("UC-503 Delete workshop", () => {
    it("TC-503-1 Workshop not found", (done) => {
      chai
        .request(server)
        .delete("/api/workshop/0")
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(404);
          res.body.should.be.an("object");
          data.should.be.an("object").to.be.empty;
          message.should.be.a("string").to.be.equal("Workshop not found");
          done();
        });
    });
    it("TC-503-2 Workshop deleted", (done) => {
      chai
        .request(server)
        .delete("/api/workshop/2")
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(200);
          res.body.should.be.an("object");
          data.should.be.an("object");
          message.should.be.a("string").to.be.equal("Workshop deleted");
          done();
        });
    });
  });
});
