const express = require('express');
const app = express();
const morgan = require('morgan');

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
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.use((req, res, next) => {
  // res.status(404).json({
  //   error: 'Not Found This route does not exist',
  //   message: `Cannot ${req.method} ${req.originalUrl}`,
  //   statusCode: 404
  // });
  const err = new Error(`Cannot ${req.method} ${req.originalUrl}`)
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err,req,res,next)=>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'
  res.status(err.statusCode).json({
    status:err.status,
    message:err.message,
  })
})

module.exports = app;
