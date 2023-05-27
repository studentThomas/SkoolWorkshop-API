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
const CLEAR_DB =
  CLEAR_USER_TABLE +
  CLEAR_STOCK_TABLE +
  CLEAR_WORKSHOP_TABLE +
  CLEAR_PRODUCT_TABLE;

const INSERT_USER =
  "INSERT INTO `user` (`id`, `emailAdress`, `password`, `firstname`, `phoneNumber` ) VALUES" +
  '(1, "levikooy@gmail.com", "1234", "Levi", "0612345678"),' +
  '(2, "thomas@gmail.com", "1234", "Thomas", "0612345678")';

describe("User API", () => {
  logger.info("User API test started");
  beforeEach((done) => {
    dbconnection.getConnection(function (err, connection) {
      if (err) {
        done(err);
        throw err;
      }
      connection.query(CLEAR_DB + INSERT_USER, (error, result) => {
        if (error) {
          done(error);
          throw error;
        }
        dbconnection.releaseConnection(connection);
        done();
      });
    });
  });

  describe("UC-201 Create User", () => {
    it("TC-201-1 User is created", (done) => {
      chai
        .request(server)
        .post("/api/user")
        .send({
          emailAdress: "ivan@gmail.com",
          password: "1234",
          firstname: "Ivan",
          phoneNumber: "0612345678",
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(201);
          res.body.should.be.an("object");
          data.should.be.an("object");
          data.should.have.property("id");
          data.should.have
            .property("emailAdress")
            .to.be.equal("ivan@gmail.com");
          data.should.have.property("password").to.be.equal("1234");
          data.should.have.property("firstname").to.be.equal("Ivan");
          data.should.have.property("phoneNumber").to.be.equal("0612345678");
          message.should.be.a("string").to.be.equal("User created");
          done();
        });
    });
    it("TC-201-2 User already exists", (done) => {
      chai
        .request(server)
        .post("/api/user")
        .send({
          emailAdress: "levikooy@gmail.com",
          password: "1234",
          firstname: "Levi",
          phoneNumber: "0612345678",
        })
        .end((err, res) => {
          let { status, message, data } = res.body;
          status.should.equal(403);
          res.body.should.be.an("object");
          data.should.be.an("object").to.be.empty;
          message.should.be.a("string").to.be.equal("User already exists");
          done();
        });
    });
  });
});
