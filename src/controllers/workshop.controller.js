const logger = require('../util/logger').logger;
const pool = require('../util/mysql-db');

const workshopController = {
  //UC-501 Create Workshop
  createWorkshop: (req, res, next) => {
    const workshop = req.body;

    const sqlCheck = `SELECT * FROM workshop WHERE Name = ?`;
    const sqlStatement = `INSERT INTO workshop SET ?`;

    pool.getConnection((err, conn) => {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlCheck, [workshop.name], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error
          });
        }

        if (results.length > 0) {
          return next({
            status: 403,
            message: `Workshop already exists`
          });
        } else {
          conn.query(sqlStatement, workshop, (error, results) => {
            if (error) {
              return next({
                status: 409,
                message: error
              });
            }

            res.status(201).json({
              status: 201,
              message: 'Workshop created',
              data: workshop
            });
          });
          pool.releaseConnection(conn);
        }
      });
    });
  },

  //UC-502 Get Workshop
  getWorkshops: (req, res, next) => {
    const categoryName = req.query.categoryName;
    let sqlStatement;

    if (categoryName) {
      sqlStatement = 'SELECT * FROM workshop WHERE CategoryName = ?';
    } else {
      sqlStatement = 'SELECT * FROM workshop';
    }

    pool.getConnection((err, conn) => {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlStatement, [categoryName], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error
          });
        }

        if (results) {
          res.status(200).json({
            status: 200,
            message: 'Workshops are retrieved',
            data: results
          });
        }
        pool.releaseConnection(conn);
      });
    });
  },

  //UC-503 Update Workshop
  updateWorkshop: (req, res, next) => {
    const workshopId = req.params.workshopId;
    const workshop = req.body;
    const sqlCheck = `SELECT * FROM workshop WHERE Id = ?`;
    const sqlStatement = `UPDATE workshop SET ? WHERE Id = ?`;

    pool.getConnection(function (err, conn) {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlCheck, [workshopId], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error
          });
        }

        if (results.length == 0) {
          return next({
            status: 404,
            message: `Workshop not found`
          });
        }

        conn.query(sqlStatement, [workshop, workshopId], (error, results) => {
          if (error) {
            return next({
              status: 409,
              message: error
            });
          }

          if (results) {
            res.send({
              status: 200,
              message: `Workshop updated`,
              data: workshop
            });
          }

          pool.releaseConnection(conn);
        });
      });
    });
  },

  //UC-504 Delete Workshop
  deleteWorkshop: (req, res, next) => {
    const workshopId = req.params.workshopId;
    const sqlCheck = `SELECT * FROM workshop WHERE Id = ?`;
    const sqlStatement = `DELETE workshop, stock FROM workshop 
    LEFT JOIN stock ON workshop.Id = stock.workshopId
    WHERE workshop.Id = ?`;

    pool.getConnection(function (err, conn) {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlCheck, [workshopId], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error
          });
        }

        if (results.length == 0) {
          return next({
            status: 404,
            message: `Workshop not found`
          });
        }

        conn.query(sqlStatement, [workshopId], (error, results) => {
          if (error) {
            return next({
              status: 409,
              message: error
            });
          }

          if (results) {
            res.send({
              status: 200,
              message: `Workshop deleted`,
              data: {}
            });
          }
        });
        pool.releaseConnection(conn);
      });
    });
  },

  //UC-504 Get Workshop By Id
  getWorkshopById: (req, res, next) => {
    const workshopId = req.params.workshopId;
    const sqlStatement = 'SELECT * FROM workshop WHERE Id = ?';

    pool.getConnection((err, conn) => {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlStatement, [workshopId], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error
          });
        }

        if (results.length == 0) {
          return next({
            status: 404,
            message: `Workshop not found`
          });
        }

        if (results) {
          res.status(200).json({
            status: 200,
            message: 'Workshop is retrieved',
            data: results[0]
          });
        }
        pool.releaseConnection(conn);
      });
    });
  },
};

module.exports = workshopController;
