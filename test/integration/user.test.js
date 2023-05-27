process.env["DB_DATABASE"] = process.env.DB_DATABASE || "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const logger = require("../../src/util/logger").logger;
const server = require("../../index");
const dbconnection = require("../../src/util/mysql-db");
const queries = require("../../src/util/queries");

chai.should();
chai.use(chaiHttp);

describe("User API", () => {
  logger.info("User API test started");
  beforeEach((done) => {
    dbconnection.getConnection(function (err, connection) {
      if (err) {
        done(err);
        throw err;
      }
      connection.query(
        queries.clearUserTable + queries.insertUser,
        (error, result) => {
          if (error) {
            done(error);
            throw error;
          }
          dbconnection.releaseConnection(connection);
          done();
        }
      );
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
