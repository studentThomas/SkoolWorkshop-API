const jwt = require('jsonwebtoken');
const pool = require('../util/mysql-db');
const logger = require('../util/logger').logger;
const jwtSecretKey = process.env.JWT_SECRET;

const orderController = {

    //UC-501 
    createOrder: (req, res, next) => {
        const sqlStatement = 'INSERT INTO orderworkshop SET ?';
        const sqlProduct = 'SELECT * FROM product JOIN stock ON product.Id = stock.ProductId WHERE stock.WorkshopId = ?';
        const sqlUpdate = 'UPDATE product SET Quantity = ? WHERE Id = ?';
        const orderData = req.body;
        const participants = orderData.Participants;

        pool.getConnection(function (err, conn) {
            if (err) {
                return next({
                    status: 409,
                    message: err.message
                });
            }

            conn.query(sqlProduct, [orderData.WorkshopId], (err, results) => {
                if (err) {
                    return next({
                        status: 409,
                        message: err.message
                    });
                }
                const products = results;
                let stock = [];

                if (results.length > 0) {
                    products.forEach((product) => {
                        const participants = orderData.ParticipantCount;
                        const participantMultiplier = product.ParticipantMultiplier;
                        const quantity = Math.ceil(-participants * participantMultiplier);

                    
                        stock.push({
                            ProductId: product.Id,
                            Quantity: quantity
                        });
                        

                        conn.query(sqlStatement, [orderData], (err, results) => {
                            if (err) {
                                return next({
                                    status: 409,
                                    message: err.message
                                });
                            }
                   
            
                            res.status(201).json({
                                status: 201,
                                message: 'Order created',
                                data: stock
                            });
                        });  
                    });

                }

            });

            pool.releaseConnection(conn);
        });
    },
   


  

  };
  
  module.exports = orderController;