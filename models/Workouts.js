const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  workouts: [ // array here allows us to hold multiple references to books
    // if the square bracket wasn't here, it would be a singular reference to a single book
    {
      type: Schema.Types.ObjectId, // refers to the _id object type
      ref: "Workout" // refers to the collection called Book in Book.js
    }
  ]
});

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;
