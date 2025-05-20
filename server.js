const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const mongoose = require('mongoose');
const app = require('./app');

// --------------------  External -----------------------------

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// -------------------- DATABASE --------------------//

if (!process.env.DATABASE_URL || !process.env.DATABASE_PASSWORD) {
  console.error('DATABASE_URL or DATABASE_PASSWORD is not defined in config.env');
  process.exit(1);
}

const DB = process.env.DATABASE_URL.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((con) => 
    // console.log(con),
    console.log('DB connection successful!')
)
  .catch(err => {
    console.log('ERROR connecting to DB:', err);
    process.exit(1);
  });
//---------- 


// const testTour = new Tour({
//   name: 'The Park Camper',
//   rating:4.7,
//   price: 497
// })

// testTour.save().then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log('ERROR:', err);
// });

//--------------------- START SERVER ---------------------//
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

