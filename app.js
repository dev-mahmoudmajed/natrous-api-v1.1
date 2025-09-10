const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utlis/appError')
const globalErrorHandler = require('./controllers/errorController')

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers)
  next();
});

//-------- 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.use((req, res, next) => {
  // res.status(404).json({
  //   error: 'Not Found This route does not exist',
  //   message: `Cannot ${req.method} ${req.originalUrl}`,
  //   statusCode: 404
  // });
  // const err = new Error(`Cannot ${req.method} ${req.originalUrl}`)
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);

  next(new AppError(`Cannot find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);

module.exports = app;
