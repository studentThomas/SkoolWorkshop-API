const logger = require('../util/logger').logger;
const pool = require('../util/mysql-db');

const categoryController = {

  getCategories: (req,  res, next) => {
    
    let sqlStatement = "SELECT * FROM productcategory";

    pool.getConnection(function (err, conn) {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlStatement, (err, results) => {
        if (err) {
          return next({
            status: 409,
            message: err.message
          });
        }
        const categories = results;

        if (results.length > 0) {
          res.status(200).json({
            status: 200,
            message: 'Categories are retrieved',
            data: categories
          });
        } else {
          res.status(404).json({
            status: 404,
            message: 'No categories'
          });
        }
        pool.releaseConnection(conn);
      });
    });
  },

};

module.exports = categoryController;
