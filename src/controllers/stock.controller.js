const logger = require("../util/logger").logger;
const pool = require("../util/mysql-db");

const stockController = {
  getStock: (req, res, next) => {
    const productId = req.params.productId;

    const sqlCheck = `SELECT * FROM stock WHERE productId = ?`;

    pool.getConnection((err, conn) => {
      if (err) {
        return next({
          status: 409,
          message: err.message,
        });
      }

      conn.query(sqlCheck, [productId], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error,
          });
        }

        if (results.length == 0) {
          return next({
            status: 404,
            message: "Product is not found",
          });
        }

        res.status(200).json({
          status: 200,
          message: "Product is found",
          data: {
            productId: results[0].productId,
            quantity: results[0].quantity,
          },
        });
      });
    });
  },

  updateStock: (req, res, next) => {
    const productId = req.params.productId;
    let quantity = Number(req.body.quantity);

    const sqlCheck = `SELECT * FROM stock WHERE productId = ?`;
    const sqlStatement = `UPDATE stock SET quantity = ? WHERE productId = ?`;

    pool.getConnection((err, conn) => {
      if (err) {
        return next({
          status: 409,
          message: err.message,
        });
      }

      conn.query(sqlCheck, [productId], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error,
          });
        }

        if (quantity < 0) {
          quantity = results[0].quantity - Math.abs(quantity);
        } else {
          quantity = results[0].quantity + quantity;
        }

        if (results.length == 0) {
          return next({
            status: 409,
            message: "Product is not found",
          });
        }

        if (quantity < 0) {
          return next({
            status: 409,
            message: "Quantity to low",
          });
        }

        conn.query(sqlStatement, [quantity, productId], (error, results) => {
          if (err) {
            return next({
              status: 409,
              message: err.message,
            });
          }

          if (results) {
            res.status(200).json({
              status: 200,
              message: "Quantity is updated",
              data: {
                quantity: quantity,
              },
            });
          }
        });
      });
    });
  },
};

module.exports = stockController;
