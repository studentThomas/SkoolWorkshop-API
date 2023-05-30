const jwt = require('jsonwebtoken');
const pool = require('../util/mysql-db');
const logger = require('../util/logger').logger;
const jwtSecretKey = process.env.JWT_SECRET;

module.exports = {
  //UC-101 Login
  login(req, res, next) {
    const sqlCheck = `SELECT * FROM user WHERE EmailAdress = ?`;
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

            if (password === user.Password) {
              const payload = {
                userId: user.Id,
                isAdmin: user.IsAdmin
              };

              const token = jwt.sign(payload, jwtSecretKey, {
                expiresIn: '7d'
              });

              let { password, isActive, ...userWithoutPassword } = user;
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
    logger.info('Validating token');
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
          logger.info(`User ${req.id} is authorized`);
          next();
        }
      });
    } else {
      next({
        status: 401,
        message: 'Authorization header missing'
      });
    }
  },

  validateAdmin: (req, res, next) => {
    let header = req.headers.authorization;

    if (header) {
      let token = header.substring(7, header.length);

      jwt.verify(token, jwtSecretKey, (err, payload) => {
        if (err) {
          return next({
            status: 401,
            message: 'Invalid token'
          });
        }

        const isAdmin = payload.isAdmin;

        if (isAdmin) {
          req.id = payload.userId;
          next();
        } else {
          next({
            status: 403,
            message: 'Not authorized'
          });
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
