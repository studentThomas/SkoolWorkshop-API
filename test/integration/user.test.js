process.env["DB_DATABASE"] = process.env.DB_DATABASE || "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const logger = require("../../src/util/logger").logger;
const server = require("../../index");
const dbconnection = require("../../src/util/mysql-db");

chai.should();
chai.use(chaiHttp);

const CLEAR_USER_TABLE = "DELETE IGNORE FROM `user`;";
const CLEAR_DB = CLEAR_USER_TABLE;

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
      chai.request(server).post("/api/user").send({
        emailAdress: "ivan@gmail.com",
        password: "1234",
        firstname: "Ivan",
        phoneNumber: "0612345678",
      });
    });
  });
});
