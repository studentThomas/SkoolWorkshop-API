const logger = require("../util/logger").logger;
const pool = require("../util/mysql-db");

const userController = {
  createUser: (req, res, next) => {
    const user = req.body;
    const sqlStatement = `INSERT INTO user SET ?`;
    const sqlCheck = `SELECT * FROM user WHERE EmailAdress = ?`;

    pool.getConnection((err, conn) => {
      if (err) {
        next({
          status: 500,
          message: err.message,
        });
      }

      conn.query(sqlCheck, [user.EmailAdress], (error, results) => {
        if (error) {
          next({
            status: 409,
            message: error,
          });
        }

        if (results.length > 0) {
          next({
            status: 403,
            message: `User already exists`,
          });
        } else {
          conn.query(sqlStatement, user, (error, results) => {
            if (error) {
              next({
                status: 409,
                message: error,
              });
            }
            if (results) {
              const insertedUser = { id: results.insertId, ...user };

              res.send({
                status: 201,
                message: `User created`,
                data: insertedUser,
              });
            }
          });
        }
        pool.releaseConnection(conn);
      });
    });
  },
};

module.exports = userController;
