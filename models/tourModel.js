const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
  
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
}
);

//- Document Middleware:runs before .save() and .create()

tourSchema.pre('save', function(next) {
  // Do something before saving the document
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});






const Tour = mongoose.model('Tour', tourSchema);

module.exports = {Tour};

/* Mongoose Middleware types:
- Pre Middleware: This middleware runs before a certain action (like saving a document). It can be used to modify the data before it is saved to the database.
- Post Middleware: This middleware runs after a certain action. It can be used to perform actions after the data has been saved, like logging or sending notifications.
------
- Query Middleware: This middleware runs before a query is executed. It can be used to modify the query or add conditions.
- Aggregation Middleware: This middleware runs before an aggregation pipeline is executed. It can be used to modify the aggregation pipeline or add stages.
- Document Middleware: This middleware runs before or after a document is saved. It can be used to modify the document or perform actions based on its state.
- Model Middleware: This middleware runs before or after a model is created. It can be used to modify the model or perform actions based on its state.
- Error Handling Middleware: This middleware runs when an error occurs. It can be used to handle errors and send appropriate responses.
- Validation Middleware: This middleware runs before data is validated. It can be used to modify the data or add custom validation logic.
- Connection Middleware: This middleware runs when a connection is established. It can be used to modify the connection or perform actions based on its state.
- Virtuals Middleware: This middleware runs when virtual properties are accessed. It can be used to modify the virtual properties or perform actions based on their state.
*/















