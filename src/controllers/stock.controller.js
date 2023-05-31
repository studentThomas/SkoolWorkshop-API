const logger = require('../util/logger').logger;
const pool = require('../util/mysql-db');
const nodemailer = require('nodemailer');

const stockController = {
  //UC-301 Get Stock
  getStock: (req, res, next) => {
    const productId = req.params.productId;

    const sqlStatement = `SELECT Quantity FROM product WHERE Id = ?`;

    pool.getConnection((err, conn) => {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlStatement, [productId], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error
          });
        }

        if (results.length == 0) {
          return next({
            status: 404,
            message: 'Product is not found'
          });
        }

        res.status(200).json({
          status: 200,
          message: 'Product is found',
          data: {
            productId: results[0].ProductId,
            quantity: results[0].Quantity
          }
        });
        pool.releaseConnection(conn);
      });
    });
  },

  //UC-302 Update Stock
  updateStock: (req, res, next) => {
    const productId = req.params.productId;
    let quantity = Number(req.body.quantity);

    let transporter = nodemailer.createTransport({
      host: 'web05.ixlhosting.nl',
      port: 587,
      secure: false,
      auth: {
        user: 'thomas.vermeulen@uwcomputerstudent.nl',
        pass: 'MacPower67!'
      }
    });

    const sqlCheck = `SELECT * FROM product WHERE Id = ?`;
    const sqlStatement = `UPDATE product SET Quantity = ? WHERE Id = ?`;

    pool.getConnection((err, conn) => {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlCheck, [productId], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error
          });
        }

        if (results.length == 0) {
          return next({
            status: 409,
            message: 'Product is not found'
          });
        }

        if (quantity < 0) {
          quantity = results[0].Quantity - Math.abs(quantity);
        } else {
          quantity = results[0].Quantity + quantity;
        }

        if (results.length == 0) {
          return next({
            status: 409,
            message: 'Product is not found'
          });
        }



        conn.query(sqlStatement, [quantity, productId], (error, results) => {
          if (err) {
            return next({
              status: 409,
              message: err.message
            });
          }

          if (results) {
            if (quantity < 5) {

              res.status(400).json({
                status: 400,
                message: 'Quantity is updated',
                data: {
                  quantity: quantity
                }
              });

              const sqlProduct = `SELECT Name FROM product WHERE Id = ?`;

              conn.query(sqlProduct, [productId], (error, productResults) => {
                if (error) {
                  return next({
                    status: 409,
                    message: error
                  });
                }

                const productName = productResults[0].Name;

                const mailOptions = {
                  from: 'twa.vermeulen@student.avans.nl',
                  to: 'vermeulen.thomas@icloud.com',
                  subject: `Low quantity "${productName}"`,
                  text: `The quantity of product "${productName}" is low. Current quantity: ${quantity}`
                };

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.error('Error sending email:', error);
                  } else {
                    console.log('Email sent:', info.response);
                  }
                });
              });
            } else {
              res.status(200).json({
                status: 200,
                message: 'Quantity is updated',
                data: {
                  quantity: quantity
                }
              });
            }

       
          }
        });
        pool.releaseConnection(conn);
      });
    });
  }
};

module.exports = stockController;
