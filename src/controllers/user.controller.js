const logger = require("../util/logger").logger;
const pool = require("../util/mysql-db");

const userController = {
  //UC-201 Create User
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

      conn.query(sqlCheck, [user.emailAdress], (error, results) => {
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

  //UC-202 Get User
  getUsers: (req, res, next) => {
    const sqlStatement = `SELECT * FROM user`;

    pool.getConnection((err, conn) => {
      if (err) {
        next({
          status: 500,
          message: err.message,
        });
      }

      conn.query(sqlStatement, (error, results) => {
        if (error) {
          next({
            status: 409,
            message: error,
          });
        }

        if (results) {
          res.send({
            status: 200,
            message: `Users retrieved`,
            data: results,
          });
        }
      });
      pool.releaseConnection(conn);
    });
  },

  //UC-203 Update User
  updateUser: (req, res, next) => {
    const userId = req.params.userId;
    const updatedUser = req.body;
    const sqlStatement = `UPDATE user SET ? WHERE Id = ?`;
    const sqlCheck = `SELECT * FROM user WHERE Id = ?`;

    pool.getConnection(function (err, conn) {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlCheck, [userId], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error
          });
        }

        if (results.length == 0) {
          return next({
            status: 404,
            message: `User not found`
          });
        }

        conn.query(sqlStatement, [updatedUser, userId], (error, results) => {
          if (error) {
            return next({
              status: 409,
              message: error
            });
          }

          if (results) {
            res.send({
              status: 200,
              message: `User  updated`,
              data: updatedUser
            });
          }

          pool.releaseConnection(conn);
        });
      });
    });
  },

  //UC-204 Delete User
  deleteUser: (req, res, next) => {
    const userId = req.params.userId;
    const sqlStatement = `DELETE FROM user WHERE Id = ?`;

    pool.getConnection((err, conn) => {
      if (err) {
        next({
          status: 500,
          message: err.message,
        });
      }

      conn.query(sqlStatement, [userId], (error, results) => {
        if (error) {
          next({
            status: 409,
            message: error,
          });
        }

        if (results) {
          res.send({
            status: 200,
            message: `User deleted`,
          });
        }
      });
      pool.releaseConnection(conn);
    });
  },

    //UC-205 Get User by Id
    getUserByEmail: (req, res, next) => {
      const emailAdress = req.params.emailAdress;
      const sqlStatement = `SELECT * FROM user WHERE EmailAdress = ?`;
  
      pool.getConnection((err, conn) => {
        if (err) {
          next({
            status: 500,
            message: err.message,
          });
        }
  
        conn.query(sqlStatement, [emailAdress], (error, results) => {
          if (error) {
            next({
              status: 409,
              message: error,
            });
          }
  
          if (results) {
            res.send({
              status: 200,
              message: `User retrieved`,
              data: results,
            });
          }
        });
        pool.releaseConnection(conn);
      });
    }


};

module.exports = userController;
