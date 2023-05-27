const jwt = require('jsonwebtoken');
const pool = require('../util/mysql-db');
const logger = require('../util/logger').logger;
const jwtSecretKey = process.env.JWT_SECRET;

module.exports = {
  login(req, res, next) {
    const sqlCheck = `SELECT * FROM user WHERE emailAdress = ?`;
    pool.getConnection((err, connection) => {
      if (err) {
        next({
          status: 500,
          message: err.code
        });
      }
      if (connection) {
        const { emailAdress, password } = req.body;
        connection.query(sqlCheck, [emailAdress], (err, results) => {
          if (err) {
            next({
              status: 409,
              message: err.code
            });
          } else if (results.length === 0) {
            next({
              status: 404,
              message: 'User not found'
            });
          } else {
            const user = results[0];

            if (password === user.password) {
              const payload = {
                userId: user.id
              };

              const token = jwt.sign(payload, jwtSecretKey, {
                expiresIn: '7d'
              });

              let { password, ...userWithoutPassword } = user;

              res.send({
                status: 200,
                message: 'User logged in',
                data: {
                  ...userWithoutPassword,
                  token: token
                }
              });
            } else {
              next({
                status: 400,
                message: 'Not authorized'
              });
            }
          }
          connection.release();
        });
      }
    });
  },

  validateToken: (req, res, next) => {
    let header = req.headers.authorization;

    if (header) {
      let token = header.substring(7, header.length);

      jwt.verify(token, jwtSecretKey, (err, payload) => {
        if (err) {
          next({
            status: 401,
            message: 'Invalid token'
          });
        } else {
          req.id = payload.userId;
          next();
        }
      });
    } else {
      next({
        status: 401,
        message: 'Authorization header missing'
      });
    }
  }
};
