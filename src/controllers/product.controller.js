const logger = require('../util/logger').logger;
const pool = require('../util/mysql-db');

const productController = {
  //UC401 Create Product
  createProduct: (req, res, next) => {
    const { workshopId, participantMultiplier, ...productData } = req.body;

    const sqlCheck = `SELECT * FROM product WHERE Name = ?`;
    const sqlProduct = `INSERT INTO product SET ?`;
    const sqlStock = `INSERT INTO stock (ProductId, WorkshopId, ParticipantMultiplier) VALUES (?, ?, ?)`;

    pool.getConnection(function (err, conn) {
      if (err) {
        return next({
          status: 409,
          message: err.message
        });
      }

      conn.query(sqlCheck, [productData.name], (error, results) => {
        if (error) {
          return next({
            status: 409,
            message: error
          });
        }

        if (results.length > 0) {
          return next({
            status: 403,
            message: `Product already exists`
          });
        } else {
          conn.query(sqlProduct, productData, (error, resultProduct) => {
            if (error) {
              return next({
                status: 409,
                message: error
              });
            }

            const productId = resultProduct.insertId;
            const stockData = [productId, workshopId, participantMultiplier];

            conn.query(sqlStock, stockData, (error, resultStock) => {
              if (error) {
                return next({
                  status: 409,
                  message: error
                });
              }

              res.status(201).json({
                status: 201,
                message: 'Product created',
                data: productData
              });
            });
          });
        }
        pool.releaseConnection(conn);
      });
    });
  },

  //UC402 Get Products
  getProducts: (req, res, next) => {
    const workshopId = req.query.workshopId;
    const categoryName = req.query.categoryName;
    
    let sqlStatement = "SELECT product.* FROM product";
    
    logger.info(`workshopId: ${workshopId}`);
    logger.info(`categoryName: ${categoryName}`);
    
    if (workshopId && categoryName) {
      sqlStatement += `
        JOIN productcategory ON product.CategoryId = productcategory.Id
        JOIN stock ON product.id = stock.productId
        WHERE stock.workshopId = "${workshopId}" AND productcategory.Name = "${categoryName} "`;
    } else if (workshopId) {
      sqlStatement += `
        JOIN stock ON product.id = stock.productId
        WHERE stock.workshopId = "${workshopId}"`;
    } else if (categoryName) {
      sqlStatement += `
        JOIN productcategory ON product.CategoryId = productcategory.Id
        WHERE productcategory.Name = "${categoryName}"`;
    }
    sqlStatement += ` ORDER BY product.Quantity ASC`;

    logger.info(`sqlStatement: ${sqlStatement}`);


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
        const products = results;

        if (results.length > 0) {
          res.status(200).json({
            status: 200,
            message: 'Products are retrieved',
            data: products
          });
        } else {
          res.status(404).json({
            status: 404,
            message: 'No products'
          });
        }
        pool.releaseConnection(conn);
      });
    });
  },

  //UC403 Update Product
  updateProduct: (req, res, next) => {
    const productId = req.params.productId;
    const updatedProduct = req.body;
    const sqlStatement = `UPDATE product SET ? WHERE Id = ?`;
    const sqlCheck = `SELECT * FROM product WHERE Id = ?`;

    pool.getConnection(function (err, conn) {
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
            status: 404,
            message: `Product not found`
          });
        }

        conn.query(sqlStatement, [updatedProduct, productId], (error, results) => {
          if (error) {
            return next({
              status: 409,
              message: error
            });
          }

          if (results) {
            res.send({
              status: 200,
              message: `Product updated`,
              data: updatedProduct
            });
          }

          pool.releaseConnection(conn);
        });
      });
    });
  },

  //UC404 Delete Product
  deleteProduct: (req, res, next) => {
    const productId = req.params.productId;
    const sqlCheck = `SELECT * FROM product WHERE Id = ?`;
    const sqlStatement = `DELETE product, stock FROM product 
    LEFT JOIN stock ON product.Id = stock.ProductId
    WHERE product.Id = ?`;

    pool.getConnection(function (err, conn) {
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
            status: 404,
            message: `Product not found`
          });
        }

        conn.query(sqlStatement, [productId], (error, results) => {
          if (error) {
            return next({
              status: 409,
              message: error
            });
          }

          if (results) {
            res.send({
              status: 200,
              message: `Product deleted`,
              data: {}
            });
          }

          pool.releaseConnection(conn);
        });
      });
    });
  },

  //405
  getProductById: (req, res, next) => {
    const productId = req.params.productId;
    const sqlStatement = `SELECT * FROM product WHERE Id = ?`;

    pool.getConnection(function (err, conn) {
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

        if (results.length > 0) {
          res.status(200).json({
            status: 200,
            message: 'Product is retrieved',
            data: results[0]
          });

        } else {
          res.status(404).json({
            status: 404,
            message: 'Product not found'
          });
        }
        pool.releaseConnection(conn);
      });
    });
  },




};

module.exports = productController;
