const jwt = require('jsonwebtoken');
const pool = require('../util/mysql-db');
const { updateStock } = require('./stock.controller');
const logger = require('../util/logger').logger;
const jwtSecretKey = process.env.JWT_SECRET;

const orderController = {

    //UC-601 Create Order
    createOrder: (req, res, next) => {
        const sqlStatement = 'INSERT INTO orderworkshop SET ?';
        const orderData = req.body;

        pool.getConnection(function (err, conn) {
            if (err) {
                return next({
                    status: 409,
                    message: err.message
                });
            }

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
                    data: orderData
                });
            });

            pool.releaseConnection(conn);
        });
    },

    //UC-602 Get Orders
    getOrders: (req, res, next) => {
        const sqlStatement = 'SELECT * FROM orderproduct ORDER BY OrderWorkshopId ASC';
    
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
    
                const groupedOrders = results.reduce((acc, curr) => {
                    const orderWorkshopId = curr.OrderWorkshopId;
                    if (!acc[orderWorkshopId]) {
                        acc[orderWorkshopId] = {
                            OrderWorkshopId: orderWorkshopId,
                            WorkshopId: curr.WorkshopId,
                            Status: curr.Status,
                            products: []
                        };
                    }
                    acc[orderWorkshopId].products.push({
                        ProductId: curr.ProductId,
                        Quantity: curr.Quantity
                    });
                    return acc;
                }, {});
    
                const orders = Object.values(groupedOrders);
    
                res.status(200).json({
                    status: 200,
                    message: 'Orders retrieved',
                    data: orders
                });
            });
    
            pool.releaseConnection(conn);
        });
    },

    //UC-603 Update Order
    updateOrder: (req, res, next) => {
        const orderWorkshopId = req.params.orderWorkshopId;
        const sqlStatement = 'UPDATE orderproduct SET Status = 1 WHERE OrderWorkshopId = ?';

        pool.getConnection(function (err, conn) {
            if (err) {
                return next({
                    status: 409,
                    message: err.message
                });
            }
        
            conn.query(sqlStatement, [orderWorkshopId], (err, results) => {
                if (err) {
                    return next({
                        status: 409,

                        message: err.message
                    });

                }
                res.status(200).json({
                    status: 200,
                    message: 'Order updated',
                    data: 1
                });
            });
            pool.releaseConnection(conn);
        });
    },


    

  };
  
  module.exports = orderController;