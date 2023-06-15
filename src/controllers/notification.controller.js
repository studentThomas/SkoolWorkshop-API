const logger = require('../util/logger').logger;
const pool = require('../util/mysql-db');

const notificationController = {

  getNotifications: (req,  res, next) => {
    
    let sqlStatement = "SELECT * FROM notifications";

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
        const notifications = results;

        if (results.length > 0) {
          res.status(200).json({
            status: 200,
            message: 'notifications are retrieved',
            data: categories
          });
        } else {
          res.status(404).json({
            status: 404,
            message: 'No notifications'
          });
        }
        pool.releaseConnection(conn);
      });
    });
  },

};

module.exports = notificationController;