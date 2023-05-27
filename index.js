const express = require('express');
const authRouter = require('./src/routes/auth.routes');
const productRouter = require('./src/routes/product.routes');
const stockRouter = require('./src/routes/stock.routes');
const workshopRouter = require('./src/routes/workshop.routes');
const userRouter = require('./src/routes/user.routes');
const logger = require('./src/util/logger').logger;
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('*', (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  logger.info(`Methode ${method} ${url} is called`);
  next();
});

app.use('/api', authRouter);
app.use('/api', productRouter);
app.use('/api', stockRouter);
app.use('/api', workshopRouter);
app.use('/api', userRouter);

app.use('*', (req, res) => {
  logger.error('Endpoint not found');
  res.status(404).json({
    status: 404,
    message: 'Endpoint not found',
    data: {}
  });
});

app.use((err, req, res, next) => {
  logger.warn(err);
  res.status(err.status).json({
    status: err.status,
    message: err.message,
    data: {}
  });
});

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});

module.exports = app;
